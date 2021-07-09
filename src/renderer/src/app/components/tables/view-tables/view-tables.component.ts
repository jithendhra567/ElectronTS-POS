import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Table } from "../table.model";
import { TableService } from "../table.service";

@Component({
  selector: 'app-view-table',
  templateUrl: './view-tables.component.html',
  styleUrls: ['./view-tables.component.css']
})

export class ViewTablesComponent implements OnInit{

  public tableList: Table[] = [];

  constructor(private ts: TableService, private router: Router) {}

  ngOnInit() {
    this.tableList = this.ts.tables;
  }

  onClickTable(id: number) {
    this.router.navigate(['tables', 'edit-table', id])
  }
}
