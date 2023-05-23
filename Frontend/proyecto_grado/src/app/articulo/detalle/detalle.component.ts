import { Component, Input } from '@angular/core';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { ModalService } from './modal.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-articulo',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent {
  @Input() articulo: Articulo;
  titulo: String = 'Detalle articulo';
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    public modalService: ModalService,
    private articuloService: ArticuloService
  ) {}

  ngOnInit() {}

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire(
        'Error, seleccionar imagen',
        'Se debe seleccionar un archivo del tipo imagen',
        'error'
      );

      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error foto', 'Debe seleccionar una foto', 'error');
    } else {
      this.articuloService
        .subirFoto(this.fotoSeleccionada, this.articulo.id_articulo)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.articulo = response.Articulo as Articulo;
            Swal.fire(
              'Foto subida!',
              `La foto se ha subido con exito! ${this.articulo.imagen_articulo}`,
              'success'
            );
            console.log(response);
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
