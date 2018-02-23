import { Usuario } from "../usuario.model";
import { Lugar } from "../ubicacion/lugar.model";

export class Universidad extends Usuario{
    public lugares: Lugar[];
}