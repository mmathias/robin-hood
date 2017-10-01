import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { RequestComponent } from './Request.component';
import {RequestService} from './Request.service';

// const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
//
// this.bizNetworkConnection = new BusinessNetworkConnection();
// this.CONNECTION_PROFILE_NAME = 'connectionProfile';
// this.businessNetworkIdentifier = 'businessNetworkIdentifier';
//
// this.bizNetworkConnection.connect(this.CONNECTION_PROFILE_NAME, this.businessNetworkIdentifier, 'admin', 'adminpw')
// 	.then((result) => {
// 		this.businessNetworkDefinition = result;
// 	});


describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [RequestService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
