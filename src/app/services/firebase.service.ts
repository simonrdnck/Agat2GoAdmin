import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { resolve } from 'url';



@Injectable({
  providedIn: 'root'
})

export class FirebaseService{

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public events: Events
  ) { }

  private snapshotChangesSubscription: any;
  data;

  increment = firebase.firestore.FieldValue.increment(1)

  getOrders() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('order').snapshotChanges()
        .subscribe(snapshots => {
          console.log("New Entry")
          this.events.publish('new:entry');
          resolve(snapshots)
        })
    })
  }

  loadOrders() {
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

  getNotstop() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/notstop').doc('bMBTc9GcNx7JQ5AcwSXO').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  setNotstop() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/notstop').doc('bMBTc9GcNx7JQ5AcwSXO').update({
        notstop: true
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

}
