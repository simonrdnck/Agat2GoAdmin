import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,

  ) { }

  private snapshotChangesSubscription: any;
  data;

  increment = firebase.firestore.FieldValue.increment(1)

  getOrders() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('order').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
    })
  }

  getOrder(id) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/order').doc(id).snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
    })
  }

  closeOrder(id) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('order').doc(id).update({
        closed: true
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  addBonus(uid) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('user').doc(uid).update({ bonuscard: this.increment })
    })
  }

}