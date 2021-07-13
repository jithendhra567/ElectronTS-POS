import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html'
})

export class EditCategoriesComponent implements OnInit {

  categories: string[] = [];

  constructor(private dialog: MatDialog, private is: ItemService, private dialogRef: MatDialogRef<EditCategoriesComponent>) {}

  ngOnInit() {
    this.categories = this.is.categories
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data)  this.is.addCategory(data);
    })
  }

  deleteCategories(options: any) {
    let arr = [];
    for(var i of options) {
      arr.push(i.value)
    }
    this.is.deleteCategories(arr);
  }

  dialogClose() {
    this.dialogRef.close();
  }

}
