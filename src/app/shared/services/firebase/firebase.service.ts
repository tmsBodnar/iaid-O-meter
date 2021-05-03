import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { Iaidoka } from '../../models/Iaidoka';
import { Kata } from '../../models/Kata';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db : any;

  constructor(
    public afdb: AngularFireDatabase,
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
    const kataListREf = this.db.ref(`iaidokas-kata/${uid}`);
    const iaidokasKata = await kataListREf.once('value');
    const kataUid = iaidokasKata.val();
    console.log(kataUid);
    kataUid.forEach(async (element: any) => {
      const kataRef = this.db.ref(`kata/${element}`);
      const katas = await kataRef.once('value');
      result.push(katas.val());
     });
    return result;
  }
}
