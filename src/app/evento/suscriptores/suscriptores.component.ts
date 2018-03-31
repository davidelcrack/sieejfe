import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  constructor() {
    this.dataSource = new MatTableDataSource(this.suscriptores);
   }

  ngOnInit(
  ) {}

  idUsuario:any;
  idEvento: any;
  cargarDetalles(idUsuario , idEvento){
    this.idUsuario=idUsuario;
    this.idEvento=idEvento;
    let data : any;
    console.log(idUsuario,idEvento);

    if(idUsuario==90){
    
      data ={
        id : 1,
        nombre : 'David',
        estado : 'Aprobado'
      };
      this.suscriptores.push(data);

    }else{
      data ={
        id : 2,
        nombre : 'Brayan',
        estado : 'En espera por seguridad'
      };
      this.suscriptores.push(data);
      data ={
        id : 3,
        nombre : 'Daniel',
        estado : 'Aprobado'
      }
      this.suscriptores.push(data);
    }

    this.dataSource._updateChangeSubscription();

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
    let data : any;
    data ={
      id : 4,
      nombre : 'Efrain',
      estado : 'El sensei'
    };
    this.suscriptores.push(data);
    this.dataSource._updateChangeSubscription();
  }

}
