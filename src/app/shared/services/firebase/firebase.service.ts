import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Iaidoka } from '../../models/Iaidoka';
import { Jakukante } from '../../models/Jakukante';
import { Kata } from '../../models/Kata';
import { Keiko } from '../../models/Keiko';
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
    let map: Map<String, boolean> = new Map();
    const kataListREf = this.db.ref(`iaidoka-kata/${uid}`);
    await kataListREf.on('value', async (snapShot: DataSnapshot) => {
      map = snapShot.val();
      if (map) {
        for (const key of Object.keys(map)){
          const kataRef = this.db.ref(`kata/${key}`);
          await kataRef.on('value', async (kataSnap: DataSnapshot) =>{
            kataRef.off();
            const kata = kataSnap.val();
            kata.uid = key;
            kata.jakukantes = await this.getJakukanteForKata(key);
            result.push(kata);
          });
        }
      }
  });
  console.log(result);
  return result;
}

async getJakukanteForKata(uid: string): Promise<Jakukante[]> {
  let result: Jakukante[] = [];
  let map: Map<String, boolean> = new Map();
  const jakukanteListRef = this.db.ref(`kata-jakukante/${uid}`);
  
  await jakukanteListRef.on('value', async (snapShot: DataSnapshot) => {
    jakukanteListRef.off();
    map = snapShot.val();
    if(map) {
      for (const key of Object.keys(map)){
        const jakukanteRef = this.db.ref(`jakukante/${key}`);
        await jakukanteRef.on('value', async (jakukanteSnap: DataSnapshot) =>{
          const jakukante = jakukanteSnap.val();
          jakukante.uid = key;
          result.push(jakukante);
        });
      }
  }
  });
  return result;
  
}

  async saveKata(kata: Kata, iaidoka: Iaidoka, jakukantes: Jakukante[]) {
    if (!kata.uid) {
      const kataRef = this.db.ref(`kata/`);
      const kataSnap = await kataRef.push(kata);
      const key = kataSnap.getKey();
      const iaidokaKataRef = this.db.ref(`iaidoka-kata/${iaidoka?.uid}/${key}`).push();
      this.db.ref(`iaidoka-kata/${iaidoka?.uid}/`).child(key).set(true);
      this.saveJakukante(jakukantes, kata);
      return kataSnap.value;
    } else {
    const kataRef = this.db.ref(`kata/${kata.uid}`);
    this.saveJakukante(jakukantes, kata);
    return await kataRef.update(kata);
    }
  }

  async deleteKata(kata: Kata, iaidoka: Iaidoka){
    const kataRefToDelete = this.db.ref(`kata/${kata?.uid}`);
    await kataRefToDelete.remove();
    const jakukanteOfKataRef = this.db.ref(`kata-jakukante/`).child(kata.uid);
    await jakukanteOfKataRef.remove();
    const kataOfIaidokaRef = this.db.ref(`iaidoka-kata/`).child(iaidoka.uid).child(kata.uid);
    await kataOfIaidokaRef.remove();
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
  async saveJakukante(jakukantes: Jakukante[], kata: Kata) {
    jakukantes.forEach(async jakukante => {
      console.log(jakukante, kata);
      if (!jakukante.uid) {
        const jakukanteRef = this.db.ref(`jakukante/`);
        const jakukanteSnap = await jakukanteRef.push(jakukante);
        const key = jakukanteSnap.getKey();
        const kataJakukanteRef = this.db.ref(`kata-jakukante/${kata?.uid}/${key}`).push();
        this.db.ref(`kata-jakukante/${kata?.uid}/`).child(key).set(true);
        return key;
      } else {
      const jakukanteRef = this.db.ref(`jakukante/${jakukante.uid}`);
      return await jakukanteRef.update(jakukante).getKey();
      }
    });
  }


}
