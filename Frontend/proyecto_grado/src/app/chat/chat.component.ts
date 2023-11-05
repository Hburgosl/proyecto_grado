import { Component } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from '../mensaje/mensaje';

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

  constructor() {
    this.mensaje = {
      id_chat: {
        id_chat: 1,
      },
      documento_usuario: {
        documento_usuario: 1234197828,
      },
      id_existe: {
        id_existe: 4,
      },
    } as any;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/ws');
    };

    this.client.onConnect = (frame) => {
      console.log('Conectado ' + this.client.connected + '+' + frame);
      this.conectado = true;

      this.client.subscribe('/chat/mensaje', (e) => {
        let mensaje = JSON.parse(e.body);
        this.mensajes.push(mensaje);
        console.log(mensaje);
      });
    };

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
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(this.mensaje),
    });
    this.mensaje.texto = '';
  }
}
