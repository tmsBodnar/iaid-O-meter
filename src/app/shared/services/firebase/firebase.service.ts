import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { KataComponent } from 'src/app/components/kata/kata.component';
import { Iaidoka } from '../../models/Iaidoka';
import { Kata } from '../../models/Kata';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db : any;

  constructor(
    public afdb: AngularFireDatabase
    ) { 
    this.db = this.afdb.database;
  }

  async getIaidokaById(uid: string): Promise<Iaidoka> {
    const iaidokaRef = this.db.ref(`iaidoka/${uid}`); 
    const snap = await iaidokaRef.once('value');
    return snap.val();
  }

  // update user data
  async updateUserData(user: any) {
    const iaidoka = await this.getIaidokaById(user.uid) 
    if (!iaidoka) {
      const userRef = this.db.ref(`iaidoka/${user.uid}`);
      const data = { 
        uid: user.uid, 
        email: user.email, 
        name: user.displayName
      }
      return await userRef.set(data); 
    }
  }

  async updateIaidoka(iaidoka:Iaidoka){
    const userRef = this.db.ref(`iaidoka/${iaidoka.uid}`);
    return await userRef.update(iaidoka);
  }

  async getAllKatasForUser(uid?: number): Promise<Kata[]> {
    let result: Kata[] = [];
    const kataListREf = this.db.ref(`iaidoka-kata/${uid}`);
    await kataListREf.on('value', async (snapShot: DataSnapshot) => {
      let map: Map<String, boolean> = new Map();
      map = snapShot.val();
      console.log(map);
      for (const key of Object.keys(map)){
        console.log(key);
        const kataRef = this.db.ref(`kata/${key}`);
        const katas = await kataRef.once('value');
        result.push(katas.val());
      }
  });
  return result;
}

  async saveKata(result: Kata, iaidoka?: Iaidoka) {
    if (!result.uid) {
      const kataRef = this.db.ref(`kata/`);
      const kataSnap = await kataRef.push(result);
      const key = kataSnap.getKey();
      const iaidokaKataRef = this.db.ref(`iaidoka-kata/${iaidoka?.uid}/${key}`).push();
      this.db.ref(`iaidoka-kata/${iaidoka?.uid}/`).child(key).set(true);
      return kataSnap.value;
    } else {
    const kataRef = this.db.ref(`kata/${result.uid}`);
    return await kataRef.update(result);
    }
  }
}
