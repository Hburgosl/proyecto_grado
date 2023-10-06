import { Estado } from '../estado/estado';
import { Existe } from '../existe/existe';
import { Roles } from '../roles/roles';

export class Usuario {
  documento_usuario: number;
  nombre_completo: string;
  fecha_nacimiento: string;
  pais: string;
  ciudad: string;
  direccion: string;
  email: string;
  imagen_usuario: String;
  fecha_creacion: Date;
  ultima_modificacion: Date;
  password: string;
  id_estado: Estado;
  id_existe: Existe;
  roles: Roles[] = [];
}
