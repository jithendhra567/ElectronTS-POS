import { Component, Inject, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  isAdded: boolean;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'action'];
  dataSource: MatTableDataSource<UserData>;

  
  @ViewChild("paginator1") paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createNewUser(id: number): UserData {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      isAdded: false
    };
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
