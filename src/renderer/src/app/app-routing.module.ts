import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'cashier',
    loadChildren: () => import('./cashier/cashier.module').then(m => m.CashierModule)
    // component: CashierComponent,
    // children: [
    //   {
    //     path: 'instant',
    //     component: InstantBillComponent
    //   },
    //   {
    //     path: 'regular',
    //     component: RegularBillComponent
    //   },
    //   {
    //     path: 'table-details',
    //     component: TableDetailsComponent
    //   }
    // ]
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
