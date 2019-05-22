import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private userId: string;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
    });
  }

  async clientCreate(
    fullName: string,
    email: string,
    startingWeight: number
  ): Promise<any> {
    const newClientId = await this.firestore.createId();

    return this.firestore
      .doc(`userProfile/${this.userId}/clientList/${newClientId}`)
      .set({
        id: newClientId,
        fullName,
        email,
        startingWeight: startingWeight * 1
      });
  }

  clientListShow(): AngularFirestoreCollection<any> {
    return this.firestore.collection(`userProfile/${this.userId}/clientList/`);
  }

  clientDetailShow(clientId: string): AngularFirestoreDocument<any> {
    return this.firestore.doc(`userProfile/${clientId}`);
  }

  clientTrackWeight(
    weight: number
  ): Promise<firebase.firestore.DocumentReference> {
    return this.firestore
      .collection(`userProfile/${this.userId}/weightTrack/`)
      .add({
        weight,
        date: firebase.firestore.Timestamp
      });
  }

  clientWeightHistory(): AngularFirestoreCollection<any> {
    return this.firestore.collection(
      `userProfile/${this.userId}/weightTrack`,
      ref => ref.orderBy('date').limit(5)
    );
  }

  clientWeightHistoryCoach(clientId: string): AngularFirestoreCollection<any> {
    return this.firestore.collection(
      `userProfile/${clientId}/weightTrack`,
      ref => ref.orderBy('date').limit(5)
    );
  }
}
