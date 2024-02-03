import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AouhtService } from './aouht.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  titulo: string = 'Por favor inicie sesión';
  usuario: Usuario;
  mostrarRecuperarContrasena = false;
  constructor(
    private authService: AouhtService,
    private route: Router,
    public usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire(
        'login',
        `Hola ${this.authService.usuario.email} ya estas autenticado`,
        'info'
      );
      this.route.navigate(['/articulo']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.email == null || this.usuario.password == null) {
      Swal.fire(
        'Error al iniciar sesión',
        'Email o Contraseña vacios',
        'error'
      );
      return;
    }

    this.authService.login(this.usuario).subscribe(
      (res) => {
        console.log(res);
        let usuario = this.authService.usuario;
        this.authService.guardarUsuario(res.access_token);
        this.authService.guardarToken(res.access_token);

        this.route.navigate(['/articulo']);
        Swal.fire(
          'Login',
          `Hola, ¡Cuidemos nuestro planeta! Antes de desechar, considera donar o
        reutilizar productos que aún están en buen estado. Tu pequeño gesto
        puede marcar la diferencia.`,
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          Swal.fire(
            'Error al iniciar sesión',
            'Email o Contraseña incorretos',
            'error'
          );
        }
      }
    );
  }

  enviarCorreo() {
    this.authService.enviarCorreoRecuperacion(this.usuario.email).subscribe(
      (respuesta) => {
        Swal.fire('Recuperación contraseña', respuesta, 'success').then(() => {
          // Este código se ejecutará después de que el usuario haga clic en "OK"
          this.mostrarRecuperarContrasena = false;
        });
      },
      (error) => {
        // Error 404: No se encontró el usuario
        Swal.fire(
          'Recuperación contraseña',
          'No se encontró un usuario con el correo proporcionado.',
          'error'
        ).then(() => {
          // Este código se ejecutará después de que el usuario haga clic en "OK"
          this.mostrarRecuperarContrasena = false;
        });
      }
    );
  }
}
