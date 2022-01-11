import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Table } from 'src/app/component/tables/table.model';
import { TableService } from 'src/app/component/tables/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tables: Table[] = [];

  constructor(private ts: TableService, private db: AngularFirestore,) {
    db.collection('hotels').doc('POS').valueChanges().subscribe(data => {
      const val: any = data; //val: HotelDetais
      this.tables = val.tables;
    });
  }

  ngOnInit() {

  }

}
