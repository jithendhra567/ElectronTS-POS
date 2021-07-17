import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from '../add-item/add-item.component';

export interface ItemData {
  id: string;
  name: string;
  category: string,
  rate: number,
  quantity: number,
  isAdded: boolean
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

  @ViewChild("paginator2") paginator2: MatPaginator;

  constructor(public dialog: MatDialog) {
    this.selectedItems = new MatTableDataSource(this.items);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.selectedItems.paginator = this.paginator2;
  }

  open(){
    const dialogRef = this.dialog.open(AddItemComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedItems = result
    });
  }

}
