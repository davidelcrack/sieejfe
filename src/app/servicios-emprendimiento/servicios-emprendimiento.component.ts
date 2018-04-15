import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DirectorioService } from '../servicios/directorio/directorio.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ServicioEmprendimiento } from '../modelo/servicioEmprendimiento/servicioEmprendimiento.model';
import { EmprendimientoServicesService } from '../servicios/serviciosDeEmprendimiento/emprendimiento-services.service';
import { ColaService } from '../servicios/cola/cola.service';

@Component({
  selector: 'app-servicios-emprendimiento',
  templateUrl: './servicios-emprendimiento.component.html',
  styleUrls: ['./servicios-emprendimiento.component.css']
})
export class ServiciosEmprendimientoComponent implements OnInit {

  constructor(
    private directorioService : DirectorioService,
    private elementRef: ElementRef,
    private emprendimientoServicesService : EmprendimientoServicesService,
    private colaService : ColaService
  ) {
    this.dataSource = new MatTableDataSource(this.servicios);
   }

  esAdmin : boolean = false;


  ngOnInit(
  ) {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));

    if(!this.esAdmin){
      this.displayedColumns = ['id', 'nombre', 'informacion'];
    }

    this.servicios=[];
    this.dataSource = new MatTableDataSource(this.servicios);
    let data : any;
    this.emprendimientoServicesService.obtenerLosServicios().subscribe(
      response => {         
        console.log(response);        
        response.forEach(element => {          
          data ={
            id : element.id,
            nombre : element.nombre,
            link : element.url
          };
          this.servicios.push(data);          
        });
        console.log(this.servicios);
        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort= this.sort;
        });
        
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    );

  

    // let data : ServicioEmprendimiento;
    // data ={
    //   id : 1,
    //   nombre : 'Ayuda',      
    //   link : 'www.javeriana.edu.co'
    // };
    // this.servicios.push(data);
    // data ={
    //   id : 2,
    //   nombre : 'Emprendimiento',      
    //   link : 'www.javeriana.edu.co'
    // };
    // this.servicios.push(data);    
  }
  
  displayedColumns = ['id', 'nombre', 'informacion' , 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  servicios = new Array();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  agregarServicio(){
    console.log('agregarServicio : entro a agregarServicio');
    let data : ServicioEmprendimiento;
    data ={
      id : 3,
      nombre : 'Extra',      
      link : 'www.javeriana.edu.co'
    };
    this.servicios.push(data);
    this.dataSource._updateChangeSubscription();
  }

  abrirInformacion(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    console.log(row);
    if(row.link.startsWith("http")){
      window.open(row.link,'_blank'); 
    }else{
      window.open('http://'+row.link,'_blank'); 
    }
  }

  servicio=new ServicioEmprendimiento();
  edita=0;
  editarServicio(servicioRow : any){
    if(servicioRow==undefined){
      this.servicio=new ServicioEmprendimiento();
      this.edita=0;
    }else{
      this.servicio=servicioRow;
      this.edita=1;
    }
    
    let el: any;
    el = document.getElementById("overlayServiciosEmprendimiento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    let el : any;
    el = document.getElementById("overlayServiciosEmprendimiento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  guardarCambios(){
    this.servicio.id=100;
    this.servicios.push(this.servicio);
    this.cerrarPopUp();
    this.dataSource._updateChangeSubscription();
  }

  cambio(atributo : any , valor : any , tipo : any, id:any){
    console.log('cambio : entro a cambio');
    console.log(atributo, valor);
    
    let mensaje = { id: id  , accion: 'editarServicio' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
    
    console.log(mensaje);

    let observable = this.colaService.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            

      },
        error => {
          console.log("Error al editar servicio");
        });
    } 
    

  }

}
