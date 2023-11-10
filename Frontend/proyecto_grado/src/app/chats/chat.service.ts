import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AouhtService } from '../usuarios/aouht.service';
import { Chat } from '../chat/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  url: String = 'http://localhost:8080/';
  chat: Chat = new Chat();
  constructor(
    private router: Router,
    private http: HttpClient,
    private oauthService: AouhtService
  ) {
    this.chat = {
      id_existe: {
        nombre_chat: 'Chat_ejemplo',
        id_existe: 4,
      },
    } as any;
  }

  crearChatEntreUsuarios(): void {
    // Mostrar SweetAlert con botones de aceptar y cancelar
    Swal.fire({
      title: '¿Estás seguro de iniciar el chat?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      // Verificar si se hizo clic en "Aceptar"
      if (result.isConfirmed) {
        this.http.post(this.url + 'chat/', this.chat);
        //this.router.navigate(['/chats']);
      } else {
        // Se hizo clic en "Cancelar", puedes realizar alguna otra acción si lo deseas
        console.log('Creación de chat cancelada');
      }
    });
  }
}
