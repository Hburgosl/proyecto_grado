import { Component } from '@angular/core';
import { Articulo } from './articulo';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public articulo: Articulo = new Articulo()
  public titulo: string = 'Crear nuevo articulo'

  constructor() { }
  
  public crearArticulo(): void {
    console.log('Click');
    console.log(this.articulo);
    swal.fire('Nuevo articulo', `Articulo ${this.articulo.nombre_articulo} creado con exito`, 'success')
  }

}
