import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./component/tables/table.component";
import { ItemComponent } from "./component/items/item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddTableComponent } from "./component/tables/add-table/add-table.component";
import { ViewTableComponent } from "./component/tables/view-table/view-table.component";
import { DeleteTableComponent } from "./component/tables/delete-table/delete-table.component";
import { EditTableComponent } from "./component/tables/edit-table/edit-table.component";
import { EditItemComponent } from "./component/items/edit-item/edit-item.component";
import { DeleteItemComponent } from "./component/items/delete-item/delete-item.component";
import { AddItemComponent } from "./component/items/add-item/add-item.component";
import { AddCategoryComponent } from "./component/items/add-category/add-category.component";
import { EditCategoriesComponent } from "./component/items/edit-categories/edit-categories.component";
import { ChangeTableComponent } from "./component/tables/change-table/change-table.component";
import { AssignCategoryComponent } from "./component/items/assign-category/assign-category.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";

@NgModule({
  declarations: [
    AdminPanelComponent,
    AppComponent,
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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
