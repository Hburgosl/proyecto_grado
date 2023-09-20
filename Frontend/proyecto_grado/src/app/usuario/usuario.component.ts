import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  @Input() public usuario: Usuario = new Usuario();

  constructor(private router: Router, private usuarioService: UsuarioService) {
    // this.usuario = {
    //   id_estado: {
    //     id_estado: 5,
    //     estado: 'Disponible',
    //   },
    //   id_existe: {
    //     id_existe: 4,
    //     valor: 'Existe',
    //   },
    //   roles: {
    //     id_rol: 2,
    //     nombre_rol: 'ROLE_USER',
    //   },
    // } as any;

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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  public crearUsuarios(): void {
    // Primero, crea el artículo
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      (res) => {
        Swal.fire('Usuario creado', 'XDXDXD', 'success');

        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        // Aquí puedes manejar el error como desees, mostrar un mensaje de error, etc.
        Swal.fire(
          'Error al crear usuario',
          'Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo más tarde.',
          'error'
        );
      }
    );
  }
}
