import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ModalService } from '../articulo/detalle/modal.service';
import { AouhtService } from '../usuarios/aouht.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  @Input() public usuario: Usuario = new Usuario();
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private authService: AouhtService
  ) {
    this.usuario = {
      id_estado: {
        id_estado: 5,
        estado: 'Disponible',
      },
      id_existe: {
        id_existe: 4,
        valor: 'Existe',
      },
      roles: [
        {
          id_rol: 2,
          nombre_rol: 'ROLE_USER',
        },
      ],
    } as any;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.cargarUsuario();
    }
  }

  public cargarUsuario(): void {
    this.route.params.subscribe((params) => {
      const id = +params['documento_usuario'];
      this.usuarioService.getUsuario(id).subscribe((res) => {
        this.usuario = res;
      });
    });
  }

  public crearUsuarios(): void {
    // Primero, crea el artículo
    this.usuarioService.crearUsuario(this.usuario).subscribe((res) => {
      Swal.fire(
        'Usuario creado',
        `${res.Usuario.documento_usuario} creado con éxito`,
        'success'
      );

      if (this.fotoSeleccionada) {
        // Actualiza el ID del artículo actual con el nuevo ID asignado después de la creación
        this.usuario.documento_usuario = res.Usuario.documento_usuario;

        // Llama al método subirFoto() para cargar la foto
        this.usuarioService
          .subirFoto(this.fotoSeleccionada, this.usuario.documento_usuario)
          .subscribe(
            (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                // Actualiza el progreso si es necesario
                this.progreso = Math.round((event.loaded / event.total) * 100);
              } else if (event.type === HttpEventType.Response) {
                // Subida exitosa
                console.log('Foto subida con éxito', event);
              }
            },
            (error) => {
              // Manejo de errores
              console.error('Error al subir la foto:', error);
            }
          );
      }

      this.router.navigate(['/login']);
    });
  }

  public updateUsuario(): void {
    this.usuarioService.updateUsuario(this.usuario).subscribe((res) => {
      this.router.navigate(['/usuario/detail']);
      Swal.fire(
        'Usuario actualizada',
        'Usuario actualizado con exito',
        'success'
      );
    });
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

  // subirFoto() {
  //   if (!this.fotoSeleccionada) {
  //     Swal.fire('Error foto', 'Debe seleccionar una foto', 'error');
  //   } else {
  //     this.usuarioService
  //       .subirFoto(this.fotoSeleccionada, this.usuario.documento_usuario)
  //       .subscribe((event) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progreso = Math.round((event.loaded / event.total) * 100);
  //         } else if (event.type === HttpEventType.Response) {
  //           let response: any = event.body;
  //           this.usuario = response.Usuario as Usuario;
  //           this.modalService.notificarUpload.emit(this.usuario);
  //           Swal.fire(
  //             'Foto subida!',
  //             `La foto se ha subido con exito! ${this.usuario.imagen_usuario}`,
  //             'success'
  //           );
  //           console.log(response);
  //         }
  //       });
  //   }
  // }
}
