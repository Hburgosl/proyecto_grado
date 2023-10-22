import { Component, Input } from '@angular/core';
import { UsuarioArticuloService } from './usuario-articulo.service';
import { Articulo } from '../articulo/articulo';
import { ArticuloService } from '../articulo/articulo.service';
import { ActivatedRoute } from '@angular/router';
import { AouhtService } from '../usuarios/aouht.service';
import Swal from 'sweetalert2';
import { ModalService } from '../articulo/detalle/modal.service';

@Component({
  selector: 'app-usuario-articulo',
  templateUrl: './usuario-articulo.component.html',
  styleUrls: ['./usuario-articulo.component.css'],
})
export class UsuarioArticuloComponent {
  @Input() paginador: any;
  articulos: Articulo[] = null;
  documento_usuario: number = null;
  articuloSeleccionado: Articulo;

  constructor(
    private usuarioArticuloService: UsuarioArticuloService,
    private articuloService: ArticuloService,
    private activatedRoute: ActivatedRoute,
    private oauthService: AouhtService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getArticulosUsuario();
    this.cargarModal();
  }

  activarEdicion() {
    this.articuloService.activarModoEdicion();
  }

  desactivarEdicion() {
    this.articuloService.desactivarModoEdicion();
  }

  cargarModal() {
    this.modalService.notificarUpload.subscribe((articulo) => {
      this.articulos = this.articulos.map((articuloOriginal) => {
        if (articulo.id_articulo == articuloOriginal.id_articulo) {
          articuloOriginal.imagen_articulo = articulo.imagen_articulo;
        }
        return articuloOriginal;
      });
    });
  }

  getArticulosUsuario() {
    this.documento_usuario = this.oauthService.usuario.documento_usuario;
    this.activatedRoute.paramMap.subscribe((params) => {
      let page = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.usuarioArticuloService
        .getArticulosUsuario(this.documento_usuario, page)
        .subscribe((res: any) => {
          this.articulos = res.content as Articulo[];
          this.paginador = res;
        });
    });
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

  abrirModal(articulo: Articulo) {
    this.articuloSeleccionado = articulo;
    this.modalService.abrirModal();
  }
}
