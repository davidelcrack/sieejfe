import { Component, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { Etiqueta } from '../modelo/personalizado/etiqueta.model';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-etiquetas-inicio',
  templateUrl: './etiquetas-inicio.component.html',
  styleUrls: ['./etiquetas-inicio.component.css']
})
export class EtiquetasInicioComponent implements OnInit {

  constructor(
    private appComponent : AppComponent,
    private usuarioService : UsuarioService
  ) { }

  ngOnInit() { 
      
    /*this.usuarioService.obtenerEtiquetas().subscribe(
      response => {
        this.etiquetas = response;
        console.log(this.etiquetas);
      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );*/
  }

  valorEtiquetas = new  Array ();

  etiquetas : Array <Etiqueta> = [];

  cambiar(id){
    let elemento = (<HTMLInputElement>document.getElementById(id)).className;
    if(elemento === 'btn btn-outline-primary'){
     (<HTMLInputElement>document.getElementById(id)).className='btn btn-primary';
    }else{
      (<HTMLInputElement>document.getElementById(id)).className='btn btn-outline-primary';
    }

    let indice = this.valorEtiquetas.indexOf( this.valorEtiquetas.find(function(element) {
      return element.nombre == id;
    }));

    if(this.valorEtiquetas[indice].valor){
      this.valorEtiquetas[indice].valor=false;
    }else{
      this.valorEtiquetas[indice].valor=true;
    }
    console.log(this.valorEtiquetas);

  }
  
  guardarEtiquetas(){
    console.log('guardarEtiquetas : entro a guardarEtiquetas');
    AppComponent.mostrarEtiquetas=false;
  }

}
