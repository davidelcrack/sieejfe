import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { EventosService } from '../../servicios/eventos/eventos.service';
import { FormularioPersonalizadoComponent } from '../formulario-personalizado/formulario-personalizado.component';
import { PopupAvisoComponent } from '../../popup-aviso/popup-aviso.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-detalles-evento',
  templateUrl: './detalles-evento.component.html',
  styleUrls: ['./detalles-evento.component.css']
})
export class DetallesEventoComponent implements OnInit {

  constructor(
    private eventosService : EventosService,
    private appComponent: AppComponent 
  ) { }

  @Input('idAbrir') idAbrir;

  @ViewChild(FormularioPersonalizadoComponent) formularioPersonalizadoComponent : FormularioPersonalizadoComponent 

  ngOnChanges(changes: SimpleChanges) {
    
    if(changes.idAbrir){
      this.abrirDetalleEventos();
    }
  }

  ngOnInit() {
  }

  eventosTodos = new Array();
  detalleEvento : any;
  requisitosEvento : any;  
  descripcionEvento : any;
  capacidadMaxima : any;
  atributosPersonalizados = new Array();
  evento : any;
  suscrito: any;
  abrirDetalleEventos(){    
    console.log('abrirDetalleEventos : entro a abrirDetalleEventos');
    
    let idEvento=this.idAbrir;

    this.eventosService.obtenerEventos().subscribe(
      response => {         
        
        console.log(response);            
        this.eventosTodos=response;


        let detallado = this.eventosTodos.indexOf(this.eventosTodos.find(function(element) {
          return element.id == idEvento;
        }));
        this.detalleEvento=this.eventosTodos[detallado].titulo;
     
        
        this.descripcionEvento=this.eventosTodos[detallado].descripcion;
        this.requisitosEvento=this.eventosTodos[detallado].requisitos;
        if(this.eventosTodos[detallado].capacidad_maxima == -1){
          this.capacidadMaxima='No se tiene un límite de capacidad';
        }else{
          this.capacidadMaxima=this.eventosTodos[detallado].capacidad_maxima;
        }
    
        this.atributosPersonalizados=this.eventosTodos[detallado].atrPersonalizados;
        
    
        this.evento=this.eventosTodos[detallado].id;    
    
        this.eventosService.estaInscrito(this.evento).subscribe(
          response => {         
            console.log(response);   
            this.suscrito=response;         
            if(this.suscrito){
              (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-check';   
              (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscrito';   
            }else{
              (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-bell';   
              (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscribir';   
            }
            
          }, error => {
            console.log("**Esta suscrito***"+error);
          }      
        );  

      });

     
    
     }

     mensajeMostrar : any;
     suscribirse(){
      console.log('suscribirse : entro a suscribirse');
      let idEvento=this.idAbrir;
      this.mensajeMostrar='El evento ya ha alcanzado su capacidad máxima';
      let pasa = false;
      if(!this.suscrito){
        pasa = this.llenarFormulario();
      }else{
        pasa = true;
      }
  
      if(pasa){
        this.eventosService.suscribirse(idEvento).subscribe(
          response => {         
            console.log(response);
            this.suscrito=response;
            if(response){
              (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-check';   
              (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscrito';   
            }else{
              (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-bell';   
              (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscribir';   
            }
          }, error => {
            this.mensajeMostrar='Ha ocurrido un error inscribiendose';
            this.avisar();
            console.log("**suscribirse***"+error);
          }      
        );
      }
  
    }
  
    llenarFormulario(){
      if(this.atributosPersonalizados.length>0){
        this.formularioPersonalizadoComponent.abrir(this.atributosPersonalizados);
        return false;      
      }else{
        return true;
      }
    }

  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;
  avisar(){
    this.avisoPopUp.mostrarPop();
  }

  onNotifyInscribirse(e){
    let idEvento=this.idAbrir;
    this.eventosService.suscribirse(idEvento).subscribe(
      response => {         
        console.log(response);
        this.suscrito=response;
        if(response){
          (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-check';   
          (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscrito';   
        }else{
          (<HTMLInputElement>document.getElementById('inscripcionFa')).className='fa fa-bell';   
          (<HTMLInputElement>document.getElementById('labelInscripcionFa')).className='custom-inscribir';   
        }
      }, error => {
        this.mensajeMostrar='El evento ya ha alcanzado su capacidad máxima';
        this.avisar();
        console.log("**suscribirse***"+error);
      }      
    );
  }

  abrirEventos(){
    this.appComponent.cerrarTab('detalleEvento');
    this.appComponent.openTabs('evento', null)
  }
  




}
