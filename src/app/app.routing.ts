import { UsuarioComponent } from './usuario/usuario.component';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './authentication.guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'board', component: BoardComponent, canActivate: [AuthenticationGuard] },
    { path: 'usuario', component: UsuarioComponent, canActivate: [AuthenticationGuard] },
    { path: '', redirectTo: '/board', pathMatch: 'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    bootstrap: [ AppComponent ] 
})
export class AppRoutingModule { }