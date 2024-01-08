import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCategoria();
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
