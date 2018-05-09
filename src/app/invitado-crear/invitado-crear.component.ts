import { Component, OnInit ,ChangeDetectionStrategy, ViewChild, TemplateRef, Input, SimpleChanges} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from 'angular-calendar';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CustomDateFormatter } from '../pickers/custom-date-formatter.provider';
import { EventosService } from '../servicios/eventos/eventos.service';
import { concat } from 'rxjs/operator/concat';
import { ColaService } from '../servicios/cola/cola.service';
import { PopupAvisoComponent } from '../popup-aviso/popup-aviso.component';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { FormularioPersonalizadoComponent } from '../evento/formulario-personalizado/formulario-personalizado.component';
import { debounce } from 'rxjs/operators/debounce';
import { AppComponent } from '../app.component';


const colors: any = {
  blueJaverina: {
    primary: '#000066',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellowJaveriana: {
    primary: '#FFCC00',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-invitado-crear',
  templateUrl: './invitado-crear.component.html',
  styleUrls: ['./invitado-crear.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class InvitadoCrearComponent implements OnInit {

  constructor(
    private appComponent : AppComponent,
    private modal: NgbModal,
    private eventosService : EventosService,
    private colaService : ColaService
  ) {}

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  @ViewChild(FormularioPersonalizadoComponent) formularioPersonalizadoComponent : FormularioPersonalizadoComponent 

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        //this.handleEvent('Edited', event);
       // this.abrirEdicionEvento(event.id);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        /*this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);*/
        //this.eliminar(event.id);
      }
    },
    {
      label: '<i class="fa fa-plus-square"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        //this.handleEvent('Edited', event);
        //this.abrirDetalleEventos(event.id);
      }
    }
  ];

  accion=2;
  view: string = 'month';
  viewDate: Date = new Date();
  locale: string = 'es-CO';

  eventosTodos = new Array();
  detalleEvento : any;
  
  requisitosEvento : any;  
  descripcionEvento : any;
  capacidadMaxima : any;
  mostrarDetallesMas=false;
  mensajeTooTip="Filtrar por mis eventos";

  evento : any;
  usuario : any;
  suscrito : boolean =false;


  modalData: {
    action: string;
    event: CalendarEvent;
  };

  mostrarEventos=false;

  ngOnInit() {
  }

  

  eventsEditar: CalendarEvent[];
  cont=100;   
  idActual:any=-1;
  abrirAdicionEvento(){
    console.log('abrirAdicionEvento : entro a abrirAdicionEvento');    
    this.eventsEditar=[];
    this.descripcionEvento=null; this.requisitosEvento=null; this.capacidadMaxima=null;

    // let mensaje = { id: 0  , accion: 'crearEvento' , prioridad: true, valor: 'ok'}
    // console.log(mensaje);

    // let observable = this.colaService.agregarACola(mensaje);

    // if (observable) {
    //   observable.subscribe(response => {
    //     console.log(response)            
    //     this.idActual=response[0].id;
    //     console.log(this.idActual);
    //   },
    //     error => {
    //       console.log("Error al crear evento");
    //     });
    // } 

    this.eventsEditar.push({
      id: 0,
      start: new Date(),
      end: new Date(),
      title: '',
      color: colors.blueJaverina,
      actions: this.actions      
    });
    //this.refresh.next();
    
    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  logout(){
    this.appComponent.logout();
  }

  masDetallesClass= "custom-mostrar"
  mostrarDetallesEdicion(){
    if(this.mostrarDetallesMas){
      this.mostrarDetallesMas=false;  
      this.masDetallesClass="custom-mostrar"    
    }else{
      this.mostrarDetallesMas=true;
      this.masDetallesClass="custom-mostrado";
    }
  }

  atributosPersonalizados = new Array();

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.mostrarEventos=false;
    this.mostrarDetallesMas=false; this.masDetallesClass= "custom-mostrar";
    this.atributosPersonalizados=[];
    
    let el : any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  anadirAtributo(){

    let puedeAgregar=false;
    if(this.atributosPersonalizados.length>0){      
      let ultimo = this.atributosPersonalizados.length-1;

      if(this.atributosPersonalizados[ultimo].nombre != null){
        puedeAgregar=true;
      }
    }else{
      puedeAgregar=true;
    }

    if(puedeAgregar){

      
      let mensaje = { id: this.idActual  , accion: 'asociarAtrPersonalizadoEvento' , atributo: 'personalizado' , valor: 'ok' , prioridad: true, tipoDato: 'STRING' }
      
      console.log(mensaje);

      let data={
        id: null,
        nombre: null, 
        descripcion : null        
      }      
      this.atributosPersonalizados.push(data);

        let observable = this.colaService.agregarACola(mensaje);

        if (observable) {
          observable.subscribe(response => {

            console.log(response)       
            
            if(response[0].accion=='crear'){

              let id=response[0].valor.id;

              let index= this.atributosPersonalizados.indexOf(this.atributosPersonalizados.find(function (buscadoElement){
                return buscadoElement.id==-1;
              }))
              
              this.atributosPersonalizados[index].id=id;

              console.log(this.atributosPersonalizados);

              }

          },
            error => {
              console.log("Error al editar imagen");
            });
        }          
         
    }
  }

  cambioPersonalizado(atributo : any , valor : any , tipo : any, id: any){
    console.log('cambio : entro a cambio');
    console.log(this.atributosPersonalizados);
    console.log(atributo, valor, id);

    let mensaje = { id: id  , accion: 'editarAtrPersonalizado' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
    
    console.log(mensaje);

    let observable = this.colaService.agregarACola(mensaje);

    if (observable) {
      observable.subscribe(response => {
        console.log(response)            

      },
        error => {
          console.log("Error al editar imagen");
        });
    } 

  }

  cambio(atributo : any , valor : any , tipo : any){
    console.log('cambio : entro a cambio');
    console.log(atributo, valor);

    if(atributo=='capacidadMaxima'){
      console.log(valor);
      let numero = parseInt(valor,10);
      console.log(numero, this.idActual);
      valor=numero;
    }    

  }

  guardarCambios(){
    console.log('guardarCambios : entro a guardarCambios')    

    if(this.accion==2){
      console.log('Adición : cerro Adición')
      //let valido= this.comprobarLlenoTotal();
      let valido = true;
      if(valido){        
        this.agregarEvento();
      }
    }    

  }

  agregarEvento(){
    console.log('agregarEvento : entro a agregarEvento');
    debugger
    let evento=this.eventsEditar[0];
    console.log(evento, this.atributosPersonalizados);

    let data;
    let eventoEnviar = new Array();
    data = {
      id:0,
      inicio: evento.start,
      fin: evento.end,
      titulo: evento.title,
      requisitos: this.requisitosEvento,
      descripcion: this.descripcionEvento,
      capacidad_maxima: this.capacidadMaxima,
      atrPersonalizados : this.atributosPersonalizados
    };

    eventoEnviar.push(data);
    this.eventosService.crearEvento(data).subscribe(
      response => {         
        this.avisar();
      }, error => {
        console.log("**obtenerEventos***"+error);
      }      
    ); 
    this.cerrarPopUp();
  }

  mensajeMostrar : any = "Se ha creado el evento satisfactoriamente";
  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;
  avisar(){
    this.avisoPopUp.mostrarPopExito();
  }

  onCerrarNotify(e){
    console.log('onNotifyPopUp : entro a onNotifyPopUp',e);    
  }

}
