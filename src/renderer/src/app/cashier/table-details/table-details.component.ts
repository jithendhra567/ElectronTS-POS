import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from '../add-item/add-item.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})

export class TableDetailsComponent implements OnInit {

  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  selectedItems:MatTableDataSource<PeriodicElement>;

  @ViewChild("paginator2") paginator2: MatPaginator;

  constructor(public dialog: MatDialog) { 
    this.selectedItems = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.selectedItems.paginator = this.paginator2;
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
