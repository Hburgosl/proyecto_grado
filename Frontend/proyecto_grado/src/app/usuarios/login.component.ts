import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import { AouhtService } from './aouht.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  titulo: string = 'Por favor inicie sesión';
  usuario: Usuario;

  constructor(private authService: AouhtService, private route: Router) {
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
          `Hola, has iniciado sesión exitosamente.`,
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
}
