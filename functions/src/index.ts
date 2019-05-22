import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.createClientAccount = functions.firestore
  .document('userProfile/{userId}/clientList/{clientId}')
  .onCreate((snap, context) => {
    return admin
      .auth()
      .createUser({
        uid: context.params.clientId,
        email: snap.data()!.email,
        password: '123456789',
        displayName: snap.data()!.fullName
      })
      .then(userRecord => {
        return admin
          .firestore()
          .doc(`userProfile/${userRecord.uid}`)
          .set({
            fullName: userRecord.displayName,
            email: userRecord.email,
            coachId: context.params.userId,
            admin: false,
            startingWeight: snap.data()!.startingWeight
          });
      })
      .catch(error => {
        console.log('Error creating new user:', error);
      });
  });

exports.sendWeightUpdate = functions.firestore
  .document('userProfile/{userId}/weightTrack/{weightId}')
  .onCreate((snap, context) => {
    const clientId = context.params.userId;
    const weight = snap.data()!.weight;

    return admin
      .firestore()
      .doc(`userProfile/${clientId}/`)
      .get()
      .then(clientProfileSnapshot => {
        const coachId = clientProfileSnapshot.data()!.coachId;
        const clientName = clientProfileSnapshot.data()!.fullName;
        const clientStartingWeight = clientProfileSnapshot.data()!
          .startingWeight;

        return admin
          .firestore()
          .doc(`userProfile/${coachId}/`)
          .get()
          .then(profileSnapshot => {
            const payload = {
              notification: {
                title: `${clientName} just shared a weight update`,
                body: `${clientName} started at ${clientStartingWeight} and just updated to ${weight}`,
                sound: 'default',
                click_action: 'FCM_PLUGIN_ACTIVITY'
              },
              data: { clientId: clientId }
            };
            return admin
              .messaging()
              .sendToDevice(profileSnapshot.data()!.token, payload);
          });
      });
  });
