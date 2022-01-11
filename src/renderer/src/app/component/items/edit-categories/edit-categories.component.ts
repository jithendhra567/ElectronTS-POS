import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { ItemService } from "../item.service";

@Component({
  selector: "app-edit-categories",
  templateUrl: "./edit-categories.component.html",
})
export class EditCategoriesComponent implements OnInit {
  categories: {name: string, image: string}[] = [];
  deletedCategories: {name: string, image: string}[] = [];
  constructor(
    private dialog: MatDialog,
    private is: ItemService,
    private dialogRef: MatDialogRef<EditCategoriesComponent>
  ) {}

  ngOnInit() {
    this.is.categories.subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.is.addCategory(data.name, data.image);
      }
    });
  }

  deleteCategory(name: string, image: string) {
    //delete this name and image from categories
    this.categories = this.categories.filter((category) => {
      return category.name !== name && category.image !== image;
    });
  }

  uploadData() {
    this.is.uploadData(this.categories).then(() => {
      alert('uploaded');
      this.dialogRef.close();
    });
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
