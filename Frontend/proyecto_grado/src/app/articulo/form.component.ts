import { Component } from '@angular/core';
import { Articulo } from './articulo';
import swal from 'sweetalert2';
import { ArticuloService } from './articulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from './categoria';
import { Entrega } from './entrega';
import { Estado_articulo } from './estado_articulo';
import { Estado } from './estado';
import { Existe } from './existe';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public articulo: Articulo = new Articulo();
  public categoria: Categoria[];
  public entrega: Entrega[];
  public estado_articulo: Estado_articulo[];
  public estado: Estado[];
  public existe: Existe[];
  public titulo: string = 'Crear nuevo articulo';

  constructor(
    private articuloService: ArticuloService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarArticulo();
  }

  public cargarArticulo(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id_articulo = params['id_articulo'];
      if (id_articulo) {
        this.articuloService
          .getArticulo(id_articulo)
          .subscribe((articulo) => (this.articulo = articulo));
      }
    });

    this.articuloService
      .getCategoria()
      .subscribe((categorias) => (this.categoria = categorias));

    this.articuloService
      .getEntrega()
      .subscribe((entregas) => (this.entrega = entregas));

    this.articuloService
      .getEstadoArticulo()
      .subscribe(
        (estado_articulos) => (this.estado_articulo = estado_articulos)
      );

    this.articuloService
      .getEstado()
      .subscribe((estados) => (this.estado = estados));

    this.articuloService
      .getExiste()
      .subscribe((existe) => (this.existe = existe));
  }

  public crearArticulos(): void {
    this.articuloService.crearArticulo(this.articulo).subscribe((res) => {
      swal.fire(
        'Articulo creado',
        `${res.Articulo.nombre_articulo} creado con exito`,
        'success'
      );
      this.router.navigate(['/articulo']);
    });
  }

  public updateArticulo(): void {
    this.articuloService.updateArticulo(this.articulo).subscribe((res) => {
      this.router.navigate(['/articulo']);
      swal.fire(
        'Articulo actualizado',
        `${res.Articulo.nombre_articulo} actualizado con exito`,
        'success'
      );
    });
  }
}
