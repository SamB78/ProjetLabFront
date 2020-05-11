import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { SinglePersonnelComponent } from './personnel/single-personnel/single-personnel.component';
import { PersonnelFormComponent } from './personnel/personnel-form/personnel-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { PersonnelService } from './services/personnel.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth-interceptor';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'personnel', canActivate: [AuthGuardService], component: PersonnelComponent},
  { path: 'personnel/new', canActivate: [AuthGuardService], component: PersonnelFormComponent},
  { path: 'personnel/view', canActivate: [AuthGuardService], component: SinglePersonnelComponent},
  { path: '', redirectTo: 'books', pathMatch: 'full'},
  { path: '**', redirectTo: 'books'}



]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PersonnelComponent,
    SinglePersonnelComponent,
    PersonnelFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    PersonnelService,
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
