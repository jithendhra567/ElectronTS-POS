import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatListOption } from "@angular/material/list";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { ItemService } from "../item.service";

@Component({
  selector: "app-assign-categeory",
  templateUrl: "./assign-category.component.html",
})
export class AssignCategoryComponent implements OnInit {

  categoryControl = new FormControl('', Validators.required)

  categories: string[] = [];
  items: string[] = [];

  constructor(
    private is: ItemService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AssignCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.categories = this.is.categories;
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data)  this.is.addCategory(data);
    })
  }

  assignCategory(items: MatListOption[], category: string) {
    this.items = [];
    for(var i of items) {
      this.items.push(i.value)
    }
    console.log(category)
    this.is.assignCategory(this.items, category);
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
