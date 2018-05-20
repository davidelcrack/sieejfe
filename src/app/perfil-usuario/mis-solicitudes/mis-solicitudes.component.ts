import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  constructor(
    private usuarioService : UsuarioService,
  ) {
    this.dataSource = new MatTableDataSource(this.misSolicitudesPerfil);
   }

  misSolicitudesPerfil = new Array();
  displayedColumns = ['id', 'Nombre', 'Fecha', 'Activa'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  cargarLista(){    
    let data : any;    
    this.misSolicitudesPerfil=[];
    this.dataSource = new MatTableDataSource(this.misSolicitudesPerfil);    
    debugger
    this.usuarioService.listarMisSolicitudes().subscribe(
      response => {

        debugger
        
        
        response.forEach(element => {
          let fechaMostrar= new Date(element.fecha);
          
          data = {
            id: element.id,
            nombre: element.nombre,
            fecha: fechaMostrar.getDate()+'/'+(fechaMostrar.getMonth()+1)+'/'+ fechaMostrar.getFullYear(),
            activa : element.activa
          };
          this.misSolicitudesPerfil.push(data);
        });

        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

    });   
    
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


}
