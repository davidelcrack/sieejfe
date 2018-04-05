import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EventosService } from '../../servicios/eventos/eventos.service';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  constructor(
    private eventosService : EventosService
  ) {
    this.dataSource = new MatTableDataSource(this.suscriptores);
   }

  ngOnInit(
  ) {
  }

  idUsuario:any;
  idEvento: any;
  suscrito: boolean;

  cargarDetalles(idUsuario , idEvento , suscrito){
    this.suscrito=suscrito;
    this.idUsuario=idUsuario;
    this.idEvento=idEvento;
    let data : any;
    console.log(idUsuario,idEvento);
    this.suscriptores=[];
    this.dataSource = new MatTableDataSource(this.suscriptores);
   
    this.eventosService.obtenerSuscritos(idEvento).subscribe(
      response => {         
        console.log(response);        
        response.forEach(element => {          
          data ={
            id : element.apellidos,
            nombre : element.nombre,
            estado : element.username
          };
          this.suscriptores.push(data);          
        });
        console.log(this.suscriptores);
        this.dataSource._updateChangeSubscription();
        this.paginator._changePageSize(1);
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    ); 

    // if(idUsuario==90){
    
    //   data ={
    //     id : 1,
    //     nombre : 'David',
    //     estado : 'Aprobado'
    //   };
    //   this.suscriptores.push(data);

    // }else{
    //   data ={
    //     id : 2,
    //     nombre : 'Brayan',
    //     estado : 'En espera por seguridad'
    //   };
    //   this.suscriptores.push(data);
    //   data ={
    //     id : 3,
    //     nombre : 'Daniel',
    //     estado : 'Aprobado'
    //   }
    //   this.suscriptores.push(data);
    // }

    // this.dataSource._updateChangeSubscription();

  }
  
  displayedColumns = ['id', 'Nombre', 'Estado'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  suscriptores = new Array();

  cerrarPopUp(){
	  console.log('cerrarPopUp : entro a cerrarPopUp');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  prueba(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    console.log(row)
  }

  suscribirse(){
    console.log('suscribirse : entro a suscribirse');
   this.suscrito=true;
  }

  desuscribirse(){
    console.log('desuscribirse : entro a desuscribirse');
   this.suscrito=false;
  }

}
