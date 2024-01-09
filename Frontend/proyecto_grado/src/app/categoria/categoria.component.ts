import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AouhtService } from '../usuarios/aouht.service';
import { Roles } from '../roles/roles';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent {
  public categorias: Categoria[];
  selectedCategoryId: number;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private authService: AouhtService
  ) {}

  ngOnInit(): void {
    console.log(this.authService.usuario.roles);
    if (this.authService.usuario.documento_usuario == 1234197828) {
      this.cargarCategoria();
    } else {
      // Si el rol no es 'ROLE_ADMIN', puedes mostrar un mensaje de error o redirigir
      Swal.fire({
        icon: 'error',
        title: 'Acceso no autorizado',
        text: 'No tienes permisos de administrador para acceder a esta página',
        confirmButtonText: 'Entendido',
      });
      this.router.navigate(['/articulo']); // Ajusta la ruta según tus necesidades
    }
  }

  public cargarCategoria(): void {
    this.categoriaService.getCategoria().subscribe(
      (categoria) => {
        this.categorias = categoria;
      },
      (error) => {
        if (error.status === 401) {
          // Mostrar SweetAlert cuando el usuario no está autenticado
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Debes iniciar sesión primero',
            confirmButtonText: 'Entendido',
          });

          // Redirigir al usuario a la página de inicio de sesión si es necesario
          this.router.navigate(['/login']);
        } else {
          // Manejar otros errores
          console.error(error);
        }
      }
    );
  }
}
