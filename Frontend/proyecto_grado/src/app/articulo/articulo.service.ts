import { Injectable } from '@angular/core';
import { Articulo } from './articulo';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private urlEndpoint: string = 'http://localhost:8080/articulo/list'

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.urlEndpoint)
  }
}
