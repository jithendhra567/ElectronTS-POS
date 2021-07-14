import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('./cashier/cashier.module').then(m=>m.CashierModule)
  },
  {path: '**', redirectTo: '/'},
  {
    path: 'admin',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
