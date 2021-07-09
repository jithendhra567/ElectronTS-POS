import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemComponent } from "./components/items/item.component";
import { BillComponent } from "./components/bills/bill.component";
import { TableComponent } from "./components/tables/table.component";

const routes: Routes = [
  { path: "tables", component: TableComponent },
  { path: "items", component: ItemComponent },
  { path: "bills", component: BillComponent },
  //  { path: '404', component: NotfoundComponent },
  //  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
