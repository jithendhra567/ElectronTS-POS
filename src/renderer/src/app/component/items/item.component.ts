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

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit, AfterViewInit {
  categories: string[] = [];
  public items: Item[] = [];
  public noCategoryItems: Item[] = [];
  canDisplay = false;
  prev_cat = "";

  displayedColumns: string[] = ["id", "name", "rate", "edit", "delete"];
  dataSource!: MatTableDataSource<Item>;
  // expandedElement: Item | null

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private is: ItemService) {}

  ngOnInit() {
    this.is.categories.subscribe((categories) => {
      this.categories = categories;
    });
    this.is.items.subscribe((items) => {
      this.items = items;
    });
  }

  ngAfterViewInit() {
    this.is.categories.subscribe((categories) => {
      this.categories = categories;
    });
    this.is.items.subscribe((items) => {
      this.items = items;
    });
  }

  displayItems(category: string) {
    this.is.items.subscribe((items) => {
      this.items = items;
    });
    if (this.prev_cat === "") {
      this.prev_cat = category;
    }
    if (this.canDisplay === false) {
      this.canDisplay = true;
      this.items = this.items.filter((item) => item.categoryName === category);
    } else if (this.canDisplay === true) {
      if (this.prev_cat === category) {
        this.canDisplay = false;
      } else {
        this.items = this.items.filter(
          (item) => item.categoryName === category
        );
      }
    }
    this.prev_cat = category;
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayNoCategory() {
    this.canDisplay = true;
    this.prev_cat = "no cat";
    this.is.items.subscribe((items) => {
      this.noCategoryItems = items.filter((item) => {
        for (var i of this.categories) {
          if (item.categoryName === i) return false;
        }
        return item;
      });
    });
    this.dataSource = new MatTableDataSource(this.noCategoryItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.is.addCategory(data).subscribe();
    });
  }

  editCategories() {
    const dialogRef = this.dialog.open(EditCategoriesComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe();
  }

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.is
          .addItem(data.name, data.category, data.rate)
          .subscribe((items) => {
            this.items = items;
          });
      }
      this.displayItems(this.prev_cat)
    });
  }

  editItem(id: number) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: "300px",
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.is
          .editItem(data.itemId, data.itemName, data.categoryName, data.rate)
          .subscribe((items) => {
            this.items = items;
          });
      this.displayItems(this.prev_cat)
    });
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: "300px",
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val === true)
        this.is.deleteItem(id).subscribe((items) => {
          this.items = items;
        });
      this.displayItems(this.prev_cat)
    });
  }

  assignCategory() {
    const dialogRef = this.dialog.open(AssignCategoryComponent, {
      width: "300px",
      data: { itemList: this.noCategoryItems },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.displayNoCategory()
    });
  }
}
