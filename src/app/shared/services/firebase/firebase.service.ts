import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Iaidoka } from '../../models/Iaidoka';
import { Jakukante } from '../../models/Jakukante';
import { Kata } from '../../models/Kata';
import { Keiko } from '../../models/Keiko';

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
      for (const key of Object.keys(map)){
        const kataRef = this.db.ref(`kata/${key}`);
        const katas = await kataRef.once('value');
        result.push(katas.val());
      }
  });
  return result;
}

  async saveKata(kata: Kata, iaidoka?: Iaidoka) {
    if (!kata.uid) {
      const kataRef = this.db.ref(`kata/`);
      const kataSnap = await kataRef.push(kata);
      const key = kataSnap.getKey();
      const iaidokaKataRef = this.db.ref(`iaidoka-kata/${iaidoka?.uid}/${key}`).push();
      this.db.ref(`iaidoka-kata/${iaidoka?.uid}/`).child(key).set(true);
      return kataSnap.value;
    } else {
    const kataRef = this.db.ref(`kata/${kata.uid}`);
    return await kataRef.update(kata);
    }
  }

  async getAllKeikoForIaidoka(uid?: number) : Promise<Keiko[]> {
    let result: Keiko[] = [];
    const keikosRef = this.db.ref(`iaidoka-keiko/${uid}`);
    await keikosRef.on('value', async (snapShot: DataSnapshot) => {
      let map: Map<String, boolean> = new Map();
      map = snapShot.val();
      if(map){
      for (const key of Object.keys(map)){
        const keikoRef = this.db.ref(`keiko/${key}`);
        const keiko = await keikoRef.once('value');
        result.push(keiko.val());
      }
    }
  });
    return result;
  }
  async saveKeiko(keiko: Keiko, iaidoka?: Iaidoka) {
    if (!keiko.uid) {
      const keikoRef = this.db.ref(`keiko/`);
      const keikoSnap = await keikoRef.push(keiko);
      const key = keikoSnap.getKey();
      const iaidokaKeikoRef = this.db.ref(`iaidoka-keiko/${iaidoka?.uid}/${key}`).push();
      this.db.ref(`iaidoka-keiko/${iaidoka?.uid}/`).child(key).set(true);
      return keikoSnap.value;
    } else {
    const keikoRef = this.db.ref(`keiko/${keiko.uid}`);
    return await keikoRef.update(keiko);
    }
  }
  async saveJakukante(jakukante: Jakukante, kata: Kata) {
    console.log(jakukante, kata);
  }
}
