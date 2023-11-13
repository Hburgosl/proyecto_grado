import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Mensaje } from '../mensaje/mensaje';
import { Usuario } from '../usuario/usuario';
import { AouhtService } from '../usuarios/aouht.service';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  private client: Client;
  conectado: boolean = false;
  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  usuario: Usuario = new Usuario();

  constructor(private oauthService: AouhtService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  inicializarWebSocket(): void {
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/ws');
    };
  }

  onWebSocketConnect(frame: any): void {
    console.log('Conectado ' + this.client.connected + '+' + frame);
    this.conectado = true;

    this.client.subscribe('/chat/mensaje', (e) => {
      this.onNuevoMensaje(e);
    });

    this.enviarMensajeNuevoUsuario();
  }

  onWebSocketDisconnect(frame: any): void {
    console.log('Desconectado ' + !this.client.connected + '+' + frame);
    this.conectado = false;
  }

  onNuevoMensaje(e: any): void {
    let mensaje = JSON.parse(e.body);
    this.mensajes.push(mensaje);
    console.log(mensaje);
  }

  enviarMensajeNuevoUsuario(): void {
    this.mensaje.tipo = 'NUEVO_USUARIO';
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(this.mensaje),
    });
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
