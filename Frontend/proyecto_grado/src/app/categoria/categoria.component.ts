import { Component } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent {
  public categorias: Categoria[];
  selectedCategoryId: number;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategoria();
  }

  public cargarCategoria(): void {
    this.categoriaService.getCategoria().subscribe((categoria) => {
      this.categorias = categoria;
    });
  }
}
