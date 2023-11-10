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
  doc = 1234567893;
  constructor(
    private router: Router,
    private http: HttpClient,
    private oauthService: AouhtService
  ) {
    this.chat = {
      nombre_chat: 'Chat_ejemplo',
      id_existe: {
        id_existe: 4,
      },
    } as any;
  }

  crearChatEntreUsuarios(usuarioArticulo: number): void {
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
        this.crearChat(usuarioArticulo);
      } else {
        // Se hizo clic en "Cancelar", puedes realizar alguna otra acción si lo deseas
        console.log('Creación de chat cancelada');
      }
    });
  }

  crearChat(usuarioArticulo: number): void {
    this.http.post(this.url + 'chat/', this.chat).subscribe((chat: any) => {
      const id_chat = chat.id_chat;

      this.http
        .post(
          `${this.url + 'chat/agregar-usuarios/'}${id_chat}/${
            this.oauthService.usuario.documento_usuario
          }/${usuarioArticulo}`,
          {}
        )
        .subscribe((chatUsuario: any) => {
          console.log(chatUsuario);
          this.router.navigate(['/chats']);
        });
    });
  }
}
