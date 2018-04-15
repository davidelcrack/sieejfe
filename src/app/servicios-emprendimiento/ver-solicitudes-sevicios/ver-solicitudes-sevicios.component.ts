import { Component, OnInit } from '@angular/core';
import { EmprendimientoServicesService } from '../../servicios/serviciosDeEmprendimiento/emprendimiento-services.service';

@Component({
  selector: 'app-ver-solicitudes-sevicios',
  templateUrl: './ver-solicitudes-sevicios.component.html',
  styleUrls: ['./ver-solicitudes-sevicios.component.css']
})
export class VerSolicitudesSeviciosComponent implements OnInit {

  constructor(
    private emprendimientoServicesService : EmprendimientoServicesService
  ) { }

  ngOnInit() {
  }

  pedirSolicitudes(codigo : any){
    this.emprendimientoServicesService.obtenerSolicitudes(codigo).subscribe(
      response => {         
        console.log(response);        
        // response.forEach(element => {          
        //   data ={
        //     id : element.id,
        //     nombre : element.nombre,
        //     link : element.url
        //   };
        //   this.servicios.push(data);          
        // });
        // console.log(this.servicios);
        // this.dataSource._updateChangeSubscription();
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort= this.sort;
        // });
        
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    );
  }

}
