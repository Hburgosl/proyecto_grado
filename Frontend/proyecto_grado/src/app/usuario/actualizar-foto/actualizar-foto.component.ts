import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/articulo/detalle/modal.service';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { HttpEventType } from '@angular/common/http';
import { AouhtService } from 'src/app/usuarios/aouht.service';

@Component({
  selector: 'actualizar-foto',
  templateUrl: './actualizar-foto.component.html',
  styleUrls: ['./actualizar-foto.component.css'],
})
export class ActualizarFotoComponent {
  @Input() usuario: Usuario;
  titulo: String = 'Foto de perfil';
  fotoSeleccionada: File;
  progreso: number = 0;
  constructor(
    public modalService: ModalService,
    private usuarioService: UsuarioService,
    private authService: AouhtService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }

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
      this.usuarioService
        .subirFoto(this.fotoSeleccionada, this.usuario.documento_usuario)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.usuario = response.Usuario as Usuario;
            this.modalService.notificarUpload.emit(this.usuario);
            Swal.fire(
              'Foto subida!',
              `La foto se ha subido con exito! ${this.usuario.imagen_usuario}`,
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
