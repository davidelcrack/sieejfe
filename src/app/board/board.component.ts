import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(
    private appComponent : AppComponent
  ) { }

  panelImagenes= [
    {
      titulo: "titulo1",
      descripcion: "descripcion1",
      link :"evento"
    },
    {
      titulo: "titulo2",
      descripcion: "descripcion2",
      link :"directorio"
    },
    {
      titulo: "titulo3",
      descripcion: "descripcion3",
      link :"servicioEmprendimiento"
    }
  ]

  ngOnInit() {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));
    this.llamarServicio();
  }

  llamarServicio(){
    console.log('llamarServicio : entro a llamarServicio');
  }

  clickImagen(id : any){
    console.log("clickImagen : entro a clickImagen");    
    this.appComponent.openTabs(this.panelImagenes[id-1].link, null);
  }

  aprende(){
    this.appComponent.openTabs('aboutus', null);
  }

  esAdmin : boolean = false;

  abrirEventoHackaton(id: any){
    console.log('abrirEventoHackaton : entro a abrirEventoHackaton');
    if(this.esAdmin){
      this.appComponent.openTabs('eventoEspecifico', id);
    }else{
      this.appComponent.openTabs('detalleEvento', id);
    }
  }

}
