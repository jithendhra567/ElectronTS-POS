import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BillComponent } from "./bill.component";
import { ViewBillComponent } from "./view-bill/view-bill.component";

const routes: Routes = [
  {
    path: 'view-bill',
    component: ViewBillComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class BillRoutingModule {}
