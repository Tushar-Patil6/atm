import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interface/user.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}

  private _behaviorSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public getUserLoginStatus(): Observable<boolean> {
    return this._behaviorSubject.asObservable();
  }

  public setUserLoginStatus(status: boolean) {
    this._behaviorSubject.next(status);
  }

  login(accountNumber: string, atmPin: string): Observable<any> {
    let userData = {
      accountNumber: this.encryptData(accountNumber),
      atmPin: this.encryptData(atmPin),
    };
    return this.http
      .post<User>(`${environment.apiUrl}/users/login`, { user: userData })
      .pipe(
        map((user) => {
          localStorage.setItem('user', 'success');
          return user;
        })
      );
  }

  encryptData(data) {
    try {
      var encryptedMessage = CryptoJS.AES.encrypt(
        data,
        `${environment.secret}`
      ).toString();
      return encryptedMessage;
    } catch (e) {
      return e;
    }
  }
}
