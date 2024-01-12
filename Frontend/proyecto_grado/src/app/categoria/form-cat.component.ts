import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Existe } from '../existe/existe';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form-cat',
  templateUrl: './form-cat.component.html',
  styleUrls: ['./form-cat.component.css'],
})
export class FormCatComponent {
  public exist: Existe[];
  public categoria: Categoria = new Categoria();

  constructor(
    public categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarExiste();
    this.cargarCategoria();
  }

  public cargarExiste(): void {
    this.categoriaService.getExiste().subscribe((existe) => {
      this.exist = existe;
    });
  }

  public cargarCategoria(): void {
    this.route.params.subscribe((params) => {
      const categoryId = +params['id_categoria'];
      if (categoryId) {
        this.categoriaService
          .getCategoriaById(categoryId)
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
          .subscribe((category) => {
            this.categoria = category;
          });
      }
    });
  }

  public compararExiste(o1: Existe, o2: Existe): boolean {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id_existe === o2.id_existe;
  }

  public createCategoria(): void {
    this.categoriaService.createCategoria(this.categoria).subscribe((res) => {
      this.router.navigate(['/categoria']);
      Swal.fire('Categoria creada', 'categoria creada con exito', 'success');
    });
  }

  public updateCategoria(): void {
    this.categoriaService.updateCategoria(this.categoria).subscribe((res) => {
      this.router.navigate(['/categoria']);
      Swal.fire(
        'Categoria actualizada',
        'categoria actualizada con exito',
        'success'
      );
    });
  }
}
