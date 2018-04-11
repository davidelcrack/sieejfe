import { Component, OnInit ,ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';

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
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { EventosService } from '../servicios/eventos/eventos.service';
import { concat } from 'rxjs/operator/concat';
import { ColaService } from '../servicios/cola/cola.service';


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
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class EventoComponent implements OnInit {

  esAdmin : boolean = false;
  ngOnInit() {

    let data: CalendarEvent;

    this.eventosService.obtenerEventos().subscribe(
      response => {         
        console.log(response);        
        this.eventosTodos=response;
        response.forEach(element => {          
          console.log('comienza : '+new Date(element.inicio))
          console.log('termina : '+new Date(element.fin))
          data = {
            id: element.id,
            start: new Date(element.inicio),
            end: new Date(element.fin),
            title: element.titulo,
            color: colors.blueJaverina,
            actions: this.actions
          };  
          this.events.push(data);
        });
        this.refresh.next();
      }, error => {
        console.log("**obtenerEventos***"+error);
      }      
    ); 

    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));

    if(!this.esAdmin){
      this.actions=[];
    }   
    
    // data = {
    //   id: 1,
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'Evento crack de 3 días',
    //   color: colors.blueJaverina,
    //   actions: this.actions
    // };
    // this.events.push(data);

    // data={
    //   id: 2,
    //   start: startOfDay(new Date()),
    //   title: 'Evento sin fecha de finalización',
    //   color: colors.yellowJaveriana,
    //   actions: this.actions
    // };
    // this.events.push(data);
    
    // data={
    //   id: 3,
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'Evento que dura 2 meses',
    //   color: colors.blue,
    //   actions: this.actions
    // };
    // this.events.push(data);

    // data={
    //   id: 4,
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'Evento de los cracks',
    //   color: colors.yellowJaveriana,
    //   actions: this.actions      
    // };
    // this.events.push(data);

  }

  constructor(
    private modal: NgbModal,
    private eventosService : EventosService,
    private colaService : ColaService
  ) {}

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  locale: string = 'es-CO';

  eventosTodos = new Array();
  requisitosEvento : any;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        //this.handleEvent('Edited', event);
        this.abrirEdicionEvento(event.id);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        /*this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);*/
        this.eliminar(event.id);
      }
    },
    {
      label: '<i class="fa fa-plus-square"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        //this.handleEvent('Edited', event);
        this.abrirDetalleEventos(event.id);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('dayClicked : entro a dayClicked')

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handleEvent : entro a handleEvent', action , event);
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    this.abrirDetalleEventos(event.id);
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.blueJaverina,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  mostrarEventos=false;

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    this.mostrarEventos=false;
    
    let el : any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  
  eventsEditar: CalendarEvent[];
  accion=undefined;
  idEditado=-1;

  abrirEdicionEvento(id : any){
    this.accion=1;
    console.log('abrirEdicionEvento : entro a abrirEdicionEvento');
    console.log(this.events);
    let escogido = this.events.indexOf(this.events.find(function(element) {
      return element.id == id;
    }));
    this.idActual=this.events[escogido].id;
    this.eventsEditar=[];
    this.eventsEditar.push(this.events[escogido]);
    this.idEditado=escogido;

    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  cont=100;   
  idActual:any=-1;
  abrirAdicionEvento(){
    console.log('abrirAdicionEvento : entro a abrirAdicionEvento');
    this.accion=2;
    this.eventsEditar=[];

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

  abrirTodosEventos(){
    console.log('abrirAdicionEvento : entro a abrirAdicionEvento');
    this.accion=3;
    this.eventsEditar=[];

    this.eventsEditar=this.events;
    
    //this.refresh.next();
    
    let el: any;
    el = document.getElementById("overlayEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  guardarCambios(){
    console.log('guardarCambios : entro a guardarCambios')

    this.cerrarPopUp();

    if(this.accion==2){
      console.log('Adición : cerro Adición')
      this.agregarEvento();
    }
    if(this.accion==1){
      console.log('Edición : cerro Edición')
      this.events[this.idEditado]=this.eventsEditar[0];
    }
    if(this.accion==3){
      console.log('Listar : cerro Listar')
      this.events=this.eventsEditar;
    }
    
    console.log(this.events);

  }

  agregarEvento(){
    console.log('agregarEvento : entro a agregarEvento');
    let evento=this.eventsEditar[0];
    console.log(evento);

    let data;
    let eventoEnviar = new Array();
    data = {
      id:0,
      inicio: evento.start,
      fin: evento.end,
      titulo: evento.title,
      requisitos: null,
      descripcion: null,
    };

    eventoEnviar.push(data);
    this.eventosService.crearEvento(data).subscribe(
      response => {         
        console.log(response); 
        this.eventsEditar[0].id=response.id;
        this.events.push(this.eventsEditar[0]);
        this.refresh.next();
      }, error => {
        console.log("**obtenerEventos***"+error);
      }      
    ); 
  }
  
  eliminar(id : any){

    let eliminado = this.events.indexOf(this.events.find(function(element) {
      return element.id == id;
    }));

    this.events.splice(eliminado, 1); 
    this.refresh.next()
  }

  detalleEvento : any;
  descripcionEvento : any;
  evento : any;
  usuario : any;
  suscrito : boolean =false;

  @ViewChild(SuscriptoresComponent) inscripciones: SuscriptoresComponent;

  abrirDetalleEventos(idEvento: any){
    console.log('abrirDetalleEventos : entro a abrirDetalleEventos',idEvento);
    this.idActual=idEvento;  
    let detallado = this.events.indexOf(this.events.find(function(element) {
      return element.id == idEvento;
    }));
    this.detalleEvento=this.events[detallado].title;
    
    let indice = this.eventosTodos.indexOf( this.eventosTodos.find(function(element) {
      return element.id == idEvento;
    }));
    console.log(this.eventosTodos);
    this.descripcionEvento=this.eventosTodos[indice].descripcion;
    this.requisitosEvento=this.eventosTodos[indice].requisitos;

    this.evento=this.events[detallado].id;
    this.usuario=90;

    if(this.esAdmin){
      this.inscripciones.cargarDetalles(this.usuario, this.evento);
    }

    let el: any;
    el = document.getElementById("overlayInformacionEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

  }

  cerrarPopUpDetalle(){
    console.log('cerrarPopUpDetalle : entro a cerrarPopUpDetalle');    
    let el : any;
    el = document.getElementById("overlayInformacionEvento");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }


  suscribirse(){
    console.log('suscribirse : entro a suscribirse');
    this.suscrito=true;
    this.eventosService.suscribirse(this.idActual).subscribe(
      response => {         
        console.log(response); 
      }, error => {
        console.log("**suscribirse***"+error);
        this.desuscribirse();
      }      
    );

  }
 
  desuscribirse(){
    console.log('desuscribirse : entro a desuscribirse');
   this.suscrito=false;
  }

  cambio(atributo : any , valor : any , tipo : any){
    console.log('cambio : entro a cambio');
    console.log(atributo, valor);

    if(this.accion==1){
      let mensaje = { id: this.idActual  , accion: 'editarEvento' , atributo: atributo , valor: valor , prioridad: true, tipoDato: tipo }
      
      console.log(mensaje);

      let observable = this.colaService.agregarACola(mensaje);

      if (observable) {
        observable.subscribe(response => {
          console.log(response)            

        },
          error => {
            console.log("Error al editar descripcion imagen");
          });
      } 
    }

  }



  
}
