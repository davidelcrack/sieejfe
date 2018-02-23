import { Direccion } from "./direccion.model";
import { Horario } from "../personalizado/horario.model";

export class Lugar {
    public id:number;
    public nombre: string;
    public tipoLugar: string;
    public capacidad: string;
    public direccion: Direccion;
    public horarios: Horario[];
}