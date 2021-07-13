import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-table",
  templateUrl: "./edit-table.component.html",
  styleUrls: ["./edit-table.component.css"],
})
export class EditTableComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
