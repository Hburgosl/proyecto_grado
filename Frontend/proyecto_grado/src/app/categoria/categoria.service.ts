import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from './categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Existe } from '../existe/existe';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AouhtService } from '../usuarios/aouht.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  modoEdicion: boolean = false;
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

  activarModoEdicion() {
    this.modoEdicion = true;
  }

  desactivarModoEdicion() {
    this.modoEdicion = false;
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/categoria/list', {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  getExiste(): Observable<Existe[]> {
    return this.http.get<Existe[]>('http://localhost:8080/existe/list');
  }

  getCategoriaById(id_categoria): Observable<Categoria> {
    return this.http.get<Categoria>(
      'http://localhost:8080/categoria/list/' + id_categoria,
      {
        headers: this.agregarAuthorizationHeader(),
      }
    );
  }

  createCategoria(categoria: Categoria): Observable<any> {
    return this.http
      .post<any>('http://localhost:8080/categoria/', categoria)
      .pipe(
        catchError((e) => {
          console.error(e.error.Mesaje);
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }

  updateCategoria(categoria: Categoria): Observable<any> {
    return this.http
      .put<any>(
        'http://localhost:8080/categoria/list/' + categoria.id_categoria,
        categoria
      )
      .pipe(
        catchError((e) => {
          console.error(e.error.Mesaje);
          Swal.fire(e.error.Mensaje, e.error.Error, 'error');
          return throwError(e);
        })
      );
  }
}
