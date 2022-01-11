import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/component/tables/table.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { DiscountComponent } from '../discount/discount.component';


export type HotelDetails = {
  categories?: string[];
  title?: string;
  tables?: Table[];
}

export type Table = {
  bill: number;
  capacity: number;
  order: Item[];
  reserved_people: number;
  status: number;
  tableNumber: number;
}

export type Item = {
  itemId: string,
  itemName: string,
  categoryName: string,
  rate: number,
  stock: number,
  tags: string[],
  image: string,
  count: number
}

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})

export class TableDetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'rate', 'quantity', 'action'];
  selectedItems:MatTableDataSource<Item>;
  items: Item[] = [];
  currentTable: Table;
  discount = 0;
  tableNumber = 0;
  tables: Table[] = [];
  total: number = 0;
  @ViewChild("paginator2") paginator2: MatPaginator;

  constructor(public dialog: MatDialog, private db: AngularFirestore,public route:ActivatedRoute,private ts: TableService) {
    this.tableNumber = route.snapshot.params.tableId;
    db.collection('hotels').doc('POS').get().toPromise().then(data => {
      const val: any = data.data(); //val: HotelDetais
      this.tables = val.tables;
      this.currentTable = this.tables[this.getTableIndex(val.tables, this.tableNumber)];
      this.currentTable.order.forEach(item => {
        this.items.push(item);
      });
      this.items.forEach(item=>this.total+=(item.count*item.rate));
      this.selectedItems = new MatTableDataSource(this.items);
    })
    this.selectedItems = new MatTableDataSource(this.items);
  }
  ngOnInit(): void {

  }

  getTableIndex(tables: Table[], id: number) {
    let index = -1;
    tables.forEach((val, i) => {
      if (val.tableNumber == id)
        index = i;
    })
    return index;
  }

  ngAfterViewInit(){
    this.selectedItems.paginator = this.paginator2;
  }

  updateQty(row:Item, _qty: any) {
    const qty = +_qty.value;
    if(qty>0){
      this.items.forEach(item=>{
        if(item.itemId===row.itemId) item.count=qty;
      })
    }
    this.total=0;
    this.items.forEach(item=>this.total+=(item.count*item.rate));
  }

  updateRate(row: Item, _rate: any, event: any) {
    //check if the event is from enter key
    if (event.keyCode === 13) {
      const rate = +_rate.value;
      if (rate > 0) {
        this.items.forEach(item => {
          if (item.itemId === row.itemId) item.rate = rate;
        })
      }
      this.total = 0;
      this.items.forEach(item => this.total += (item.count * item.rate));
    }
  }


  open(){
    const dialogRef = this.dialog.open(AddItemComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedItems = result;
      this.items = result;
      this.total=0;
      this.items.forEach(item=>this.total+=(item.count*item.rate))
    });
  }

  remove(row: Item){
    this.items = this.items.filter(item=>item.itemId!==row.itemId);
    this.selectedItems = new MatTableDataSource(this.items);
    this.total=0;
    this.items.forEach(item=>this.total+=(item.count*item.rate));
  }

  printBill(content:HTMLElement) {
    window.api.electronIpcSend('print', content.outerHTML.toString());
    const id = new Date().getTime();
    const data:any = {};
    data[id] = this.items;
    window.api.electronIpcSend('orderItems', JSON.stringify(data));
  }

  checkbill(content:HTMLElement) {
    window.api.electronIpcSend('check',content.outerHTML.toString());
  }

  save() {
    this.tables[this.getTableIndex(this.tables, this.tableNumber)].order = this.items;
    this.db.collection('hotels').doc('POS').update({ tables: this.tables }).then(data => alert('saved'))
      .catch(err=> console.log(err));
  }

  deactivate() {
    this.ts.editTable(this.tableNumber, this.tables[this.getTableIndex(this.tables, this.tableNumber)].capacity, 0, 0).then(()=>alert('deactivated'));
  }

  addDiscount() {
    const dialogRef = this.dialog.open(DiscountComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.percentage > 0) {
        this.discount = result.percentage*this.total/100;
        this.total = this.total - result.percentage*this.total/100;
      }
      else if (result.rate > 0) {
        this.discount = result.rate;
        this.total = this.total - result.rate;
      }
    });
  }

}
