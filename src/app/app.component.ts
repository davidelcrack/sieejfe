import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
//import { EmbedVideoService } from 'ngx-embed-video';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoutService } from './servicios/logout.service';
import { TabsComponent } from './tabs/tabs.component';
import { TranslateService } from 'ng2-translate';
//import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AppComponent {  

  langActual: any = 'es-co'//localStorage.getItem('TRADUJO');

  @ViewChild(TabsComponent) tabsComponent;

  @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler($event) {
      console.log(this.esUser);
      if(this.esUser){
        //this.servicioCola.enviar();
        $event.returnValue = "Are you sure?";     
        console.log('Está recargando ...');
      }

    }
  
  esUser = false;
  currentUser = null;
  estado : any;
  static mostrarEtiquetas = false;
  esAdmin=false;

  getStaticMostrarEtiquetas(){
    return AppComponent.mostrarEtiquetas;
  }

  aparecen = [
    {
      nombre:"idiomas",
      muestra:false,
      esMenu:false
    },
    {
      nombre:"info",
      muestra:false,
      esMenu:false
    },
    {
      nombre:"compras",
      muestra:false,
      esMenu:true
    }
  ]


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eref: ElementRef,
    private logoutService : LogoutService,
    private translate: TranslateService
    ) {
    translate.addLangs(["en", "es-co"]);
    translate.setDefaultLang('es-co');

    let browserLang = translate.getBrowserLang(); let idioma = localStorage.getItem('TRADUJO');
    translate.use(browserLang.match(/en|es-co/) ? browserLang : idioma);
    }

  ngOnInit() {
    console.log("ngOnInit: Entro a ngOnInit");
    //localStorage.setItem('USER', null);//this.currentUser = JSON.parse(localStorage.getItem('USER'))   
    this.currentUser = localStorage.getItem('USER');
    console.log(JSON.parse(localStorage.getItem('LOGGEADO')))  ;
    //this.estado=JSON.parse(localStorage.getItem('LOGGEADO')).estadoEnum; //no local
    //this.estado='NUEVO'; // sí local
    console.log(this.estado);
    console.log(this.currentUser);
    if (this.currentUser != null) {
      this.esUser = true;
    }

    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));
    console.log(this.esAdmin);

    if(this.esAdmin!=null){
      if(this.esAdmin){
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('menuSolicitarNormal')).hidden=true; 
          (<HTMLInputElement>document.getElementById('muniResponderAdmin')).hidden=false;   
          (<HTMLInputElement>document.getElementById('menuAdmonCorreos')).hidden=false;   
        });        
      }else{
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('menuSolicitarNormal')).hidden=false; 
          (<HTMLInputElement>document.getElementById('muniResponderAdmin')).hidden=true;
          (<HTMLInputElement>document.getElementById('menuAdmonCorreos')).hidden=true;   
        });                
      }
    }

  }

  onClick(event) {
    ///////console.log("onClick: Entro a onClick");
    if (!this.eref.nativeElement.contains(event.target))
      this.clickListener();
  }

  clickListener() {
    ///////console.log("clickListener: Entro a clickListener");    
    this.aparecen.forEach(element => {
      element.muestra = false;
    })
  }

  entornoClick() {
    ////////console.log("entornoClick: Entro a entornoClick");    
    console.log("entornoClick: Entro a entornoClick");

    this.aparecen.forEach(element => {
      if (element.esMenu === false) {
        element.muestra = false;
      }
    })
  }

  logout() {
    console.log("logout: Entro a logout");
    sessionStorage.clear();
    localStorage.removeItem('USER');
    localStorage.clear();
    this.currentUser = null;
    this.esUser=false;
    this.router.navigate(['login']);
    this.aparecen.forEach(element => {
      element.muestra=false;
    })
    this.logoutService.cerrarSesion().subscribe(
      response => {        
        console.log(response);       
      }, error => {
        //alert("Error en el servicio de Información General");
        console.log("**ERROR : Cerrar Sesion***"+error);
      }
    );
    //localStorage.setItem('mostrarMenu',"true");
      
  } 

  mostrarInformacionUsuario() {
    console.log("mostrarInformacionUsuario: Entro a mostrarInformacionUsuario");
    this.aparecen.forEach(element => {
      if (element.nombre === "info") {
        if (element.muestra) {
          element.muestra = false;
        }
        else {
          element.muestra = true;
        }
      } else {
        element.muestra = false;
      }
    })
  }

  comprobarEstado(){
    this.currentUser = localStorage.getItem('USER');
    this.estado=JSON.parse(localStorage.getItem('LOGGEADO')).estadoEnum; //no local
    if(this.estado==='NUEVO'){
      AppComponent.mostrarEtiquetas=true;
    }else{
      AppComponent.mostrarEtiquetas=false;
    }

    if (this.currentUser != null) {
      this.esUser = true;
    }

  }

  disabled(){
    return true;
  }

  @ViewChild('about') aboutTemplate;
  @ViewChild('usuarioTab') usuarioTemplate;
  @ViewChild('empresaTab') empresaTemplate;
  @ViewChild('eventoTab') eventoTemplate;
  @ViewChild('directorioTab') directorioTemplate;
  @ViewChild('universidadTab') universidadTemplate;
  @ViewChild('serviciosTab') serviciosTemplate;
  @ViewChild('aboutUsTab') aboutUsTemplate;
  @ViewChild('solicitarServicioTab') solicitarServicioTemplate;
  @ViewChild('solicitudesServicioTab') solicitudesServicioTemplate;
  @ViewChild('eventoAbrirTab') eventoAbrirTemplate;
  @ViewChild('detalleEventoTab') detalleEventoTemplate;
  @ViewChild('apoyoIdeasTab') apoyoIdeasTemplate;
  @ViewChild('admonCorreosTab') admonCorreosTemplate;
  @ViewChild('confGeneralTab') confGeneralTemplate;
  
  detalle : any;  
  openTabs(nombre : any , detalle : any){

    this.detalle=detalle;

    if(nombre=='about'){
      this.tabsComponent.openTab('Información',this.aboutTemplate,{},true);
    }
    if(nombre=='usuario'){
      this.tabsComponent.openTab('Usuarios',this.usuarioTemplate,{},true);
    }
    if(nombre=='empresa'){
      this.tabsComponent.openTab('Empresa',this.empresaTemplate,{},true);
    }
    if(nombre=='evento'){
      this.tabsComponent.openTab('Evento',this.eventoTemplate,{},true);
    }
    if(nombre=='directorio'){
      this.tabsComponent.openTab('Directorio',this.directorioTemplate,{},true);
    }
    if(nombre=='universidad'){
      this.tabsComponent.openTab('Universidad',this.universidadTemplate,{},true);
    }    
    if(nombre=='servicioEmprendimiento'){
      this.tabsComponent.openTab('Servicios',this.serviciosTemplate,{},true);
    }    
    if(nombre=='aboutus'){
      this.tabsComponent.openTab('aboutus',this.aboutUsTemplate,{},true);
    }    
    if(nombre=='solicitarServicio'){
      this.tabsComponent.openTab('solicitarServicio',this.solicitarServicioTemplate,{},true);
    } 
    if(nombre=='solicitudesServicio'){
      this.tabsComponent.openTab('solicitudesServicio',this.solicitudesServicioTemplate,{},true);
    } 
    if(nombre=='eventoEspecifico'){
      this.tabsComponent.openTab('Evento',this.eventoAbrirTemplate, detalle ,true);
    }
    if(nombre=='detalleEvento'){
      this.tabsComponent.openTab('detalleEvento',this.detalleEventoTemplate, detalle ,true);
    }    
    if(nombre=='apoyoIdeas'){
      this.tabsComponent.openTab('apoyoIdeas',this.apoyoIdeasTemplate, {} ,true);
    }    
    if(nombre=='admonCorreos'){
      this.tabsComponent.openTab('admonCorreos',this.admonCorreosTemplate, {} ,true);
    }  
    if(nombre=='confGeneral'){
      this.tabsComponent.openTab('confGeneral',this.confGeneralTemplate, {} ,true);
    }
    
  }

  cerrarTab(nombre : any){
    this.tabsComponent.cerrarTabDinamica(nombre)
  }

  irAHome(){
    this.tabsComponent.selectHome();
  }
  
  mostrarIdiomasUsuario() {
    console.log("mostrarIdiomasUsuario: Entro a mostrarIdiomasUsuario");
    this.aparecen.forEach(element => {
      if (element.nombre === "idiomas") {
        if (element.muestra) {
          element.muestra = false;
        }
        else {
          element.muestra = true;
        }
      } else {
        element.muestra = false;
      }
    })
  }

  // static mostrarLaNotificacion: boolean = false;
  // timer: any;
  // suscription: any;


  /*mostrarNotificacion() {
    console.log('mostrarNotificacion : entro a mostrarNotificacion')
    AppComponent.mostrarLaNotificacion = true;
    this.timer = Observable.timer(3000);
    this.suscription = this.timer.subscribe(t => {
      AppComponent.mostrarLaNotificacion = false;
      this.suscription.unsubscribe();
    });

  }

  get staticMostrarLaNotificacion() {
    return AppComponent.mostrarLaNotificacion;
  }*/
  
}
