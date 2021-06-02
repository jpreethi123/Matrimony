/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'Rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  email: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  public currentUser: User = null;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
     this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
   }

   async signup({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const uid = credential.user.uid;
    // console.log(uid);

    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    });
  }

  signIn({ email, password }) {
    // this.afAuth.signInWithEmailAndPassword(email, password).then((user) =>{const a = user.user.uid;});
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Chat functionality

addChatMessage(msg,email) {
  return this.afs.collection('messages').add({
    msg,
    from: this.currentUser.uid,
    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
    email
  });
}

getChatMessages(email,curemail) {
  let users = [];
  let msgobj = new Set();
  let list = [];
  return this.getUsers().pipe(
    switchMap(res => {
      users = res;
      return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
    }),
    map(messages => {
      list = [];
      msgobj = new Set();
      console.log('above for');
      for (const m of messages) {
        console.log('for');
        m.fromName = this.getUserForMsg(m.from, users);
        m.myMsg = this.currentUser.uid === m.from;
        if(m.email===curemail && m.fromName === email){
          msgobj.add(m);
        }
        if(m.email === email && m.fromName === curemail){
          msgobj.add(m);
        }
      }

      list = Array.from(msgobj);
      return list;
    })
  );
}

private getUsers() {
  return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
}

private getUserForMsg(msgFromId, users: User[]): string {
  for (const usr of users) {
    if (usr.uid === msgFromId) {
      return usr.email;
    }
  }
  return 'Deleted';
}

signOut(): Promise<void> {
  return this.afAuth.signOut();
}


}
