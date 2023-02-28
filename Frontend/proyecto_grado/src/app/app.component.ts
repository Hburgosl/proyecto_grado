import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto_grado';

  constructor(private router: Router) { }
  
  listar_articulos() {
    this.router.navigate(['listar'])
  }

  nuevo_articulo() {
    this.router.navigate(['agregar'])
  }
}
