import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
//import { EmbedVideoService } from 'ngx-embed-video';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoutService } from './servicios/logout.service';
import { TabsComponent } from './tabs/tabs.component';
import { TranslateService } from 'ng2-translate';

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
    this.estado=JSON.parse(localStorage.getItem('LOGGEADO')).estadoEnum; //no local
    //this.estado='NUEVO'; // sí local
    console.log(this.estado);
    console.log(this.currentUser);
    if (this.currentUser != null) {
      this.esUser = true;
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
    //this.estado=JSON.parse(localStorage.getItem('LOGGEADO')).estadoEnum; //no local
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

  openTabs(nombre : any){
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
  
}
