import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BillRoutingModule } from "./bill-routing.module";
import { BillComponent } from "./bill.component";
import { ViewBillComponent } from "./view-bill/view-bill.component";

@NgModule({
  imports: [CommonModule, BillRoutingModule],
  declarations: [BillComponent, ViewBillComponent]
})

export class BillModule {}
