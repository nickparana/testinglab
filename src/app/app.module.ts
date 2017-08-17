import { NgModule } from '@angular/core';
import './rxjs-extensions';
//Imports
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { Ng2TableModule } from 'ng2-table/components/ng-table-module';
import { ChartsModule } from 'ng2-charts';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Declarations
import { AppComponent } from './app.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioNuevoComponent } from './components/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { UsuarioDetailComponent } from './components/usuario-detail/usuario-detail.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';
import { AlumnoNuevoComponent } from './components/alumno-nuevo/alumno-nuevo.component';
import { AlumnoEditComponent } from './components/alumno-edit/alumno-edit.component';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoFormComponent } from './components/curso-form/curso-form.component';
import { CursoNuevoComponent } from './components/curso-nuevo/curso-nuevo.component';
import { CursoEditComponent } from './components/curso-edit/curso-edit.component';
import { CursoDetailComponent } from './components/curso-detail/curso-detail.component';
//Providers
import { AuthGuard } from './guards/auth.guard';
import { UsuarioService } from './services/usuario.service';
import { AlumnoService } from './services/alumno.service';
import { CursoService } from './services/curso.service';
import { AuthService } from './services/auth.service';
import { SpinnerService } from './services/spinner.service';
import { FechaService } from './services/fecha.service';
import { ConfirmBoxService } from './services/confirm-box.service';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        PaginationModule.forRoot(),
        Ng2TableModule,
        ChartsModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        SearchFilterPipe,
        HomeComponent,
        LoginComponent,
        NavComponent,
        FooterComponent,
        SpinnerComponent,
        ConfirmBoxComponent,
        TablaComponent,
        PerfilComponent,
        UsuariosComponent,
        UsuarioFormComponent,
        UsuarioNuevoComponent,
        UsuarioEditComponent,
        UsuarioDetailComponent,
        AlumnosComponent,
        AlumnoFormComponent,
        AlumnoNuevoComponent,
        AlumnoEditComponent,
        AlumnoDetailComponent,
        CursosComponent,
        CursoFormComponent,
        CursoNuevoComponent,
        CursoEditComponent,
        CursoDetailComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthGuard,
        UsuarioService,
        AlumnoService,
        CursoService,
        AuthService,
        SpinnerService,
        FechaService,
        ConfirmBoxService,
    ]
})

export class AppModule { }

