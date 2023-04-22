import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ArticuloService } from './articulo/articulo.service';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './articulo/form.component';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/articulo', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'articulo', component: ArticuloComponent},
  {path: 'articulo/form', component: FormComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ArticuloComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArticuloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
