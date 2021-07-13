import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./components/tables/table.component";
import { ItemComponent } from "./components/items/item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewItemsComponent } from "./components/items/view-items/view-items.component";
import { AddTableComponent } from "./components/tables/add-table/add-table.component";
import { ViewTableComponent } from "./components/tables/view-table/view-table.component";
import { DeleteTableComponent } from "./components/tables/delete-table/delete-table.component";
import { EditTableComponent } from "./components/tables/edit-table/edit-table.component";
import { EditItemComponent } from "./components/items/edit-item/edit-item.component";
import { DeleteItemComponent } from "./components/items/delete-item/delete-item.component";
import { AddItemComponent } from "./components/items/add-items/add-item.component";
import { AddCategoryComponent } from "./components/items/add-category/add-category.component";
import { EditCategoriesComponent } from "./components/items/edit-categories/edit-categories.component";
import { ChangeTableComponent } from "./components/tables/change-table/change-table.component";
import { AssignCategoryComponent } from "./components/items/assign-category/assign-category.component";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddTableComponent,
    ViewTableComponent,
    DeleteTableComponent,
    EditTableComponent,
    ChangeTableComponent,
    ItemComponent,
    AddItemComponent,
    ViewItemsComponent,
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
