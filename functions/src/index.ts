import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.createClientAccount = functions.firestore
  .document('/userProfile/{userId}/clientList/{clientId}')
  .onCreate(async (snap, context) => {
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
          .database()
          .ref(`/userProfile/${userRecord.uid}`)
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
