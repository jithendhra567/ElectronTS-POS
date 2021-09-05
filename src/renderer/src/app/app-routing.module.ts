import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { CashierComponent } from "./cashier/cashier.component";
import { InstantBillComponent } from "./cashier/instant-bill/instant-bill.component";
import { RegularBillComponent } from "./cashier/regular-bill/regular-bill.component";
import { TableDetailsComponent } from "./cashier/table-details/table-details.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    component: AdminPanelComponent
    //loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'cashier',
    //loadChildren: () => import('./cashier/cashier.module').then(m => m.CashierModule)
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
  {
    path: "**",
    redirectTo: "/",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
