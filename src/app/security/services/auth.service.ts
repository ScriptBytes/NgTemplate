import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$ = this._user$.asObservable();

  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor() { }

  private setUser(user: User) {
    this._user$.next(user);
  }

  login() {
    // Use whatever auth tool you need to authenticate the user
    // and populate the user data if needed. User data may not be needed if
    // all you care about is if they are authenticated
    this.setUser(new User());
    this._isAuthenticated$.next(true);
  }

  logout() {
    // Logout/clear local storage/clear session/etc.
    this.setUser(null);
    this._isAuthenticated$.next(false);
  }
}
