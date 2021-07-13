import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.css']
})

export class DeleteTableComponent {

  constructor(private dialogRef: MatDialogRef<DeleteTableComponent>) {}

  dialogClose() {
    this.dialogRef.close();
  }
}
