import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from '../chat/chat';
import { Router } from '@angular/router';
import { AouhtService } from '../usuarios/aouht.service';
import { EMPTY, catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
  chats: Chat[];
  mostrarAlerta: boolean = false;
  constructor(
    private chatService: ChatService,
    private router: Router,
    private oauthService: AouhtService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getChats();
  }

  getChats() {
    this.chatService
      .getChatsUsuario(this.oauthService.usuario.documento_usuario)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            // Muestra la alerta si se recibe un error 404
            this.mostrarAlerta = true;
            console.log('No hay chats en la base de datos');
          }
          // Propaga el error para que sea manejado por el suscriptor final
          return EMPTY;
        })
      )
      .subscribe(
        (data) => {
          this.chats = data;
          console.log(this.chats);
        },
        (error) => {
          console.log('Error al obtener los chats', error);
        }
      );
  }

  irADetalleChat() {
    this.router.navigate(['/chat']);
  }
}
