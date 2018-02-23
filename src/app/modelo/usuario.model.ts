import { Horario } from "./personalizado/horario.model";
import { Evento } from "./actividades/evento.model";
import { Etiqueta } from "./personalizado/etiqueta.model";

export class Usuario {
    public id: number;
    public nombre: string;
    public apellidos: string;
    public username: string;
    public password: string;
    public estadoEnum: string; //Numeración de estados
    public horarios: Horario[];
    public eventosSuscritos: Evento[];
    public eventosCreados: Evento[];
    public preferencias: Etiqueta[];
}