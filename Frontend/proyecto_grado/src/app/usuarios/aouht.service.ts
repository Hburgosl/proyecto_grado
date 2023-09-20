import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class AouhtService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private httpClient: HttpClient) {}

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEnpoint = 'http://localhost:8080/oauth/token';
    const credentials = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credentials,
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.email);
    params.set('password', usuario.password);
    console.log(params.toString());

    return this.httpClient.post<any>(urlEnpoint, params.toString(), {
      headers: httpHeaders,
    });
  }

  guardarUsuario(access_token: string): void {
    let payload = this.obtenerDatosToken(access_token);
    this._usuario = new Usuario();
    this._usuario.documento_usuario = payload.documento_usuario;
    this._usuario.nombre_completo = payload.nombre_completo;
    this._usuario.fecha_nacimiento = payload.fecha_nacimiento;
    this._usuario.pais = payload.pais;
    this._usuario.ciudad = payload.ciudad;
    this._usuario.direccion = payload.direccion;
    this._usuario.email = payload.email;
    this._usuario.fecha_creacion = payload.fecha_creacion;
    this._usuario.ultima_modificacion = payload.ultima_modificacion;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(access_token: string): any {
    if (access_token != null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout() {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
