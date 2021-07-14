import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  number: number;
  cap: number;
}

@Component({
  selector: "app-add-table",
  templateUrl: "./add-table.component.html",
  styleUrls: ["./add-table.component.css"],
})
export class AddTableComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
