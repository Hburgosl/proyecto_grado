import { Injectable } from '@angular/core';
import { Articulo } from './articulo';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AouhtService } from '../usuarios/aouht.service';
import Swal from 'sweetalert2';
import { Categoria } from '../categoria/categoria';
import { Entrega } from '../entrega/entrega';
import { Estado_articulo } from '../estado-articulo/estado_articulo';
import { Estado } from '../estado/estado';
import { Existe } from '../existe/existe';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private urlEndpoint: string = 'http://localhost:8080/articulo/list';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  modoEdicion: boolean = false;
  activarInput: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AouhtService
  ) {}

  activarModoEdicion() {
    this.activarInput = false;
    this.modoEdicion = true;
  }

  desactivarModoEdicion() {
    this.activarInput = true;
    this.modoEdicion = false;
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/categoria/list');
  }

  getEntrega(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>('http://localhost:8080/entrega/list');
  }

  getEstadoArticulo(): Observable<Estado_articulo[]> {
    return this.http.get<Estado_articulo[]>(
      'http://localhost:8080/estado_articulo/list'
    );
  }

  getEstado(): Observable<Estado[]> {
    return this.http.get<Estado[]>('http://localhost:8080/estado/list');
  }

  getExiste(): Observable<Existe[]> {
    return this.http.get<Existe[]>('http://localhost:8080/existe/list');
  }

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

  getArticulos(page: number): Observable<any[]> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('Articulo service tap 1');
        (response.content as Articulo[]).forEach((articulo) => {
          console.log(articulo.nombre_articulo);
        });
      }),

      map((response: any) => {
        (response.content as Articulo[]).map((art) => {
          art.nombre_articulo = art.nombre_articulo.toLocaleUpperCase();
          return art;
        });
        return response;
      }),

      tap((response) => {
        console.log('Articulo service tap 2');
        (response.content as Articulo[]).forEach((articulo) => {
          console.log(articulo.nombre_articulo);
        });
      }),

      catchError((e) => {
        this.isNoAuthorized(e);
        return throwError(e);
      })
    );
  }

  crearArticulo(articulo: Articulo): Observable<any> {
    return this.http
      .post<any>('http://localhost:8080/articulo/', articulo, {
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

  updateArticulo(articulo: Articulo): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndpoint}/${articulo.id_articulo}`, articulo, {
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

  subirFoto(archivo: File, id_articulo): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id_articulo);

    const req = new HttpRequest(
      'POST',
      'http://localhost:8080/articulo/upload',
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
