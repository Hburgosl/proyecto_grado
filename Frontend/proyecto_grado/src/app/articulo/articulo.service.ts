import { Injectable } from '@angular/core';
import { Articulo } from './articulo';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AouhtService } from '../usuarios/aouht.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private urlEndpoint: string = 'http://localhost:8080/articulo/list';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AouhtService
  ) {}

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAuthorized(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.urlEndpoint).pipe(
      catchError((e) => {
        this.isNoAuthorized(e);
        return throwError(e);
      })
    );
  }

  crearArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http
      .post<Articulo>('http://localhost:8080/articulo/', articulo, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.Mesaje);
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }

  getArticulo(id): Observable<Articulo> {
    return this.http
      .get<Articulo>(`${this.urlEndpoint}/${id}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/articulo']);
          console.error(e.error.Mensaje);
          Swal.fire('Error al editar', e.error.Mensaje, 'error');
          return throwError(e);
        })
      );
  }

  updateArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http
      .put<Articulo>(`${this.urlEndpoint}/${articulo.id_articulo}`, articulo, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.Mesaje);
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }

  deleteArticulo(id_articulo: number): Observable<Articulo> {
    return this.http
      .delete<Articulo>(`${this.urlEndpoint}/${id_articulo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.Mesaje);
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }
}
