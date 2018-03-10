import { Component, OnInit } from '@angular/core';
import { ColaService } from '../../servicios/cola/cola.service';

@Component({
  selector: 'app-dominio-pop-up',
  templateUrl: './dominio-pop-up.component.html',
  styleUrls: ['./dominio-pop-up.component.css']
})
export class DominioPopUpComponent implements OnInit {

  constructor(
    private serviceCola : ColaService
  ) { }

  ngOnInit() {
  }

  mostrarEdicionDominio=false;

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.mostrarEdicionDominio=false;
    let el : any;
    el = document.getElementById("overlayDominio");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  dominio:any;
  abrirEditarDominio(row : any){
    this.dominio=row;
    let el: any;
    el = document.getElementById("overlayDominio");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cambio(atributo : any , valor : any , tipo : any){
    console.log('cambio : entro a cambio');
    console.log(atributo, valor);

    let mensaje = { id: this.dominio.id  , accion: 'editarInventarioImagen' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
    
    console.log(mensaje);

    /*let observable = this.serviceCola.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            

      },
        error => {
          console.log("Error al editar descripcion imagen");
        });
    } */

  }

}
