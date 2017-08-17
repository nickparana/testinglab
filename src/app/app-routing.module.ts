import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioNuevoComponent } from './components/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { UsuarioDetailComponent } from './components/usuario-detail/usuario-detail.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AlumnoNuevoComponent } from './components/alumno-nuevo/alumno-nuevo.component';
import { AlumnoEditComponent } from './components/alumno-edit/alumno-edit.component';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoNuevoComponent } from './components/curso-nuevo/curso-nuevo.component';
import { CursoEditComponent } from './components/curso-edit/curso-edit.component';
import { CursoDetailComponent } from './components/curso-detail/curso-detail.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'usuario-detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard] },
  { path: 'usuario-nuevo', component: UsuarioNuevoComponent },
  { path: 'usuario-edit/:id', component: UsuarioEditComponent, canActivate: [AuthGuard] },
  { path: 'alumnos', component: AlumnosComponent, canActivate: [AuthGuard] },
  { path: 'alumno-detail/:id', component: AlumnoDetailComponent, canActivate: [AuthGuard] },
  { path: 'alumno-nuevo', component: AlumnoNuevoComponent, canActivate: [AuthGuard] },
  { path: 'alumno-edit/:id', component: AlumnoEditComponent, canActivate: [AuthGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'curso-nuevo', component: CursoNuevoComponent, canActivate: [AuthGuard] },
  { path: 'curso-edit/:id', component: CursoEditComponent, canActivate: [AuthGuard] },
  { path: 'curso-detail/:id', component: CursoDetailComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
