import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { EditCategoriesComponent } from "./edit-categories/edit-categories.component";
import { Item } from "./item.model";
import { ItemService } from "./item.service";
import { AddItemComponent } from "./add-item/add-item.component";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { AssignCategoryComponent } from "./assign-category/assign-category.component";
import { DataService } from "src/app/ipc.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  categories: { name: string, image: string}[] = [];
  public items: Item[] = [];
  public noCategoryItems: Item[] = [];
  prev_cat = "";

  displayedColumns: string[] = ["image", "name", "cat", "rate", "edit", "delete"];
  dataSource!: MatTableDataSource<Item>;

  // event type CdkDragDrop<Item[]>
  drop(event: any) {
    const temp = this.items[event.previousIndex];
    this.items.splice(event.previousIndex, 1);
    this.items.splice(event.currentIndex, 0, temp);
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private is: ItemService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.is.categories.subscribe((categories) => {
      this.categories = categories;
    });
    this.is.items.subscribe((items) => {
      this.items = items;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayItems(category: string) {
    this.is.items.subscribe((items) => {
      this.items = items;
    });
    this.items = this.items.filter(
      (item) => item.categoryName === category
    );
    this.prev_cat = category;
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async displayAll() {
    this.is.items.subscribe((items) => {
      this.items = items;
    });
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  editCategories() {
    const dialogRef = this.dialog.open(EditCategoriesComponent, {
      width: "500px",
      height: '80%'
    });
    dialogRef.afterClosed().subscribe();
  }

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.is.addItem(data.name, data.category.name, data.rate, data.image);
      }
      this.displayItems(this.prev_cat);
    });
  }

  editItem(id: string) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: "300px",
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data)
        this.is.editItem(
          data.itemId,
          data.itemName,
          data.categoryName,
          data.rate,
          data.image
        );
    });
  }

  deleteItem(id: string) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: "300px",
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val === true) this.is.deleteItem(id);
      this.displayItems(this.prev_cat);
    });
  }

  assignCategory() {
    const dialogRef = this.dialog.open(AssignCategoryComponent, {
      width: "300px",
      data: { itemList: this.noCategoryItems },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.displayAll();
    });
  }

  save() {
    DataService.save("items", this.items);
    DataService.save("categories", this.categories);
    this.openSnackBar("saved", "close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  backup() {
    this.is.backup();
  }

  getBackup() {
    this.is.getBackup();
  }
}
