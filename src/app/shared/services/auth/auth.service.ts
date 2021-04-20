import { Injectable, NgZone } from '@angular/core';
import { User } from "../../models/User";
import  firebase  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database"
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afdb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if(result.user){
        if (result.user.emailVerified) {
          this.ngZone.run(async () => {
            await this.updateUserData(result.user);
            this.router.navigate(['dashboard']);
          });
        } else {
          this.router.navigate(['verify-email-address']);
        }
      }
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Sign up with email/password
  async SignUp(email: string, password: string, displayName: string) {
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      await user?.updateProfile({ displayName: displayName });
      await this.SendVerificationMail();
      await this.updateUserData(result.user);
    } catch (error: any) {
        window.alert(error.message)
      }
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    const user = await this.afAuth.currentUser;
    if (!user?.emailVerified) {
      await user?.sendEmailVerification();
      this.router.navigate(['verify-email-address']);
      return false;
    } else {
      return true;
    }
    

  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try{
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      window.alert('Password reset email sent, check your inbox.');
    } catch(error: any) {
      window.alert(error)
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (JSON.stringify(user) !== '{}') ? true : false;
  }

  get isEmailVerified() : boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (JSON.stringify(user) !== '{}' && user.emailVerified) ? true : false;
  }

  // Sign in with Google
  async GoogleAuth() {
    try{
      const provider =  new firebase.auth.GoogleAuthProvider();
      const cred = await this.afAuth.signInWithPopup(provider);
      await this.updateUserData(cred.user);
      this.router.navigate(['dashboard'])
    } catch(error: any) {
      window.alert(error)
    }
  }

  // update user data
  async updateUserData(user: any) {
    const userRef = this.afdb.database.ref(`iaidoka/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      name: user.displayName
    } 
    return await userRef.set(data);

  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.updateUserData(result.user);
    } catch (error) {
      
    }
  }

  // Sign out 
  async SignOut() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['login']);
    } catch (error) {
      window.alert(error);
    }
  }
}

