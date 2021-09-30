import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RegisterComponent } from './register/register.component';
// import { PartnerlistComponent } from './partnerlist/partnerlist.component';
import { ItemListComponent } from './item-list/item-list.component';
import { AdditemComponent } from './add-item/add-item.component';
import { TypeListComponent } from './type-list/type-list.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { MapitemComponent } from './map-item/map-item.component';


const routes: Routes = [
  { path: '', redirectTo: 'view-student', pathMatch: 'full' },
  { path: 'item-list', component: ItemListComponent },
  { path: 'add-item', component: AdditemComponent },
  { path: 'map-item', component: MapitemComponent },
  { path: 'type-list', component: TypeListComponent },
  { path: 'add-type', component: AddTypeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
