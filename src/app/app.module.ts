import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WebSocketService } from 'angular2-websocket-service';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { RequestComponent } from './Request/Request.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,

    RequestComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService,
		WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
