import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierComponent } from './cashier.component';


@NgModule({
  declarations: [
    CashierComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule
  ]
})
export class CashierModule { }
