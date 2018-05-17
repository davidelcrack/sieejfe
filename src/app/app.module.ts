import { LogoutService } from './servicios/logout.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginService } from './servicios/autenticacion/login.service';
import { BoardComponent } from './board/board.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { EmbedVideo } from 'ngx-embed-video';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { AuthenticationGuard } from './authentication.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { EtiquetasInicioComponent } from './etiquetas-inicio/etiquetas-inicio.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';
import { EmpresaComponent } from './empresa/empresa.component';
import { ColaService } from './servicios/cola/cola.service';
import { ColaRestService } from './servicios/cola/cola-rest.service';
import {CdkTableModule} from '@angular/cdk/table';
import { CalendarModule } from 'angular-calendar';
import {NgbModule, NgbModalModule,NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { EventoComponent } from './evento/evento.component';
import { UsuarioService } from './servicios/usuario.service';
import { DirectorioComponent } from './directorio/directorio.component';
import { UniversidadComponent } from './universidad/universidad.component';
import { DirectorioService } from './servicios/directorio/directorio.service';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';
import { RelacionamientoExternoComponent } from './directorio/relacionamiento-externo/relacionamiento-externo.component';
import { RelacionamientoInternoComponent } from './directorio/relacionamiento-interno/relacionamiento-interno.component';
import { DominioPopUpComponent } from './directorio/dominio-pop-up/dominio-pop-up.component';
import { AdicionarDominioPopUpComponent } from './directorio/adicionar-dominio-pop-up/adicionar-dominio-pop-up.component';
import { ImagenPopUpComponent } from './directorio/imagen-pop-up/imagen-pop-up.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DateTimePickerComponent } from './pickers/date-time-picker.component';
import localeEsCo from '@angular/common/locales/es-CO';
import { ServiciosEmprendimientoComponent } from './servicios-emprendimiento/servicios-emprendimiento.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { SuscriptoresComponent } from './evento/suscriptores/suscriptores.component';
import { PymesComponent } from './empresa/pymes/pymes.component';
import { EventosService } from './servicios/eventos/eventos.service';
import { SolicitarServicioComponent } from './servicios-emprendimiento/solicitar-servicio/solicitar-servicio.component';
import { PopupAvisoComponent } from './popup-aviso/popup-aviso.component';
import { EmprendimientoServicesService } from './servicios/serviciosDeEmprendimiento/emprendimiento-services.service';
import { VerSolicitudesSeviciosComponent } from './servicios-emprendimiento/ver-solicitudes-sevicios/ver-solicitudes-sevicios.component';
import { FormularioPersonalizadoComponent } from './evento/formulario-personalizado/formulario-personalizado.component';
import { ListadoEventosComponent } from './evento/listado-eventos/listado-eventos.component';
import { DetallesCorreoComponent } from './evento/suscriptores/detalles-correo/detalles-correo.component';
import { DetallesEventoComponent } from './evento/detalles-evento/detalles-evento.component';
import { ApoyoDeIdeasComponent } from './apoyo-de-ideas/apoyo-de-ideas.component';
import { ApoyoIdeasService } from './servicios/apoyoIdeas/apoyo-ideas.service';
import { AdministracionCorreosComponent } from './administracion-correos/administracion-correos.component';
import { CorreosService } from './servicios/correos/correos.service';
import { ConfiguracionGeneralComponent } from './configuracion-general/configuracion-general.component';
import { ConfiguracionService } from './servicios/confGeneral/configuracion.service';
import { SeguimientoIdeasComponent } from './apoyo-de-ideas/seguimiento-ideas/seguimiento-ideas.component';
import { InvitadoCrearComponent } from './invitado-crear/invitado-crear.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { MisIdeasComponent } from './perfil-usuario/mis-ideas/mis-ideas.component';
import { MisEventosComponent } from './perfil-usuario/mis-eventos/mis-eventos.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

registerLocaleData(localeEsCo);

@NgModule({
  declarations: [
    AppComponent,
    DateTimePickerComponent,
    LoginComponent,
    BoardComponent,
    UsuarioComponent,
    MenuComponent,
    EtiquetasInicioComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    EmpresaComponent,
    EventoComponent,
    DirectorioComponent,
    UniversidadComponent,
    RelacionamientoExternoComponent,
    RelacionamientoInternoComponent,
    DominioPopUpComponent,
    AdicionarDominioPopUpComponent,
    ImagenPopUpComponent,
    ServiciosEmprendimientoComponent,
    QuienesSomosComponent,
    ContextMenuComponent,
    SuscriptoresComponent,
    PymesComponent,
    SolicitarServicioComponent,
    PopupAvisoComponent,
    VerSolicitudesSeviciosComponent,
    FormularioPersonalizadoComponent,
    ListadoEventosComponent,
    DetallesCorreoComponent,
    DetallesEventoComponent,
    ApoyoDeIdeasComponent,
    AdministracionCorreosComponent,
    ConfiguracionGeneralComponent,
    SeguimientoIdeasComponent,
    InvitadoCrearComponent,
    PerfilUsuarioComponent,
    MisIdeasComponent,
    MisEventosComponent
  ],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
      }),
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    //EmbedVideo.forRoot(),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    CdkTableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    AuthenticationGuard,
    LogoutService,
    ColaService,
    ColaRestService,
    UsuarioService,
    DirectorioService,
    EventosService,
    EmprendimientoServicesService,
    ApoyoIdeasService,
    CorreosService,
    ConfiguracionService
    //AppComponent
  ],
  bootstrap: [AppComponent],
  exports : [DateTimePickerComponent],
  entryComponents: [ TabComponent ]
})
export class AppModule { }
