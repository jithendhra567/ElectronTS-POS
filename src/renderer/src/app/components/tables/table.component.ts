import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  canViewTables = false;
  canAddTable = false;

  constructor(private ts: TableService) { }

  ngOnInit() {}

}
