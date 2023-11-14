import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
