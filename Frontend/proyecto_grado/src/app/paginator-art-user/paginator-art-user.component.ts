import { Component, Input, SimpleChanges } from '@angular/core';
import { AouhtService } from '../usuarios/aouht.service';

@Component({
  selector: 'app-paginator-art-user',
  templateUrl: './paginator-art-user.component.html',
  styleUrls: ['./paginator-art-user.component.css'],
})
export class PaginatorArtUserComponent {
  @Input() paginator: any;
  paginas: number[];
  desde: number;
  hasta: number;
  documento_usuario: number;
  constructor(private oauthService: AouhtService) {
    this.documento_usuario = this.oauthService.usuario.documento_usuario;
  }

  ngOnInit() {
    this.initPaginador();
  }

  ngOnChanges(changes: SimpleChanges) {
    let pagActual = changes['paginator'];

    if (pagActual.previousValue) {
      this.initPaginador();
    }
  }

  private initPaginador(): void {
    this.desde = Math.min(
      Math.max(1, this.paginator.number - 4),
      Math.max(1, this.paginator.totalPages - 5)
    );

    this.hasta = Math.min(
      Math.max(6, this.paginator.number + 4),
      this.paginator.totalPages
    );

    if (this.paginator.totalPages > 2) {
      this.paginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginator.totalPages)
        .fill(0)
        .map((valor, indice) => indice + 1);
    }
  }
}
