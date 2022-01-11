import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/component/items/item.model';
import { DataService } from 'src/app/ipc.service';
import { ItemData } from '../add-item/add-item.component';

@Component({
  selector: 'app-full-day-bill',
  templateUrl: './full-day-bill.component.html',
  styleUrls: ['./full-day-bill.component.scss']
})
export class FullDayBillComponent implements OnInit {

  fullDayBill: ItemData[][] = [];

  constructor() {
    DataService.fullDayData.forEach(element => {
      const key = Object.keys(element)[0];
      //get value of the object
      const value = element[key];
      //push the new array to the fullDayBill array
      this.fullDayBill.push(value);
    });
  }

  ngOnInit(): void {
  }

  print() {
    const content = document.getElementById('bill');
    console.log(content);
    if (content) {
      window.api.electronIpcSend('fullPrint', content?.outerHTML.toString());
    }
  }

}
