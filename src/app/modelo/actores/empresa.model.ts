import { Usuario } from "../usuario.model";
import { Lugar } from "../ubicacion/lugar.model";

export class Empresa extends Usuario{
    public lugares: Lugar[];
}