import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from './categoria';
import { HttpClient } from '@angular/common/http';
import { Existe } from '../existe/existe';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  modoEdicion: boolean = false;

  constructor(private http: HttpClient) {}

  activarModoEdicion() {
    this.modoEdicion = true;
  }

  desactivarModoEdicion() {
    this.modoEdicion = false;
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/categoria/list');
  }

  getExiste(): Observable<Existe[]> {
    return this.http.get<Existe[]>('http://localhost:8080/existe/list');
  }

  getCategoriaById(id_categoria): Observable<Categoria> {
    return this.http.get<Categoria>(
      'http://localhost:8080/categoria/list/' + id_categoria
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
