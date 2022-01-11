import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { PosPrinter } from 'electron-pos-printer';
import { DataService } from 'src/app/ipc.service';
import { FullDayBillComponent } from '../full-day-bill/full-day-bill.component';
import { DiscountComponent } from '../discount/discount.component';

export interface ItemData {
  id: string;
  name: string;
  category: string,
  rate: number,
  quantity: number,
  isAdded: boolean
}

@Component({
  selector: 'app-instant-bill',
  templateUrl: './instant-bill.component.html',
  styleUrls: ['./instant-bill.component.scss']
})
export class InstantBillComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'rate', 'quantity', 'action'];
  selectedItems:MatTableDataSource<ItemData>;
  discount = 0;
  items: ItemData[] = [];
  total: number = 0;
  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.selectedItems = new MatTableDataSource(this.items);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.selectedItems.paginator = this.paginator;
    this.selectedItems.sort = this.sort;
  }

  updateQty(row:ItemData, _qty: any) {
    const qty = +_qty.value;
    if(qty>0){
      this.items.forEach(item=>{
        if(item.id===row.id) item.quantity=qty;
      })
    }
    this.total=0;
    this.items.forEach(item=>this.total+=(item.quantity*item.rate));
  }

  updateRate(row: ItemData, _rate: any, event: any) {
    //check if the event is from enter key
    if (event.keyCode === 13) {
      const rate = +_rate.value;
      if (rate > 0) {
        this.items.forEach(item => {
          if (item.id === row.id) item.rate = rate;
        })
      }
      this.total = 0;
      this.items.forEach(item => this.total += (item.quantity * item.rate));
    }
  }


  open(){
    const dialogRef = this.dialog.open(AddItemComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedItems = result
      this.items = result;
      this.total=0;
      this.items.forEach(item=>this.total+=(item.quantity*item.rate));
    });
  }

  remove(row: ItemData){
    this.items = this.items.filter(item=>item.id!==row.id);
    this.selectedItems = new MatTableDataSource(this.items);
    this.total=0;
    this.items.forEach(item=>this.total+=(item.quantity*item.rate));
  }

  printBill(content:HTMLElement) {
    window.api.electronIpcSend('print', content.outerHTML.toString());
    const id = new Date().getTime();
    const data:any = {};
    data[id] = this.items;
    window.api.electronIpcSend('orderItems', JSON.stringify(data));
  }

  fullDayBill() {
    //open dialog component
    const dialogRef = this.dialog.open(FullDayBillComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  addDiscount() {
    const dialogRef = this.dialog.open(DiscountComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.percentage > 0) {
        this.discount = result.percentage * this.total / 100;
        this.total = this.total - this.discount;
      }
      else if (result.rate > 0) {
        this.discount = result.rate;
        this.total = this.total - result.rate;
      }
    });
  }
}
