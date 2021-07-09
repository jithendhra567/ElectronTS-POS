import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierComponent } from './cashier.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    CashierComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    MaterialModule
  ]
})
export class CashierModule { }
