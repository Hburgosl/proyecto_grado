import { Categoria } from '../categoria/categoria';
import { Entrega } from '../entrega/entrega';
import { Estado } from '../estado/estado';
import { Estado_articulo } from '../estado-articulo/estado_articulo';
import { Existe } from '../existe/existe';

export class Articulo {
  id_articulo: number;
  nombre_articulo: string;
  descripcion: string;
  fecha_publicacion: Date;
  ultima_modificacion: Date;
  documento_usuario: number;
  id_estado: Estado;
  id_entrega: Entrega;
  id_categoria: Categoria;
  id_existe: Existe;
  id_estado_articulo: Estado_articulo;
  imagen_articulo: string;
}
