import { Component } from '@angular/core';
import { AouhtService } from '../usuarios/aouht.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Roles } from '../roles/roles';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public authService: AouhtService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  logout() {
    let username = this.authService.usuario.email;
    this.authService.logout();
    Swal.fire('Logout', `${username} ha cerrado sesión con éxito`, 'success');
    this.router.navigate(['/login']);
  }
}
