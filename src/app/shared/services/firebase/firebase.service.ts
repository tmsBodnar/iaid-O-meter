import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Iaidoka } from '../../models/Iaidoka';
import { Note } from '../../models/Note';
import { Kata } from '../../models/Kata';
import { Keiko } from '../../models/Keiko';
import { Ryuha } from '../../models/Ryuha';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db: any;

  constructor(public afdb: AngularFireDatabase) {
    this.db = this.afdb.database;
  }

  async getIaidokaById(uid: string): Promise<Iaidoka> {
    const iaidokaRef = this.db.ref(`iaidoka/${uid}`);
    const snap = await iaidokaRef.once('value');
    return snap.val();
  }

  async updateUserData(user: any) {
    const iaidoka = await this.getIaidokaById(user.uid);
    if (!iaidoka) {
      const userRef = this.db.ref(`iaidoka/${user.uid}`);
      const data = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      };
      return await userRef.set(data);
    }
  }

  async updateIaidoka(iaidoka: Iaidoka) {
    const userRef = this.db.ref(`iaidoka/${iaidoka.uid}`);
    return await userRef.update(iaidoka);
  }

  async getRyuhasForUser(uid?: string): Promise<Ryuha[]> {
    let result: Ryuha[] = [];
    let map: Map<string, boolean> = new Map();
    let ryuhasRef = this.db.ref(`iaidoka-ryuha/${uid}`);
    await ryuhasRef.once('value', async (snapshot: DataSnapshot) => {
      map = snapshot.val();
      if (map) {
        for (const key of Object.keys(map)) {
          const ryuhaRef = this.db.ref(`ryuha/${key}`);
          await ryuhaRef.once('value', async (ryuhaSnap: DataSnapshot) => {
            // ryuhaRef.off();
            const ryuha = ryuhaSnap.val();
            ryuha.uid = key;
            ryuha.katas = await this.getkatasForRyuha(ryuha.uid);
            result.push(ryuha);
          });
        }
      }
    });
    return result;
  }

  async getkatasForRyuha(uid?: string): Promise<Kata[]> {
    let result: Kata[] = [];
    let map: Map<String, boolean> = new Map();
    const kataListREf = this.db.ref(`ryuha-kata/${uid}`);
    await kataListREf.once('value', async (snapShot: DataSnapshot) => {
      map = snapShot.val();
      if (map) {
        for (const key of Object.keys(map)) {
          const kataRef = this.db.ref(`kata/${key}`);
          await kataRef.once('value', async (kataSnap: DataSnapshot) => {
            //  kataRef.off();
            const kata = kataSnap.val();
            kata.uid = key;
            kata.notes = await this.getNotesForKata(key);
            result.push(kata);
          });
        }
      }
    });
    return result;
  }

  async getNotesForKata(uid: string): Promise<Note[]> {
    let result: Note[] = [];
    let map: Map<String, boolean> = new Map();
    const notesRef = this.db.ref(`kata-notes/${uid}`);

    await notesRef.once('value', async (snapShot: DataSnapshot) => {
      notesRef.off();
      map = snapShot.val();
      if (map) {
        for (const key of Object.keys(map)) {
          const notesRef = this.db.ref(`note/${key}`);
          await notesRef.once('value', async (noteSnap: DataSnapshot) => {
            const note = noteSnap.val();
            note.uid = key;
            result.push(note);
          });
        }
      }
    });
    return result;
  }

  async saveKata(kata: Kata, iaidoka: Iaidoka, notes: Note[]) {
    if (!kata.uid) {
      const kataRef = this.db.ref(`kata/`);
      const kataSnap = await kataRef.push(kata);
      const key = kataSnap.getKey();
      kata.uid = key;
      const updateRef = this.db.ref(`kata/${key}`);
      updateRef.update(kata);
      const iaidokaKataRef = this.db
        .ref(`iaidoka-kata/${iaidoka?.uid}/${key}`)
        .push();
      this.db.ref(`iaidoka-kata/${iaidoka?.uid}/`).child(key).set(true);
      const ryuhaKataRef = this.db
        .ref(`ryuha-kata/${kata.ryuha.uid}/${key}`)
        .push();
      this.db.ref(`ryuha-kata/${kata.ryuha?.uid}/`).child(key).set(true);
      this.saveNotes(notes, kata);
    } else {
      const kataRef = this.db.ref(`kata/${kata.uid}`);
      this.saveNotes(notes, kata);
      await kataRef.update(kata);
    }
  }

  async deleteKata(kata: Kata, iaidoka: Iaidoka) {
    const kataRefToDelete = this.db.ref(`kata/${kata?.uid}`);
    await kataRefToDelete.remove();
    const notesOfKataRef = this.db.ref(`kata-notes/`).child(kata.uid);
    await notesOfKataRef.remove();
    const kataOfIaidokaRef = this.db
      .ref(`iaidoka-kata/`)
      .child(iaidoka.uid)
      .child(kata.uid);
    await kataOfIaidokaRef.remove();
  }

  async getAllKeikoForIaidoka(uid?: string): Promise<Keiko[]> {
    let result: Keiko[] = [];
    const keikosRef = this.db.ref(`iaidoka-keiko/${uid}`);
    await keikosRef.on('value', async (snapShot: DataSnapshot) => {
      let map: Map<String, boolean> = new Map();
      map = snapShot.val();
      if (map) {
        for (const key of Object.keys(map)) {
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
      const iaidokaKeikoRef = this.db
        .ref(`iaidoka-keiko/${iaidoka?.uid}/${key}`)
        .push();
      this.db.ref(`iaidoka-keiko/${iaidoka?.uid}/`).child(key).set(true);
      return keikoSnap.value;
    } else {
      const keikoRef = this.db.ref(`keiko/${keiko.uid}`);
      return await keikoRef.update(keiko);
    }
  }
  async saveNotes(notes: Note[], kata: Kata) {
    notes.forEach(async (note) => {
      if (!note.uid) {
        const noteRef = this.db.ref(`note/`);
        const noteSnap = await noteRef.push(note);
        const key = noteSnap.getKey();
        const kataNoteRef = this.db
          .ref(`kata-jnote/${kata?.uid}/${key}`)
          .push();
        this.db.ref(`kata-note/${kata?.uid}/`).child(key).set(true);
        return key;
      } else {
        const notesRef = this.db.ref(`note/${note.uid}`);
        return await notesRef.update(note).getKey();
      }
    });
  }
}
