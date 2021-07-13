import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddCategoryComponent } from "../component/items/add-category/add-category.component";
import { AddItemComponent } from "../component/items/add-item/add-item.component";
import { AssignCategoryComponent } from "../component/items/assign-category/assign-category.component";
import { DeleteItemComponent } from "../component/items/delete-item/delete-item.component";
import { EditCategoriesComponent } from "../component/items/edit-categories/edit-categories.component";
import { EditItemComponent } from "../component/items/edit-item/edit-item.component";
import { ItemComponent } from "../component/items/item.component";
import { AddTableComponent } from "../component/tables/add-table/add-table.component";
import { ChangeTableComponent } from "../component/tables/change-table/change-table.component";
import { DeleteTableComponent } from "../component/tables/delete-table/delete-table.component";
import { EditTableComponent } from "../component/tables/edit-table/edit-table.component";
import { TableComponent } from "../component/tables/table.component";
import { ViewTableComponent } from "../component/tables/view-table/view-table.component";
import { MaterialModule } from "../material.module";
import { AdminPanelComponent } from "./admin-panel.component";

@NgModule({
  declarations: [
    AdminPanelComponent,
    TableComponent,
    AddTableComponent,
    ViewTableComponent,
    DeleteTableComponent,
    EditTableComponent,
    ChangeTableComponent,
    ItemComponent,
    AddItemComponent,
    EditItemComponent,
    DeleteItemComponent,
    AddCategoryComponent,
    EditCategoriesComponent,
    AssignCategoryComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AdminPanelComponent]
})

export class AdminPanelModule {}
