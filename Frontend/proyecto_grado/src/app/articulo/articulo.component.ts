import { Component } from '@angular/core';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

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
      .getArticulos(0)
      .pipe(
        tap((response: any) => {
          console.log('Articulo tap 3');
          (response.content as Articulo[]).forEach((articulo) => {
            console.log(articulo.nombre_articulo);
          });
        })
      )
      .subscribe(
        (response) => (this.articulos = response.content as Articulo[])
      );
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
