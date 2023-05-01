import { Component, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() paginator: any;
  paginas: number[];
  constructor() {}

  ngOnInit() {
    this.paginas = new Array(this.paginator.totalPages)
      .fill(0)
      .map((valor, indice) => indice + 1);
  }
}
