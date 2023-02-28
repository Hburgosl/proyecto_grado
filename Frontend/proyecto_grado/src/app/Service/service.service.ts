import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../model/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/articulo/'

  getArticulos() {
    return this.http.get<Articulo[]>(this.url+'list')
  }
}
