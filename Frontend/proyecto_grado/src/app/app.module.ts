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
import { FormCatComponent } from './categoria/form-cat.component';
import { UsuarioDetailsComponent } from './usuario/usuario-details.component';
import { ActualizarFotoComponent } from './usuario/actualizar-foto/actualizar-foto.component';
import { UsuarioArticuloComponent } from './usuario-articulo/usuario-articulo.component';
import { PaginatorArtUserComponent } from './paginator-art-user/paginator-art-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { ChatsComponent } from './chats/chats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', redirectTo: '/articulo', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'articulo', component: ArticuloComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'articulo/page/:page', component: ArticuloComponent },
  { path: 'articulo/form', component: FormComponent },
  { path: 'articulo/form/:id_articulo', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuario/form', component: UsuarioComponent },
  { path: 'usuario/form/:documento_usuario', component: UsuarioComponent },
  { path: 'categoria/form', component: FormCatComponent },
  { path: 'categoria/form/:id_categoria', component: FormCatComponent },
  { path: 'usuario/detail', component: UsuarioDetailsComponent },
  { path: 'usuario/articulos', component: UsuarioArticuloComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id_chat', component: ChatComponent },
  { path: 'chats', component: ChatsComponent },
  {
    path: 'usuario/articulos/page/:page',
    component: UsuarioArticuloComponent,
  },
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
    FormCatComponent,
    UsuarioDetailsComponent,
    ActualizarFotoComponent,
    UsuarioArticuloComponent,
    PaginatorArtUserComponent,
    ChatComponent,
    MensajeComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
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
