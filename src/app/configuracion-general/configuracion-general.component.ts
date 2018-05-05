import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApoyoIdeasService } from '../servicios/apoyoIdeas/apoyo-ideas.service';
import { PopupAvisoComponent } from '../popup-aviso/popup-aviso.component';
import { ConfiguracionService } from '../servicios/confGeneral/configuracion.service';

@Component({
  selector: 'app-configuracion-general',
  templateUrl: './configuracion-general.component.html',
  styleUrls: ['./configuracion-general.component.css']
})
export class ConfiguracionGeneralComponent implements OnInit {

  constructor(
    private apoyoIdeasService : ApoyoIdeasService,
    private configuracionService : ConfiguracionService
  ) { }

  ngOnInit() {
    this.apoyoIdeasService.listar().subscribe( 
      response =>{
        this.listaCampos=response;
        
        this.configuracionService.cargarActuales().subscribe( 
          responseActuales =>{                        
            // let aux=[]
            // responseActuales.forEach(element => {
            //   if(this.listaCampos.find(x=>x.id==element.id)){
            //     aux.push(element)
            //   }              
            // });
            this.seleccionados = responseActuales;
            this.copia=responseActuales;
          });

    })
  }

  campos = new FormControl();
  seleccionados = new Array();
  copia = new Array();

  // listaCampos = [ 
  //   { id: 1, nombre :'Ciencia'}, { id: 2, nombre : 'Sistemas'}, { id: 3, nombre : 'Artes'}];

  listaCampos = new Array();

  enviarEtiquetas(){    
    
    let etiquetasEnviar = new Array();

    this.seleccionados.forEach(element => {
      let repetido = this.copia.find(function(elementBuscar){
        return element.id == elementBuscar.id;
      });    

      if(repetido == undefined){
        etiquetasEnviar.push(element);
      }

    });    


    this.configuracionService.asignarEtiquetas(etiquetasEnviar).subscribe(
      response =>{    
        console.log(response);    
        this.avisar();
      });

  }

  mensajeMostrar : any = "Cambios guardados satisfactoriamente";
  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;

  avisar(){
    this.avisoPopUp.mostrarPopExito();    
  }

  onCerrarNotify(e){
    console.log('onNotifyPopUp : entro a onNotifyPopUp',e);     
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

}
