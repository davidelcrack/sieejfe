import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DirectorioService } from '../servicios/directorio/directorio.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ServicioEmprendimiento } from '../modelo/servicioEmprendimiento/servicioEmprendimiento.model';

@Component({
  selector: 'app-servicios-emprendimiento',
  templateUrl: './servicios-emprendimiento.component.html',
  styleUrls: ['./servicios-emprendimiento.component.css']
})
export class ServiciosEmprendimientoComponent implements OnInit {

  constructor(
    private directorioService : DirectorioService,
    private elementRef: ElementRef
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

    /*
    this.directorioService.obtenerDirectorio().subscribe(
      response => {
        console.log(response);
        response.forEach(element => {
          let data : any;
          data ={
            id : element.id,
            url : element.url,
            activo : element.activo,
            nombreUniversidad : element.nombreUniversidad,
            editaUniversidad : '---'
          };
          this.universidades.push(data);          
        });
        this.dataSource._updatePaginator(4);
        //this.dataSource._updateChangeSubscription();
        //this.dataSource.connect();

        // updateValues(myArray: any[]) {
        //   this.dataSource.next(myArray)
        // }

      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );  

    */

    let data : ServicioEmprendimiento;
    data ={
      id : 1,
      nombre : 'Ayuda',      
      link : 'www.javeriana.edu.co'
    };
    this.servicios.push(data);
    data ={
      id : 2,
      nombre : 'Emprendimiento',      
      link : 'www.javeriana.edu.co'
    };
    this.servicios.push(data);    
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
    window.open('http://'+row.link,'_blank'); 
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


}
