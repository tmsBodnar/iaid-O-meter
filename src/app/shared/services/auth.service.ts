import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/User";
import  firebase  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
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
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        if (result.user.emailVerified) {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        }else {
          this.router.navigate(['verify-email-address']);
        }
        this.updateUserData(result.user);
      }).catch((error: any) => {
        window.alert(error.message)
      })
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
      console.log(user);
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
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  async GoogleAuth() {
    try{
      const provider =  new firebase.auth.GoogleAuthProvider();
      const cred = await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['dashboard'])
      return this.updateUserData(cred.user);
    } catch(error: any) {
      window.alert(error)
    }
  }
  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    } 

    return userRef.set(data, { merge: true })

  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result: any) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.updateUserData(result.user);
    }).catch((error: any) => {
      window.alert(error)
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}
