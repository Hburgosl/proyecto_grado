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
import { AouhtService } from '../usuarios/aouht.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario/usuario.service';

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
  articuloForm: FormGroup;
  formEnviado = false;

  constructor(
    public articuloService: ArticuloService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    private oauthService: AouhtService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
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
      documento_usuario: {
        documento_usuario: this.oauthService.usuario.documento_usuario,
      },
    } as any;

    this.articuloForm = fb.group({
      nombre_articulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_categoria: ['', Validators.required], // Campo 'categoria' con validación de requerido
      id_entrega: [''], // Campo 'entrega' con validación de requerido
      id_estado_articulo: ['', Validators.required], // Campo 'estado_articulo' con validación de requerido
      id_estado: [''], // Campo 'estado' con validación de requerido
      id_existe: [''], // Campo 'existe' con validación de requerido
    });
  }

  ngOnInit(): void {
    this.cargarArticulo();
  }

  public cargarArticulo(): void {
    if (this.articuloService.modoEdicion) {
      this.articuloForm.get('id_estado').setValidators([Validators.required]);
      this.articuloForm.get('id_entrega').setValidators([Validators.required]);
      this.articuloForm.updateValueAndValidity();
    }

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
        this.articuloService.getArticulo(id_articulo).subscribe((articulo) => {
          this.articulo = articulo;
          this.articuloForm.patchValue({
            nombre_articulo: this.articulo.nombre_articulo,
            descripcion: this.articulo.descripcion,
            id_categoria: this.articulo.id_categoria,
            id_entrega: this.articulo.id_entrega,
            id_estado_articulo: this.articulo.id_estado_articulo,
            id_estado: this.articulo.id_estado,
            id_existe: this.articulo.id_existe,
          });
        });
      }
    });
  }

  public crearArticulos(): void {
    this.formEnviado = true;
    if (this.articuloForm.valid) {
      this.articulo.nombre_articulo = this.articuloForm.value.nombre_articulo;
      this.articulo.descripcion = this.articuloForm.value.descripcion;
      this.articulo.id_categoria = this.articuloForm.value.id_categoria;
      this.articulo.id_estado_articulo =
        this.articuloForm.value.id_estado_articulo;
      // Primero, crea el artículo
      this.articuloService.crearArticulo(this.articulo).subscribe(
        (res) => {
          Swal.fire({
            title: 'Articulo creado',
            text: `${res.Articulo.nombre_articulo} creado con éxito`,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirige al usuario a la ruta '/articulo'
              this.router.navigate(['/articulo']);
            }
          });

          // Después de crear el artículo, verifica si hay una foto seleccionada
          if (this.fotoSeleccionada) {
            // Actualiza el ID del artículo actual con el nuevo ID asignado después de la creación
            this.articulo.id_articulo = res.Articulo.id_articulo;

            // Llama al método subirFoto() para cargar la foto
            this.articuloService
              .subirFoto(this.fotoSeleccionada, this.articulo.id_articulo)
              .subscribe((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                  // Actualiza el progreso si es necesario
                  this.progreso = Math.round(
                    (event.loaded / event.total) * 100
                  );
                } else if (event.type === HttpEventType.Response) {
                  // Subida exitosa
                  console.log('Foto subida con éxito', event);
                }
              });
          }
        },
        (error) => {
          if (error.status === 500) {
            // Manejo de errores HTTP 500 (Internal Server Error) al crear el artículo
            console.log('Error interno del servidor al crear el artículo');
            // Puedes mostrar un mensaje de error al usuario aquí si lo deseas.
          } else {
            // Otro manejo de errores
            console.log('Error al crear el artículo');
            // Puedes mostrar un mensaje de error al usuario aquí si lo deseas.
          }
        }
      );
    } else {
      console.log('form invalid');
    }
  }

  public updateArticulo(): void {
    this.formEnviado = true;

    if (this.articuloForm.valid) {
      this.articulo.nombre_articulo = this.articuloForm.value.nombre_articulo;
      this.articulo.descripcion = this.articuloForm.value.descripcion;
      this.articulo.id_categoria = this.articuloForm.value.id_categoria;
      this.articulo.id_estado_articulo =
        this.articuloForm.value.id_estado_articulo;
      this.articulo.id_entrega = this.articuloForm.value.id_entrega;
      this.articulo.id_estado = this.articuloForm.value.id_estado;
      this.articulo.id_existe = this.articuloForm.value.id_existe;

      this.articuloService.updateArticulo(this.articulo).subscribe((res) => {
        this.router.navigate(['/articulo']);
        Swal.fire(
          'Articulo actualizado',
          `${res.Articulo.nombre_articulo} actualizado con exito`,
          'success'
        );
      });
    }
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
