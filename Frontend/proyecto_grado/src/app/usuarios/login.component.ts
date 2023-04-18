import { Component } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AouhtService } from './aouht.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  titulo: string = "Por favor inicie sesión"
  usuario: Usuario

  constructor(private authService: AouhtService, private route: Router) {
    this.usuario = new Usuario()
  }
  
  login(): void {
    console.log(this.usuario);
    if (this.usuario.email == null || this.usuario.contrasenha == null) {
      Swal.fire('Error al iniciar sesión', 'Email o Contraseña vacios', 'error')
      return
    }

      this.authService.login(this.usuario).subscribe(res => {
      console.log(res);
      let payLoad = JSON.parse(atob(res.access_token.split('.')[1]))
      console.log(payLoad);
      

      this.route.navigate(['/articulo'])
      Swal.fire('Login', `Hola ${payLoad.username}, has iniciado sesión exitosamente.`, 'success')
  })
  }
}
