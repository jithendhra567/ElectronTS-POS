import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/component/tables/add-table/add-table.component';
import { Item } from 'src/app/component/items/item.model';
import { ItemService } from 'src/app/component/items/item.service';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
//   isAdded: boolean;
// }

// const FRUITS: string[] = [
//   'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

export interface ItemData {
  id: string,
  name: string,
  category: string,
  rate: number,
  quantity: number,
  isAdded: boolean
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})

export class AddItemComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'rate', 'quantity', 'action'];
  itemList: Item[] = []
  newData: ItemData[] = []
  dataSource!: MatTableDataSource<ItemData>;

  @ViewChild("paginator1") paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private is: ItemService, public dialogRef: MatDialogRef<AddItemComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // this.users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.is.items.subscribe(items => {
      this.itemList = items
      for(var i in this.itemList) {
        this.newData.push(
          {
            id: this.itemList[+i].itemId,
            name: this.itemList[+i].itemName,
            category: this.itemList[+i].categoryName,
            rate: this.itemList[+i].rate,
            quantity: 1,
            isAdded: false
          }
        )
      }
      this.dataSource = new MatTableDataSource(this.newData)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addToCart(row: ItemData){
    this.newData[+row.id - 1].isAdded = true;
    this.dataSource = new MatTableDataSource(this.newData);
    this.dataSource.paginator = this.paginator;
  }

  removeFromCart(row: ItemData){
    this.newData[+row.id-1].isAdded=false;
    this.dataSource = new MatTableDataSource(this.newData);
    this.dataSource.paginator = this.paginator;
  }

  cancel(){
    this.dialogRef.close();
  }

  save(){
    const items: ItemData[] = [];
    this.newData.forEach(item=>{
      if(item.isAdded)
        items.push(item)
    });
    this.dialogRef.close(items);
  }

}

// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//     isAdded: false
//   };
// }
