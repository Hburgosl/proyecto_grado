import { Component } from '@angular/core';
import { AouhtService } from '../usuarios/aouht.service';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { ModalService } from '../articulo/detalle/modal.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.css'],
})
export class UsuarioDetailsComponent {
  usuario: Usuario = new Usuario();
  usuarioSeleccionado: Usuario;

  constructor(
    private authService: AouhtService,
    public usuarioService: UsuarioService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
    this.modalService.notificarUpload.subscribe((res) => {
      if (res.documento_usuario == this.usuario.documento_usuario) {
        this.usuario.imagen_usuario = res.imagen_usuario;
      }
    });
  }

  public cargarUsuario(): void {
    this.usuarioService
      .getUsuario(this.authService.usuario.documento_usuario)
      .pipe(
        catchError((error) => {
          if (error.status === 403 || error.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'You are not authorized to access this resource.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Redirige al inicio
              this.router.navigate(['/articulo']);
            });
          }
          // Propaga el error
          return throwError(error);
        })
      )
      .subscribe((res) => {
        this.usuario = res;
      });
  }

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }
}
