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
  }

  campos = new FormControl();
  seleccionados = new Array();

  listaCampos = ['Ciencia', 'Sistemas', 'Artes', 'Electronica', 'Diseño', 'Otro'];

  solicitudIdea = { titulo : "" , descripcion : ""  }

  mensajeMostrar : any = "¡Su idea ya está siendo observada!";
  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;

  enviarIdea(){
    
    let idea ={
      categorias : this.seleccionados,
      titulo: this.solicitudIdea.titulo,
      descripcion : this.solicitudIdea.descripcion
    }

    // this.apoyoIdeasService.enviar(idea).subscribe(
    //   response =>{
    //     this.avisar();
    //   });

      this.avisar();   

  }

  avisar(){
    this.avisoPopUp.mostrarPopExito();    
  }

  onCerrarNotify(e){
    console.log('onNotifyPopUp : entro a onNotifyPopUp',e); 
    this.appComponent.cerrarTab('apoyoIdeas');      
  }



}
