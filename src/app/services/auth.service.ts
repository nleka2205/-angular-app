import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth
  ) { }

  currentUser = authState(this.auth);

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(name: string, email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user}) => updateProfile(user, { displayName: name}))
    );
  }

  logout(){
    return from(this.auth.signOut());
  }
}
