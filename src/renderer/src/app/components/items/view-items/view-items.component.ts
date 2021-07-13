import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AddItemComponent } from "../add-items/add-item.component";
import { AssignCategoryComponent } from "../assign-category/assign-category.component";
import { DeleteItemComponent } from "../delete-item/delete-item.component";
import { EditItemComponent } from "../edit-item/edit-item.component";
import { Item } from "../item.model";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('.25s ease-in'))
    ])
  ]
})

export class ViewItemsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'rate'];
  dataSource: MatTableDataSource<Item>;
  expandedElement: Item | null

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public cats: string[] = [];
  public items: Item[] = [];
  public noCategoryItems: Item[] = [];
  canDisplay = false
  prev_cat = ''

  constructor(private is: ItemService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.items = this.is.items;
    this.cats = this.is.categories;
  }

  displayItems(category: string) {
    if(this.prev_cat === '') {
      this.prev_cat = category
    }
    this.items = this.is.items;
    if(this.canDisplay === false) {
      this.canDisplay = true
      this.items = this.items.filter(item => item.categoryName === category)
    }
    else if(this.canDisplay === true) {
      if(this.prev_cat === category) {
        this.canDisplay = false
      }
      else {
        this.items = this.items.filter(item => item.categoryName === category)
      }
    }
    this.prev_cat = category
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayNoCategory() {
    this.canDisplay = true
    this.prev_cat = 'no cat'
      this.cats = this.is.categories
      this.noCategoryItems = this.is.items.filter(item => {
        for(var i of this.cats) {
          if(item.categoryName === i)
            return false
        }
        return item
      })
      this.dataSource = new MatTableDataSource(this.noCategoryItems);
  }

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data)  this.is.addItem(data.name, data.category, data.rate);
    });
  }

  editItem(id: number) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '300px',
      data: { id: id }
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data)  this.is.editItem(data.itemId, data.itemName, data.categoryName, data.rate);
    })
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '300px',
      data: {id: id}
    })
    dialogRef.afterClosed().subscribe(val => {
      if(val === true) this.is.deleteItem(id);
    })
  }

  assignCategory() {
    const dialogRef = this.dialog.open(AssignCategoryComponent, {
      width: '300px',
      data: { itemList: this.noCategoryItems }
    })
    dialogRef.afterClosed().subscribe();
  }
}
