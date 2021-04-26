import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Iaidoka } from '../../models/Iaidoka';

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
    const iaidokaRef = this.afdb.database.ref(`iaidoka/${uid}`); 
    const snap = await iaidokaRef.once('value');
    return snap.val();
  }

  // update user data
  async updateUserData(user: any) {
    const userRef = this.db.ref(`iaidoka/${user.uid}`);
    if (!userRef){
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
}
