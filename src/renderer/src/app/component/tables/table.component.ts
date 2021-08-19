import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DataService } from "src/app/ipc.service";
import { AddTableComponent } from "./add-table/add-table.component";
import { Table } from "./table.model";
import { TableService } from "./table.service";
import { ViewTableComponent } from "./view-table/view-table.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  tableList: Table[] = [];
  emptyTableList: Table[] = [];
  reservedTableList: Table[] = [];
  cap: number = 0;

  constructor(
    private ts: TableService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.ts.tables.subscribe(tables => {
      this.tableList = tables
    })
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

  save(){
    DataService.save('tables',this.tableList);
    this.openSnackBar('saved', 'close')
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
