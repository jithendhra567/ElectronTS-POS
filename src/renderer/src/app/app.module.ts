import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavlistComponent } from "./components/navlist/navlist.component";
import { NavList2Component } from "./components/navlist2/navlist2.component";
import { TableModule } from "./components/tables/table.module";
import { ItemModule } from "./components/items/item.module";
import { BillModule } from "./components/bills/bill.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [AppComponent, NavlistComponent, NavList2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MaterialModule,
    TableModule,
    ItemModule,
    BillModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
