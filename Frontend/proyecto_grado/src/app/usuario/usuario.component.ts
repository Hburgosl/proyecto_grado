import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ModalService } from '../articulo/detalle/modal.service';
import { AouhtService } from '../usuarios/aouht.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  @Input() public usuario: Usuario = new Usuario();
  fotoSeleccionada: File;
  progreso: number = 0;
  usuarioForm: FormGroup;
  formEnviado = false;
  usuarioCreado: boolean = false;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private authService: AouhtService,
    private fb: FormBuilder
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

    this.usuarioForm = this.fb.group({
      documento_usuario: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      imagen: [''],
    });
  }

  ngOnInit(): void {
    if (this.authService.usuario.documento_usuario) {
      this.usuarioCreado = true;
    } else {
      this.usuarioCreado = false;
    }

    if (this.authService.isAuthenticated()) {
      this.cargarUsuario();
    }
  }

  public cargarUsuario(): void {
    this.route.params.subscribe((params) => {
      const id = +params['documento_usuario'];
      this.usuarioService
        .getUsuario(id)
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
          if (id != this.authService.usuario.documento_usuario) {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'You are not authorized to access this resource.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Redirige al inicio
              this.router.navigate(['/articulo']);
            });
          } else {
            this.usuario = res;
            this.usuarioForm.patchValue(this.usuario);
          } // Llena el formulario con la información del usuario
        });
    });
  }

  public crearUsuarios(): void {
    this.formEnviado = true;
    if (this.usuarioForm.valid) {
      this.asignarValoresAUsuario();
      this.usuarioService.crearUsuario(this.usuario).subscribe(
        (res) => {
          Swal.fire({
            title: 'Usuario creado',
            text: `${res.Usuario.documento_usuario} creado con éxito`,
            icon: 'success',
          });

          this.usuarioCreado = true;

          if (this.fotoSeleccionada) {
            this.usuario.documento_usuario = res.Usuario.documento_usuario;
            this.usuarioService
              .subirFoto(this.fotoSeleccionada, this.usuario.documento_usuario)
              .subscribe(
                (event) => {
                  if (event.type === HttpEventType.UploadProgress) {
                    this.progreso = Math.round(
                      (event.loaded / event.total) * 100
                    );
                  } else if (event.type === HttpEventType.Response) {
                    console.log('Foto subida con éxito', event);
                  }
                },
                (error) => {
                  console.error('Error al subir la foto:', error);
                }
              );
          }

          this.router.navigate(['/login']);
        },
        (error) => {
          // Manejo de errores
          if (error.status == 400) {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: `${error.error.Mensaje}`,
              icon: 'error',
            });
          }
        }
      );
    }
  }

  public updateUsuario(): void {
    this.asignarValoresAUsuario();
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

  get password() {
    return this.usuarioForm.get('password');
  }

  get passwordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password es obligatorio';
    }
    if (this.password.hasError('pattern')) {
      return 'La contraseña debe tener (Una mayuscula, un numero, un caracter especial y 8 caracteres de longitud.)';
    }
    return '';
  }

  public asignarValoresAUsuario(): void {
    this.usuario.documento_usuario = this.usuarioForm.value.documento_usuario;
    this.usuario.nombre_completo = this.usuarioForm.value.nombre_completo;
    this.usuario.fecha_nacimiento = this.usuarioForm.value.fecha_nacimiento;
    this.usuario.pais = this.usuarioForm.value.pais;
    this.usuario.ciudad = this.usuarioForm.value.ciudad;
    this.usuario.direccion = this.usuarioForm.value.direccion;
    this.usuario.email = this.usuarioForm.value.email;
    this.usuario.password = this.usuarioForm.value.password;
  }
}
