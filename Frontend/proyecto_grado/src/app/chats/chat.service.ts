import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AouhtService } from '../usuarios/aouht.service';
import { Chat } from '../chat/chat';
import { Observable } from 'rxjs';

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
  ) {}

  ngOnInit(): void {}

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
    this.http
      .post(
        `${
          this.url +
          'chat/agregar-usuarios/' +
          this.oauthService.usuario.documento_usuario
        }/${usuarioArticulo}`,
        {}
      )
      .subscribe((response: any) => {
        if (response.chatCreado) {
          // Se creó un nuevo chat
          Swal.fire(
            '¡Nuevo Chat Creado!',
            'Se ha creado un nuevo chat.',
            'success'
          );
        } else {
          // Se encontró un chat existente
          Swal.fire(
            '¡Chat Existente!',
            'Ya existe un chat entre estos usuarios.',
            'success'
          );
        }
        this.router.navigate(['/chats']);
      });
  }

  getChatsUsuario(documento_usuario: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(
      `${this.url + 'chat/chats-de-usuario/'}${documento_usuario}`
    );
  }
}
