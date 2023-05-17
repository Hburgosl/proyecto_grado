import { Component } from '@angular/core';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-articulo',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent {
  articulo: Articulo;
  titulo: String = 'Detalle articulo';
  private fotoSeleccionada: File;

  constructor(
    private articuloService: ArticuloService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id_articulo');
      if (id) {
        this.articuloService.getArticulo(id).subscribe((articulo) => {
          this.articulo = articulo;
        });
      }
    });
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.articuloService
      .subirFoto(this.fotoSeleccionada, this.articulo.id_articulo)
      .subscribe((articulo) => {
        this.articulo = articulo;
        Swal.fire(
          'Foto subida!',
          `La foto se ha subido con exito! ${this.articulo.imagen_articulo}`,
          'success'
        );
      });
  }
}
