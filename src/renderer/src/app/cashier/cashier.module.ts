import { NavlistComponent } from './navlist/navlist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierComponent } from './cashier.component';
import { MaterialModule } from '../material.module';
import { InstantBillComponent } from './instant-bill/instant-bill.component';
import { RegularBillComponent } from './regular-bill/regular-bill.component';
import { TableComponent } from './table/table.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ChairComponent } from './chair/chair.component';

@NgModule({
  declarations: [
    CashierComponent,
    NavlistComponent,
    InstantBillComponent,
    RegularBillComponent,
    TableComponent,
    TableDetailsComponent,
    AddItemComponent,
    ChairComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    MaterialModule
  ]
})
export class CashierModule { }
