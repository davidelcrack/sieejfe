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
import { ExternoComponent } from './externos/externo/externo.component';
import { UsuarioService } from './servicios/usuario.service';
import { DirectorioComponent } from './directorio/directorio.component';
import { UniversidadComponent } from './universidad/universidad.component';
import { DirectorioService } from './servicios/directorio/directorio.service';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
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
    ExternoComponent,
    DirectorioComponent,
    UniversidadComponent
  ],
  imports: [
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
    DirectorioService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ TabComponent ]
})
export class AppModule { }
