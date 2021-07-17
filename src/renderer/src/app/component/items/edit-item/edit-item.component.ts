import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Item } from "../item.model";
import { ItemService } from "../item.service";

@Component({
  selector: "app-edit-item",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.css"],
})
export class EditItemComponent implements OnInit {
  itemData: Item[] = [];
  categories: string[] = [];

  constructor(
    private is: ItemService,
    private dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.is.getItem(Number(this.data.id)).subscribe(items => {
      this.itemData = items
    });

    this.is.categories.subscribe(categories => {
      this.categories = categories
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
