import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {authGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Policy - Login' },
  { path: 'home', component: HomeComponent, title: 'Policy - Home', canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, title: 'Policy - Register' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
