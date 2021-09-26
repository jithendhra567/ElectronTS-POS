import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/component/tables/table.model';
import { TableService } from 'src/app/component/tables/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tables: Table[] = [];

  constructor(private ts: TableService) { }

  ngOnInit() {
    this.ts.tables.subscribe(tables => {
      this.tables = tables
    })
  }

}
