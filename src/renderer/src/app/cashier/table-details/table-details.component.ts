import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';

export interface ItemData {
  id: string;
  name: string;
  category: string,
  rate: number,
  quantity: number,
  isAdded: boolean
}

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
  count?: number
}

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})

export class TableDetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'rate', 'quantity', 'action'];
  selectedItems:MatTableDataSource<ItemData>;
  items: ItemData[] = [];
  currentTable: Table;
  tableNumber = 0;
  total: number = 0;
  @ViewChild("paginator2") paginator2: MatPaginator;

  constructor(public dialog: MatDialog, private db: AngularFirestore,public route:ActivatedRoute) {
    this.tableNumber = route.snapshot.params.tableId;
    db.collection('hotels').doc('POS').get().toPromise().then(data => {
      const val: any = data.data();//val: HotelDetais
      this.currentTable = this.getTable(val.tables, this.tableNumber);
      this.currentTable.order.forEach(item => {
        this.items.push({
          id: item.itemId,
          name: item.itemName,
          category: item.categoryName,
          rate: item.rate,
          quantity: 1,
          isAdded: false
        })
      });
      this.items.forEach(item=>this.total+=(item.quantity*item.rate));
      this.selectedItems = new MatTableDataSource(this.items);
    })
    this.selectedItems = new MatTableDataSource(this.items);
  }

  ngOnInit(): void {

  }

  getTable(tables: Table[], id: number) {
    let index = -1;
    tables.forEach((val, i) => {
      console.log(val,id)
      if (val.tableNumber == id)
        index = i;
    })
    return tables[index];
  }

  ngAfterViewInit(){
    this.selectedItems.paginator = this.paginator2;
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
      this.selectedItems = result;
      this.items = result;
      this.total=0;
      this.items.forEach(item=>this.total+=(item.quantity*item.rate))
    });
  }

  remove(row: ItemData){
    this.items = this.items.filter(item=>item.id!==row.id);
    this.selectedItems = new MatTableDataSource(this.items);
    this.total=0;
    this.items.forEach(item=>this.total+=(item.quantity*item.rate));
  }

  printBill(content:HTMLElement) {
    console.log(content.outerHTML.toString());
    window.api.electronIpcSend('print',content.outerHTML.toString());
  }

}
