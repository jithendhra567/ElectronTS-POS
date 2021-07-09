import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Table } from "../table.model";
import { TableService } from "../table.service";

@Component({
  selector: "app-edit-table",
  templateUrl: "./edit-table.component.html",
  styleUrls: ["./edit-table.component.css"],
})
export class EditTableComponent implements OnInit {
  table_data: Table[] = [];

  @ViewChild("f", { static: true }) form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private ts: TableService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("tableId")) {
        return;
      }
      this.table_data = this.ts.getTable(paramMap.get("tableId"));
      console.log(this.table_data);
    });
  }

  onEditTable() {
    this.ts.editTable(
      this.table_data[0].tableNumber,
      this.form.value["cap"],
      this.table_data[0].reserved_status
    );
  }

  openAlert() {
    this.dialog.open(DeleteTableComponent)
  }
}

@Component({
  selector: 'app-delete-table',
  templateUrl: 'delete-table.component.html'
})

export class DeleteTableComponent implements OnInit {

  tableId: string

  constructor(private ts: TableService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("tableId")) {
        return;
      }
       this.tableId = paramMap.get("tableId");
    });
  }

  onDelete() {
    this.ts.DeleteTable(this.tableId);
  }
}
