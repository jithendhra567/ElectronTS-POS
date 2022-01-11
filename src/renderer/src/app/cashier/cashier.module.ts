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
import { DiscountComponent } from './discount/discount.component';
import { FormsModule } from '@angular/forms';
import { FullDayBillComponent } from './full-day-bill/full-day-bill.component';

@NgModule({
  declarations: [
    CashierComponent,
    NavlistComponent,
    InstantBillComponent,
    RegularBillComponent,
    TableComponent,
    TableDetailsComponent,
    AddItemComponent,
    ChairComponent,
    DiscountComponent,
    FullDayBillComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CashierModule { }
