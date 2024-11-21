import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {LoginResponse} from "../../models/User";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/login`, {email, password});
  }


  logout(): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/logout`, {}, {headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'Authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}`,
      }});
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/register`, {name, email, password, password_confirmation});
  }

  saveUser(response: LoginResponse) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', JSON.stringify(this.extractToken(response.data.token)))
  }

  extractToken(token: string) {
    return token.split('|')[1]
  }
}
