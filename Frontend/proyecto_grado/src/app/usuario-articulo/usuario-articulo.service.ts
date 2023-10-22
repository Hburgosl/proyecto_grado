import { Injectable } from '@angular/core';
import { AouhtService } from '../usuarios/aouht.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Articulo } from '../articulo/articulo';

@Injectable({
  providedIn: 'root',
})
export class UsuarioArticuloService {
  private urlEndpoint: String = 'http://localhost:8080/articulo/list/articulos';

  constructor(private http: HttpClient) {}

  getArticulosUsuario(
    documento_usuario: number,
    page: number
  ): Observable<any[]> {
    return this.http
      .get(this.urlEndpoint + '/' + documento_usuario + '/page/' + page)
      .pipe(
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
          //this.isNoAuthorized(e);
          return throwError(e);
        })
      );
  }
}
