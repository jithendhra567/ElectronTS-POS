import { TableDetailsComponent } from './table-details/table-details.component';
import { InstantBillComponent } from './instant-bill/instant-bill.component';
import { CashierComponent } from './cashier.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegularBillComponent } from './regular-bill/regular-bill.component';

const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    children: [
      {
        path: 'instant',
        component: InstantBillComponent
      },
      {
        path: 'regular',
        component: RegularBillComponent
      },
      {
        path: 'table-details/:tableId',
        component: TableDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule { }
