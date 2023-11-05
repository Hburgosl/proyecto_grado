import { Chat } from '../chat/chat';
import { Existe } from '../existe/existe';
import { Usuario } from '../usuario/usuario';

export class Mensaje {
  id_mensaje: number;
  texto: String;
  fecha_envio: Date;
  id_chat: Chat;
  documento_usuario: Usuario;
  id_existe: Existe;
}
