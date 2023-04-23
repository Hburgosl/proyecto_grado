import { Component } from '@angular/core';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],
})
export class ArticuloComponent {
  articulos: Articulo[];

  constructor(private articuloService: ArticuloService) {}

  ngOnInit() {
    this.articuloService
      .getArticulos()
      .subscribe((articulos) => (this.articulos = articulos));
    console.log(this.articulos);
  }

  public deleteArticulo(articulo: Articulo): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas seguro?',
        text: `Seguro que deseas eliminar el articulo ${articulo.nombre_articulo}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.articuloService
            .deleteArticulo(articulo.id_articulo)
            .subscribe((res) => {
              this.articulos = this.articulos.filter((art) => art !== articulo);
              swalWithBootstrapButtons.fire(
                'Articulo eliminado!',
                'Articulo eliminado con exito.',
                'success'
              );
            });
        }
      });
  }
}
