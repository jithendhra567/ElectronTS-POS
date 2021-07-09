import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AddTableComponent } from "./add-table/add-table.component";
import {
  DeleteTableComponent,
  EditTableComponent,
} from "./edit-table/edit-table.component";
import { TableRoutingModule } from "./table-routing.module";
import { TableComponent } from "./table.component";
import { ViewTablesComponent } from "./view-tables/view-tables.component";

@NgModule({
  imports: [
    TableRoutingModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  declarations: [
    ViewTablesComponent,
    TableComponent,
    AddTableComponent,
    EditTableComponent,
    DeleteTableComponent,
  ],
})
export class TableModule {}
