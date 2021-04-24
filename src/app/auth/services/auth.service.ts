import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';


import { AuthResponse, Usuario } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseURL: string = environment.baseURL;
  private _user!: Usuario;

  get usuario() {
    return {...this._user};
  }


  constructor(private _http : HttpClient) { }


  login(email : string, password : string){
    const url: string = `${this._baseURL}/auth`;
    const body = {email, password};
    return this._http.post<AuthResponse>(url, body)
              .pipe(
                tap(resp => {
                  if(resp.ok){
                    localStorage.setItem('token', resp.token!);
                    this._user = {
                      name : resp.name!,
                      uid : resp.uid!
                    }
                  }
                }),
                map(resp => resp.ok),
                catchError(err => of(err.error.msg))
              );
  }

  validarToken(): Observable<boolean> {
    const url = `${this._baseURL}/auth/renew`;
    const  headers = new HttpHeaders()
            .set('x-token', localStorage.getItem('token') || ''); 
    return this._http.get<AuthResponse>(url, {headers})
                .pipe(
                  map(resp => {
                    return resp.ok;
                  }),
                  catchError(err => of(false))
                );
  }
}
