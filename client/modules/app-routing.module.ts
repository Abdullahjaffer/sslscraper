import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from '../modules/components/login/login.component'
import { MainComponent } from './components/main/main.component'
import { AuthGuard } from './helper/auth.guard'

const routes: Routes = [
  {
    path: 'login',component: LoginComponent
  },
  {
    path: '', component : MainComponent, canActivate: [AuthGuard]
  },
  { path: '**', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
