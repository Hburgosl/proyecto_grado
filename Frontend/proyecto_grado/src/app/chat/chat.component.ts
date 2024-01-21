import { Component } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from '../mensaje/mensaje';
import { AouhtService } from '../usuarios/aouht.service';
import { Usuario } from '../usuario/usuario';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chats/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  private client: Client;
  conectado: boolean = false;
  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  usuario: Usuario = new Usuario();
  id_chat = this.route.snapshot.paramMap.get('id_chat');

  constructor(
    private oauthService: AouhtService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private http: HttpClient
  ) {
    this.mensaje = {
      id_chat: {
        id_chat: this.id_chat,
      },
      documento_usuario: {
        documento_usuario: this.oauthService.usuario.documento_usuario,
        nombre_completo: this.oauthService.usuario.nombre_completo,
      },
      id_existe: {
        id_existe: 4,
      },
      tipo: 'Mensaje',
    } as any;
  }

  ngOnInit(): void {
    this.inicializarWebSocket();
    this.onWebSocketConnect();
    this.onWebSocketDisconnect();
    this.conectar();
    this.getMensajesChat();
  }

  inicializarWebSocket(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/ws');
    };
  }

  onWebSocketConnect(): void {
    this.client.onConnect = (frame) => {
      console.log('Conectado ' + this.client.connected + '+' + frame);
      this.conectado = true;
      this.client.subscribe('/chat/mensaje', (e) => {
        let mensaje = JSON.parse(e.body);
        this.mensajes.push(mensaje);
        console.log(mensaje);
      });

      this.checkIfChatHasMessages().then((hasMessages) => {
        if (!hasMessages) {
          // El chat no tiene mensajes, enviar el mensaje de nuevo usuario
          this.mensaje.tipo = 'NUEVO_USUARIO';
          this.client.publish({
            destination: '/app/chat',
            body: JSON.stringify(this.mensaje),
          });
        }
      });
    };
  }

  onWebSocketDisconnect(): void {
    this.client.onDisconnect = (frame) => {
      console.log('Desconectado ' + !this.client.connected + '+' + frame);
      this.conectado = false;
    };
  }

  conectar(): void {
    this.client.activate();
  }

  desconectar(): void {
    this.client.deactivate();
  }

  enviarMensaje(): void {
    this.mensaje.tipo = 'MENSAJE';
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(this.mensaje),
    });
    this.mensaje.texto = '';
  }

  getMensajesChat(): void {
    let id: number = parseInt(this.id_chat);
    this.chatService.getMensajesChat(id).subscribe((res) => {
      console.log(res);
      this.mensajes = res;
    });
  }

  checkIfChatHasMessages(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Realizar la llamada al endpoint /chat/hasMessages/{id}
      this.http
        .get<boolean>(
          `http://localhost:8080/mensaje/chat/hasMessages/${this.id_chat}`
        )
        .subscribe(
          (hasMessages) => resolve(hasMessages),
          (error) => {
            console.error(
              'Error al verificar si el chat tiene mensajes',
              error
            );
            reject(error);
          }
        );
    });
  }
}
