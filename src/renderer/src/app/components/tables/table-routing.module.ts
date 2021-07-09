import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddTableComponent } from "./add-table/add-table.component";
import { EditTableComponent } from "./edit-table/edit-table.component";
import { TableComponent } from "./table.component";
import { ViewTablesComponent } from "./view-tables/view-tables.component";

const routes: Routes = [
  {
    path: 'tables',
    component: TableComponent,
    children: [
      {
        path: 'view-tables',
        component: ViewTablesComponent
      },
      {
        path: 'add-table',
        component: AddTableComponent
      },
      {
        path: 'edit-table/:tableId',
        component: EditTableComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class TableRoutingModule {}
