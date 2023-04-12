import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AouhtService {

  constructor(private httpClient: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    const urlEnpoint = 'http://localhost:8080/oauth/token'
    const credentials = btoa('angularapp' + ':' + '12345')
    
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credentials})

    let params = new URLSearchParams()
    params.set('grant_type', 'password')
    params.set('username', usuario.email)
    params.set('password', usuario.contrasenha)
    console.log(params.toString())

    return this.httpClient.post<any>(urlEnpoint, params.toString(), {headers: httpHeaders})
  }
}
