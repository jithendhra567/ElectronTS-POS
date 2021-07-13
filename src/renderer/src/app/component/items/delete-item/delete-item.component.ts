import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html'
})

export class DeleteItemComponent {

  constructor(private dialogRef: MatDialogRef<DeleteItemComponent>) {}

  dialogClose() {
    this.dialogRef.close();
  }
}
