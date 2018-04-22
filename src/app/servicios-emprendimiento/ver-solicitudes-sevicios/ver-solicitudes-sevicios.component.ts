import { Component, OnInit, ViewChild } from '@angular/core';
import { EmprendimientoServicesService } from '../../servicios/serviciosDeEmprendimiento/emprendimiento-services.service';
import { ColaService } from '../../servicios/cola/cola.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-ver-solicitudes-sevicios',
  templateUrl: './ver-solicitudes-sevicios.component.html',
  styleUrls: ['./ver-solicitudes-sevicios.component.css']
})
export class VerSolicitudesSeviciosComponent implements OnInit {

  constructor(
    private emprendimientoServicesService : EmprendimientoServicesService,
    private colaService : ColaService
  ) {
    this.dataSource = new MatTableDataSource(this.solicitudes);
   }

  esAdmin : boolean = false;

  ngOnInit() {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));
  
    this.pedirSolicitudes(0);   
  
  }
  
  displayedColumns = ['nombre', 'remitente', 'estado' ,'fecha' , 'ver'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  solicitudes = new Array();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  codigo:any;
  pedirSolicitudes(codigo : any){
    this.codigo=codigo;
    this.actualizarEscogido(codigo);

    this.solicitudes=[];
    this.dataSource = new MatTableDataSource(this.solicitudes);
    let data : any;
    this.emprendimientoServicesService.obtenerSolicitudes(codigo).subscribe(
      response => {         
        console.log(response);        
        response.forEach(element => {          
          let fechaMostrar= new Date(element.fecha);
          
          data ={
            id: element.id,
            nombre : element.nombre ,
            remitente : element.creador.nombre + ' '+ element.creador.apellidos,
            estado: element.activa,
            fecha : fechaMostrar.getDate()+' - '+(fechaMostrar.getMonth()+1)+' - '+ fechaMostrar.getFullYear(),
            descripcion : element.descripcion
          };
          this.solicitudes.push(data);          
        });
        console.log(this.solicitudes);
        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort= this.sort;
        });
        
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    );
  }

  actualizarEscogido(codigo){
    if(codigo==0){
      (<HTMLInputElement>document.getElementById('botonTodasSolicitudesAdmin')).className='btn btn-outline-primary'; 
      (<HTMLInputElement>document.getElementById('botonPorResolverSolicitudesAdmin')).className='btn btn-primary'; 
      (<HTMLInputElement>document.getElementById('botonResueltasSolicitudesAdmin')).className='btn btn-primary'; 
    }
    if(codigo==1){
      (<HTMLInputElement>document.getElementById('botonTodasSolicitudesAdmin')).className='btn btn-primary'; 
      (<HTMLInputElement>document.getElementById('botonPorResolverSolicitudesAdmin')).className='btn btn-outline-primary'; 
      (<HTMLInputElement>document.getElementById('botonResueltasSolicitudesAdmin')).className='btn btn-primary'; 
    }
    if(codigo==2){
      (<HTMLInputElement>document.getElementById('botonTodasSolicitudesAdmin')).className='btn btn-primary'; 
      (<HTMLInputElement>document.getElementById('botonPorResolverSolicitudesAdmin')).className='btn btn-primary'; 
      (<HTMLInputElement>document.getElementById('botonResueltasSolicitudesAdmin')).className='btn btn-outline-primary'; 
    }
  }
 
  solicitud = {id: -1 , nombre : "" ,  remitente : ' ',  estado: null, fecha :null, descripcion : ""};
  respuesta= null;
  abrirInformacion(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    console.log(row);
    this.solicitud=row;
    let el: any;
    el = document.getElementById("overlayResponderServicios");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');

    this.respuesta=null;
    this.solicitud== {id: -1 , nombre : "" ,  remitente : ' ',  estado: null, fecha :null, descripcion : ""};
    let el : any;
    el = document.getElementById("overlayResponderServicios");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  enviarCambios(){

    this.cerrarPopUp();
    this.dataSource._updateChangeSubscription();
  }

  enviar(){
    console.log('enviar : entro a enviar');

    let laRespueta = {id: this.solicitud.id , respuesta: this.respuesta}
    
    this.emprendimientoServicesService.cerrarSolicitud(laRespueta).subscribe(
      response => {         
        console.log(response); 
        this.cerrarPopUp();
        this.pedirSolicitudes(this.codigo);
      });

  }

}
