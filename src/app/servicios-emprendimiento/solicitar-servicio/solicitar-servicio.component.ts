import { Component, OnInit } from '@angular/core';
import { EmprendimientoServicesService } from '../../servicios/serviciosDeEmprendimiento/emprendimiento-services.service';

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

  solicitarServicio(){

    this.emprendimientoServicesService.solicitarService(this.solicitudPojo).subscribe(
      response => {         
        console.log(response);                
        
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    );


  }

}
