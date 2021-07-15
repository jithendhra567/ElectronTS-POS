import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';

export interface selectedItem {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  quantity: number
}
@Component({
  selector: 'app-instant-bill',
  templateUrl: './instant-bill.component.html',
  styleUrls: ['./instant-bill.component.scss']
})
export class InstantBillComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','quantity', 'action'];
  selectedItems:MatTableDataSource<selectedItem>;

  selectedUsers: selectedItem[] = [];
  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.selectedItems = new MatTableDataSource(this.selectedUsers);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.selectedItems.paginator = this.paginator;
    this.selectedItems.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.selectedItems.filter = filterValue.trim().toLowerCase();
    if (this.selectedItems.paginator) {
      this.selectedItems.paginator.firstPage();
    }
  }
  open(){
    const dialogRef = this.dialog.open(AddItemComponent);
    dialogRef.afterClosed().subscribe((result:string[]) => {
      result.forEach(item=>{
        //ids will be here 
      })
    });
  }
}
