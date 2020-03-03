import { NgModule } from '@angular/core';
import {HttpClientModule , HTTP_INTERCEPTORS, HttpClientJsonpModule} from '@angular/common/http'
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './helper/token.interceptor'
import { MainComponent } from './components/main/main.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './components/main/list/list.component';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  declarations: [
    WelcomeComponent,
    LoginComponent,
    MainComponent,
    ListComponent
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [ WelcomeComponent ]
})
export class AppModule { }
