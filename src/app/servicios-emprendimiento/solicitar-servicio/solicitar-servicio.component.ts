import { Component, OnInit, ViewChild } from '@angular/core';
import { EmprendimientoServicesService } from '../../servicios/serviciosDeEmprendimiento/emprendimiento-services.service';
import { PopupAvisoComponent } from '../../popup-aviso/popup-aviso.component';

@Component({
  selector: 'app-solicitar-servicio',
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.css']
})
export class SolicitarServicioComponent implements OnInit {

  constructor(
    private emprendimientoServicesService : EmprendimientoServicesService
  ) { }

  solicitudPojo = { nombre : "" , descripcion : ""  }

  ngOnInit() {
  }

  mensajeMostrar : any = "Se ha enviado su solicitud correctamente";
  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;

  solicitarServicio(){

    this.emprendimientoServicesService.solicitarService(this.solicitudPojo).subscribe(
      response => {         
        console.log(response);                                
        this.avisar();
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    );
  }

  avisar(){
    this.avisoPopUp.mostrarPopExito();
  }

}
