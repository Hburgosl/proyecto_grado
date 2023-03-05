import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { OnInit } from '@angular/core';
import { Articulo } from 'src/app/model/Articulo';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{

  articulos: Articulo[] = []

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(){
    this.service.getArticulos()
      .subscribe((data:any) => {
        this.articulos = data        
    })
  }
}
