import { Component, Inject, OnInit } from "@angular/core";
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { ChangeTableComponent } from "../change-table/change-table.component";
import { DeleteTableComponent } from "../delete-table/delete-table.component";
import { EditTableComponent } from "../edit-table/edit-table.component";
import { Table } from "../table.model";
import { TableService } from "../table.service";

@Component({
  selector: "app-view-table",
  templateUrl: "./view-table.component.html",
  styleUrls: ["./view-table.component.css"],
})
export class ViewTableComponent implements OnInit {
  public table: Table[] = [];

  constructor(
    private ts: TableService,
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<ViewTableComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() {
    this.ts.tables.subscribe(tables => {
      this.table = tables.filter(table => table.tableNumber === this.data.id);
    })
  }

  openModal() {
    const dialogRef = this.dialog.open(EditTableComponent, {
      width: '300px',
      data: { table: this.table[0] }
    })
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.ts.editTable(res.tableNumber, res.capacity, res.status, res.reserved_people);
        this.bottomSheetRef.dismiss();
      }
    });
  }

  openDeleteAlert() {
    const deleteRef = this.dialog.open(DeleteTableComponent, {
      width: '300px'
    })
    deleteRef.afterClosed().subscribe((val) => {
      if(val === true)  {
        this.ts.deleteTable(this.table[0].tableNumber);
        this.bottomSheetRef.dismiss();
      }
    });
  }

  openSwapModal() {
    const swapRef = this.dialog.open(ChangeTableComponent, {
      width: '300px',
      data: {table1: this.table[0]}
    })
    swapRef.afterClosed().subscribe(() => {
      this.bottomSheetRef.dismiss();
    })
  }

  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }
}
