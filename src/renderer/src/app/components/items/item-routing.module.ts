import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddItemComponent } from "./add-items/add-item.component";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { ItemComponent } from "./item.component";
import { ViewItemsComponent } from "./view-items/view-items.component";

const routes: Routes = [
  {
    path: 'items',
    component: ItemComponent,
    children: [
      {
        path: 'view-items',
        component: ViewItemsComponent
      },
      {
        path: 'add-item',
        component: AddItemComponent
      },
      {
        path: 'edit-item/:itemId',
        component: EditItemComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class ItemRoutingModule {}
