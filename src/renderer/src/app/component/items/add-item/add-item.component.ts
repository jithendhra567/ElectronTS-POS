import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddTableComponent } from "../../tables/add-table/add-table.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { ItemService } from "../item.service";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"],
})
export class AddItemComponent implements OnInit {
  newItem: { name: string; category: string; rate: number, image: string } = {
    name: "",
    category: "",
    rate: 0,
    image: ""
  };

  categories: string[] = [];

  constructor(
    private is: ItemService,
    private dialogRef: MatDialogRef<AddTableComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.is.categories.subscribe(categories => {
      this.categories = categories
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(data => {
      if (data) this.is.addCategory(data);
    })
  }
}
