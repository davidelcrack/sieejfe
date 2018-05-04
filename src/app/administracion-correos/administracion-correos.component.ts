import { Component, OnInit, ViewChild } from '@angular/core';
import { ColaService } from '../servicios/cola/cola.service';
import { CorreosService } from '../servicios/correos/correos.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-administracion-correos',
  templateUrl: './administracion-correos.component.html',
  styleUrls: ['./administracion-correos.component.css']
})
export class AdministracionCorreosComponent implements OnInit {

  constructor(    
    private colaService : ColaService,
    private correosService : CorreosService
  ) {
    this.dataSource = new MatTableDataSource(this.correos);
   }

  ngOnInit(
  ) {
    this.correos=[];
    this.dataSource = new MatTableDataSource(this.correos);
    let data : any;
    // this.correosService.get().subscribe(
    //   response => {         
    //     console.log(response);        
    //     response.forEach(element => {          
    //       data ={
    //         id : element.id,
    //         nombre : element.nombre,
    //         correo : element.correo
    //       };
    //       this.correos.push(data);          
    //     });
    //     console.log(this.correos);
    //     this.dataSource._updateChangeSubscription();
    //     setTimeout(() => {
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort= this.sort;
    //     });
        
    //   }, error => {
    //     console.log("**obtenerSuscritos***"+error);
    //   }      
    // ); 
  }
  
  displayedColumns = ['id', 'nombre', 'correo' , 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  correos = new Array();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  correoActual : any;  
  editarCorreo(row : any){        
    // let el: any;
    // el = document.getElementById("overlayServiciosEmprendimiento");
    // el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    // let el : any;
    // el = document.getElementById("overlayServiciosEmprendimiento");
    // el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

}
