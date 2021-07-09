import { Component } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  canViewBill = false;

  constructor() { }

  onViewBill() {
    if(this.canViewBill === false)  this.canViewBill = true
    else  this.canViewBill = false
  }

}
