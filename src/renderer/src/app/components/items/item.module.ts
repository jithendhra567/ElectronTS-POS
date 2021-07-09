import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AddItemComponent } from "./add-items/add-item.component";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { ItemRoutingModule } from "./item-routing.module";
import { ItemComponent } from "./item.component";
import { ViewItemsComponent } from "./view-items/view-items.component";

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
  ],
  declarations: [
    ViewItemsComponent,
    ItemComponent,
    AddItemComponent,
    EditItemComponent,
  ],
})
export class ItemModule {}
