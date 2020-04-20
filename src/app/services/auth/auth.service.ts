
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { of } from 'rxjs';


@Injectable()
export class AuthService {

  private idleState = 'Not started.';
  private timedOut = false;
  private lastPing?: Date = null;
  private invalidCredentialMsg: string;

  private returnUser: User = new User();

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  login(login: string, password: string) {

    // Construction de la chaine pour l'authentification
    const headers = new HttpHeaders({ 'Authorization': 'Basic ' + window.btoa(login + ':' + password) });
    
    // return this.http.get<any>(environment.basePath + 'user', { headers: headers }).pipe(
    //   map(user => {
    //     if (user) {
    //       localStorage.setItem('authenticatedRole', 'Admin');
    //     }
    //     return this.returnUser;
    //   }));

    // Bypass authentification pour test
    localStorage.setItem('authenticatedRole', 'Admin');
    return of(this.returnUser)
  }

  logout() {
    localStorage.setItem('authenticatedRole', null);
    this.http.post(environment.basePath + 'logout', {}).subscribe(
      success => {
        this.router.navigate(['/login']);
      },
      failure => {
        console.log(failure);
        this.router.navigate(['/login']);
      });
  }

  isAdmin(): boolean {
    let result = false;
    if (localStorage.getItem('roleUser') === 'PRDV_ADMIN') {
      result = true;
    }
    return result;
  }
}

