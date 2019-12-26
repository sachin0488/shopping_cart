import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductComponent } from './products/product.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from './model/model.service';
import { ModalComponent } from './model/model.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
