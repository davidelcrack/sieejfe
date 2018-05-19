import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-mis-ideas',
  templateUrl: './mis-ideas.component.html',
  styleUrls: ['./mis-ideas.component.css']
})
export class MisIdeasComponent implements OnInit {

  constructor(
    private usuarioService : UsuarioService,
  ) {
    this.dataSource = new MatTableDataSource(this.misIdeasLista);
   }

  misIdeasLista = new Array();
  displayedColumns = ['id', 'Titulo', 'Etapa'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  cargarLista(){    
    let data : any;    
    this.misIdeasLista=[];
    this.dataSource = new MatTableDataSource(this.misIdeasLista);    
    debugger
    this.usuarioService.listarMisIdeas().subscribe(
      response => {

        debugger
        
        response.forEach(element => {
          let fechaInicio = new Date(element.inicio);
          let fechaFin = new Date(element.fin);
          data = {
            id: element.id,
            titulo: element.titulo,
            etapa: element.etapa
          };
          this.misIdeasLista.push(data);
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
