import { Component } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from '../mensaje/mensaje';
import { AouhtService } from '../usuarios/aouht.service';
import { Usuario } from '../usuario/usuario';

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

  constructor(private oauthService: AouhtService) {
    this.mensaje = {
      id_chat: {
        id_chat: 1,
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
      this.mensaje.tipo = 'NUEVO_USUARIO';
      this.client.publish({
        destination: '/app/chat',
        body: JSON.stringify(this.mensaje),
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
}
