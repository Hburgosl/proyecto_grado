import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ArticuloService } from './articulo/articulo.service';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './articulo/form.component';
import { LoginComponent } from './usuarios/login.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './articulo/detalle/detalle.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EntregaComponent } from './entrega/entrega.component';
import { EstadoArticuloComponent } from './estado-articulo/estado-articulo.component';
import { EstadoComponent } from './estado/estado.component';
import { ExisteComponent } from './existe/existe.component';
import { CategoriaService } from './categoria/categoria.service';
import { EntregaService } from './entrega/entrega.service';
import { EstadoService } from './estado/estado.service';
import { EstadoArticuloService } from './estado-articulo/estado-articulo.service';
import { ExisteService } from './existe/existe.service';
import { UsuarioService } from './usuario/usuario.service';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  { path: '', redirectTo: '/articulo', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'articulo', component: ArticuloComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'entrega', component: EntregaComponent },
  { path: 'estado', component: EstadoComponent },
  { path: 'estado_articulo', component: EstadoArticuloComponent },
  { path: 'existe', component: ExisteComponent },
  { path: 'articulo/page/:page', component: ArticuloComponent },
  { path: 'articulo/form', component: FormComponent },
  { path: 'articulo/form/:id_articulo', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ArticuloComponent,
    FormComponent,
    LoginComponent,
    PaginatorComponent,
    DetalleComponent,
    UsuarioComponent,
    CategoriaComponent,
    EntregaComponent,
    EstadoArticuloComponent,
    EstadoComponent,
    ExisteComponent,
    RolesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ArticuloService,
    CategoriaService,
    EntregaService,
    EstadoService,
    EstadoArticuloService,
    ExisteService,
    UsuarioService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
