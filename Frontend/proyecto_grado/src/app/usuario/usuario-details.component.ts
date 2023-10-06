import { Component } from '@angular/core';
import { AouhtService } from '../usuarios/aouht.service';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { ModalService } from '../articulo/detalle/modal.service';

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
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.modalService.notificarUpload.subscribe((res) => {
      if (res.documento_usuario == this.usuario.documento_usuario) {
        this.usuario.imagen_usuario = res.imagen_usuario;
      }
    });
  }

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }
}
