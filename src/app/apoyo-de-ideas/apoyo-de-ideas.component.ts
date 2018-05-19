import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PopupAvisoComponent } from '../popup-aviso/popup-aviso.component';
import { ApoyoIdeasService } from '../servicios/apoyoIdeas/apoyo-ideas.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-apoyo-de-ideas',
  templateUrl: './apoyo-de-ideas.component.html',
  styleUrls: ['./apoyo-de-ideas.component.css']
})
export class ApoyoDeIdeasComponent implements OnInit {

  constructor(
    private apoyoIdeasService : ApoyoIdeasService,
    private appComponent : AppComponent
  ) { }

  ngOnInit() {
    this.apoyoIdeasService.listar().subscribe( 
      response =>{
        this.listaCampos=response;
    })
  }

  campos = new FormControl();
  seleccionados = new Array();
  etapaActual: any;

  etapas = [
    {id: 1, value: 'GESTACION', nombre: 'Gestación'},
    {id: 2, value: 'PUESTA_MARCHA', nombre: 'Puesta en Marcha'},
    {id: 3, value: 'DESARROLLO_INICIAL', nombre: 'Desarrollo Inicial'}
  ];

  // listaCampos = [ 
  //   { id: 1, nombre :'Ciencia'}, { id: 2, nombre : 'Sistemas'}, { id: 3, nombre : 'Artes'}];

  listaCampos = new Array();

  solicitudIdea = { titulo : "" , descripcion : ""  }

  mensajeMostrar : any = "¡Su idea ya está siendo observada!";
  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;

  enviarIdea(){    
    debugger
    let idea ={
      etiquetas : this.seleccionados,
      nombre: this.solicitudIdea.titulo,
      descripcion : this.solicitudIdea.descripcion,
      etapa : this.etapaActual.nombre
    }

    this.apoyoIdeasService.enviar(idea).subscribe(
      response =>{    
        console.log(response);    
        this.avisar();
      });     

  }

  avisar(){
    this.avisoPopUp.mostrarPopExito();    
  }

  onCerrarNotify(e){
    console.log('onNotifyPopUp : entro a onNotifyPopUp',e); 
    this.appComponent.cerrarTab('cuentanos');      
  }



}
