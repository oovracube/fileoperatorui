import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ItemListComponent } from './item-list/item-list.component';
import { AdditemComponent } from './add-item/add-item.component';
import { TypeListComponent } from './type-list/type-list.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { MapitemComponent } from './map-item/map-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    AdditemComponent,
    MapitemComponent,
    TypeListComponent,
    AddTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
