import { Component } from '@angular/core';
import { AouhtService } from '../usuarios/aouht.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public authService: AouhtService, private router: Router) {}

  logout() {
    let username = this.authService.usuario.email;
    this.authService.logout();
    Swal.fire('Logout', `${username} ha cerrado sesión con éxito`, 'success');
    this.router.navigate(['/login']);
  }
}
