import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { AddTableComponent } from "./add-table/add-table.component";
import { Table } from "./table.model";
import { TableService } from "./table.service";
import { ViewTableComponent } from "./view-table/view-table.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  tableList: Table[] = [];
  emptyTableList: Table[] = [];
  reservedTableList: Table[] = [];
  cap: number = 0;

  constructor(
    private ts: TableService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.tableList = this.ts.tables;
    this.emptyTableList = this.tableList.filter(
      (table) => table.reserved_status === false
    );
    this.reservedTableList = this.tableList.filter(
      (table) => table.reserved_status === true
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: "300px",
      data: { number: this.tableList.length, cap: this.cap },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ts.addTable(result);
      }
    });
  }

  openBottomSheet(num: number) {
    this.bottomSheet.open(ViewTableComponent, {
      data: { id: num }
    });
  }
}
