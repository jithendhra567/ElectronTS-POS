import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { PosPrinter } from 'electron-pos-printer';

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

  printBill() {
    window.api.electronIpcSend('print',this.items);
    //this.PrintElem();
  }
  PrintElem()
  {
    var mywindow = window.open('', 'PRINT', 'height=600,width=400');
    const ele = document.getElementById('billcontent')
    console.log(mywindow,ele)
    mywindow?.document.write('<html><head>');
    mywindow?.document.write('</head><body >');
    if(ele) mywindow?.document.write(ele.innerHTML);
    mywindow?.document.write('</body></html>');
    mywindow?.document.close(); // necessary for IE >= 10
    mywindow?.focus(); // necessary for IE >= 10*/
    setTimeout(function () {
    mywindow?.print();
    mywindow?.close();
    }, 1000)
    return true;
  }
}
