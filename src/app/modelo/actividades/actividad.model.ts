import { Evento } from "./evento.model";
import { Horario } from "../personalizado/horario.model";

export class Actividad extends Evento {
    public nombre: string;
    public horarios: Horario[];
}