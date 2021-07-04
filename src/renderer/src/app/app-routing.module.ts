import { CashierComponent } from './cashier/cashier.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';

const routes: Routes = [
  { path:  '', component:  Component2Component },
  {
    path: 'cashier',
    loadChildren: ()=>import('./cashier/cashier.module').then(m=>m.CashierModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
