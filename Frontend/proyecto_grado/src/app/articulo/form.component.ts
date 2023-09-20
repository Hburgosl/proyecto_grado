import { Component, Input } from '@angular/core';
import { Articulo } from './articulo';
import Swal from 'sweetalert2';
import { ArticuloService } from './articulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from '../categoria/categoria';
import { Entrega } from '../entrega/entrega';
import { Estado_articulo } from '../estado-articulo/estado_articulo';
import { Estado } from '../estado/estado';
import { Existe } from '../existe/existe';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() public articulo: Articulo = new Articulo();
  public categoria: Categoria[];
  public entrega: Entrega[];
  public estado_articulo: Estado_articulo[];
  public estado: Estado[];
  public existe: Existe[];
  public titulo: string = 'Crear nuevo articulo';
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    public articuloService: ArticuloService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService
  ) {
    this.articulo = {
      id_estado: {
        id_estado: 5,
        estado: 'Disponible',
      },
      id_entrega: {
        id_entrega: 5,
        estado: 'No entregado',
      },
      id_existe: {
        id_existe: 4,
        valor: 'Existe',
      },
    } as any;
  }

  ngOnInit(): void {
    this.cargarArticulo();
  }

  public cargarArticulo(): void {
    this.articuloService
      .getCategoria()
      .subscribe((categorias) => (this.categoria = categorias));

    this.articuloService
      .getEntrega()
      .subscribe((entregas) => (this.entrega = entregas));

    this.articuloService
      .getEstadoArticulo()
      .subscribe(
        (estado_articulos) => (this.estado_articulo = estado_articulos)
      );

    this.articuloService
      .getEstado()
      .subscribe((estados) => (this.estado = estados));

    this.articuloService
      .getExiste()
      .subscribe((existe) => (this.existe = existe));

    this.activatedRoute.params.subscribe((params) => {
      let id_articulo = params['id_articulo'];
      if (id_articulo) {
        this.articuloService
          .getArticulo(id_articulo)
          .subscribe((articulo) => (this.articulo = articulo));
      }
    });
  }

  // public crearArticulos(): void {
  //   this.articuloService.crearArticulo(this.articulo).subscribe((res) => {
  //     Swal.fire(
  //       'Articulo creado',
  //       `${res.Articulo.nombre_articulo} creado con exito`,
  //       'success'
  //     );
  //     this.router.navigate(['/articulo']);
  //   });
  // }

  public crearArticulos(): void {
    // Primero, crea el artículo
    this.articuloService.crearArticulo(this.articulo).subscribe((res) => {
      Swal.fire(
        'Articulo creado',
        `${res.Articulo.nombre_articulo} creado con éxito`,
        'success'
      );

      // Después de crear el artículo, verifica si hay una foto seleccionada
      if (this.fotoSeleccionada) {
        // Actualiza el ID del artículo actual con el nuevo ID asignado después de la creación
        this.articulo.id_articulo = res.Articulo.id_articulo;

        // Llama al método subirFoto() para cargar la foto
        this.articuloService
          .subirFoto(this.fotoSeleccionada, this.articulo.id_articulo)
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

      this.router.navigate(['/articulo']);
    });
  }

  public updateArticulo(): void {
    this.articuloService.updateArticulo(this.articulo).subscribe((res) => {
      this.router.navigate(['/articulo']);
      Swal.fire(
        'Articulo actualizado',
        `${res.Articulo.nombre_articulo} actualizado con exito`,
        'success'
      );
    });
  }

  public compararCategoria(o1: Categoria, o2: Categoria): boolean {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }

    return o1 == null || o2 == null
      ? false
      : o1.id_categoria === o2.id_categoria;
  }

  public compararEntrega(o1: Entrega, o2: Entrega): boolean {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id_entrega === o2.id_entrega;
  }

  public compararEstadoArticulo(
    o1: Estado_articulo,
    o2: Estado_articulo
  ): boolean {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null
      ? false
      : o1.id_estado_articulo === o2.id_estado_articulo;
  }

  public compararEstado(o1: Estado, o2: Estado): boolean {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id_estado === o2.id_estado;
  }

  public compararExiste(o1: Existe, o2: Existe): boolean {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id_existe === o2.id_existe;
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
      this.articuloService
        .subirFoto(this.fotoSeleccionada, this.articulo.id_articulo)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.articulo = response.Articulo as Articulo;
            this.modalService.notificarUpload.emit(this.articulo);
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
}
