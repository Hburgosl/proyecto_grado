import { Injectable } from '@angular/core';
import { Articulo } from './articulo';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private urlEndpoint: string = 'http://localhost:8080/articulo/list'

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAuthorized(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true
    }
    return false
  }

  getArticulos(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.urlEndpoint).pipe(
      catchError(e => {
        this.isNoAuthorized(e)
        return throwError(e)
      })
    )
  }
}
