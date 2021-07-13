import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemComponent } from "./component/items/item.component";
import { TableComponent } from "./component/tables/table.component";

const routes: Routes = [
  { path: "tables", component: TableComponent },
  { path: "items", component: ItemComponent }
  //  { path: '404', component: NotfoundComponent },
  //  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
