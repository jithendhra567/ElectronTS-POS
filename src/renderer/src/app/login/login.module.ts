import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AdminPanelModule } from '../admin-panel/admin-panel.module';
import { CashierModule } from '../cashier/cashier.module';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    MaterialModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
