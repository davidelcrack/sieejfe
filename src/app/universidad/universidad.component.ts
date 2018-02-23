import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DirectorioService } from '../servicios/directorio/directorio.service';

@Component({
  selector: 'app-universidad',
  templateUrl: './universidad.component.html',
  styleUrls: ['./universidad.component.css']
})
export class UniversidadComponent implements OnInit {

  constructor(
    private directorioService : DirectorioService
  ) {
    this.dataSource = new MatTableDataSource(this.universidades);
   }

  ngOnInit(
  ) {

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

      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );  
    
  }
  
  displayedColumns = ['id', 'url', 'activo', 'nombreUniversidad' , 'editaUniversidad'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  universidades = new Array();
  universidadEditada : any;

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

  abrirEditarU(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    this.universidadEditada=row;
    console.log(row)
  }

}
