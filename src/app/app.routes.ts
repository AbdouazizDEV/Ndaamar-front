import { Routes } from '@angular/router';
import { HomeComponent } from './client/pages/home/home.component';
import { LoginComponent } from './client/components/auth/login/login.component';
import { RegisterComponent } from './client/components/auth/register/register.component';
import { ForgotPasswordComponent } from './client/components/auth/forgot-password/forgot-password.component';
import { CarsComponent } from './client/pages/cars/cars.component';
import { AboutComponent } from './client/pages/about/about.component';
import { ContactComponent } from './client/pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
