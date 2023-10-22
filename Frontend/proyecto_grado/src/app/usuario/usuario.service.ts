import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AouhtService } from '../usuarios/aouht.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndpoint: string = 'http://localhost:8080/usuario';
  modoEdicion: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AouhtService
  ) {}

  activarModoEdicion() {
    this.modoEdicion = true;
  }

  desactivarModoEdicion() {
    this.modoEdicion = false;
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http
      .post<any>(this.urlEndpoint + '/', usuario, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }

  getUsuario(documento_usuario): Observable<Usuario> {
    return this.http.get<Usuario>(
      this.urlEndpoint + '/list/' + documento_usuario
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http
      .put<any>(
        this.urlEndpoint + '/list/' + usuario.documento_usuario,
        usuario
      )
      .pipe(
        catchError((e) => {
          console.error(e.error.Mesaje);
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  subirFoto(archivo: File, documento_usuario): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('documento_usuario', documento_usuario);

    const req = new HttpRequest(
      'POST',
      this.urlEndpoint + '/upload',
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
