import { Component } from '@angular/core';
import { Articulo } from './articulo';
import swal from 'sweetalert2';
import { ArticuloService } from './articulo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public articulo: Articulo = new Articulo()
  public titulo: string = 'Crear nuevo articulo'

  constructor(private articuloService: ArticuloService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  cargarArticulo(): void{
    this.activatedRoute.params.subscribe(params => {
      let id_articulo = params['id_articulo']
      if (id_articulo) {
        this.articuloService.getArticulo(id_articulo).subscribe((articulo) => this.articulo = articulo)
      }
    })
  }
  
  public crearArticulos(): void {
    this.articuloService.crearArticulo(this.articulo).subscribe(
      res => this.router.navigate(['/articulo'])
    )
  }
}
