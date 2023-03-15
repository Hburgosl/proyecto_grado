import { Component } from '@angular/core';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent {

  articulos: Articulo[]

  constructor(private articuloService: ArticuloService){}

  ngOnInit(){
    this.articuloService.getArticulos().subscribe(
      articulos => this.articulos = articulos
    )
  }
  
}
