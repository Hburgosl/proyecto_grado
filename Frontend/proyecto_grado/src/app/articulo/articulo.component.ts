import { Component, Input, SimpleChanges } from '@angular/core';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import { ModalService } from './detalle/modal.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AouhtService } from '../usuarios/aouht.service';
import { ChatService } from '../chats/chat.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],
})
export class ArticuloComponent {
  @Input() paginator: any;
  articulos: Articulo[];
  articuloSeleccionado: Articulo;

  constructor(
    private modalService: ModalService,
    private articuloService: ArticuloService,
    private activatedRoute: ActivatedRoute,
    public authService: AouhtService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.articuloService
        .getArticulos(page)
        .pipe(
          tap((response: any) => {
            console.log('Articulo tap 3');
            (response.content as Articulo[]).forEach((articulo) => {
              console.log(articulo.nombre_articulo);
            });
          })
        )
        .subscribe((response) => {
          this.articulos = response.content as Articulo[];
          this.paginator = response;
        });
    });

    this.modalService.notificarUpload.subscribe((articulo) => {
      this.articulos = this.articulos.map((articuloOriginal) => {
        if (articulo.id_articulo == articuloOriginal.id_articulo) {
          articuloOriginal.imagen_articulo = articulo.imagen_articulo;
        }
        return articuloOriginal;
      });
    });
  }

  activarEdicion() {
    this.articuloService.activarModoEdicion();
  }

  desactivarEdicion() {
    this.articuloService.desactivarModoEdicion();
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

  crearChatEntreUsuarios(usuarioArticulo: number): void {
    this.chatService.crearChatEntreUsuarios(usuarioArticulo);
  }
}
