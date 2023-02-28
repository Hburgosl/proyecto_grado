import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './articulo/agregar/agregar.component';
import { ListarComponent } from './articulo/listar/listar.component';
import { ModificarComponent } from './articulo/modificar/modificar.component';

const routes: Routes = [
  { path: 'listar', component: ListarComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'modificar', component: ModificarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
