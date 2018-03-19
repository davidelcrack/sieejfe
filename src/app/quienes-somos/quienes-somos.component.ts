import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  constructor() {
    this.dataSource = new MatTableDataSource(this.enlaces);
   }

  ngOnInit(
  ) {
    let data : any;
    data ={
      id : 1,
      name : 'Principal',
      link : 'http://www.javeriana.edu.co'
    };
    this.enlaces.push(data);
    data ={
      id : 2,
      name : 'Telefono',
      link : 'http://www.javeriana.edu.co'
    };
    this.enlaces.push(data);
    data ={
      id : 3,
      name : 'Direccion',
      link : 'http://www.javeriana.edu.co'
    }
    this.enlaces.push(data);
  }
  
  displayedColumns = ['Nombre'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  enlaces = new Array();

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
    console.log(row);
    window.open(row.link,'_blank'); 
  }

}
