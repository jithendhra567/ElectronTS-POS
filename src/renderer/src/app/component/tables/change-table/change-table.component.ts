import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { TableService } from "../table.service";

@Component({
  selector: "app-change-table",
  templateUrl: "./change-table.component.html",
  styleUrls: ['./change-table.component.css']
})
export class ChangeTableComponent implements OnInit {
  myControl = new FormControl();
  options: number[] = [];
  filteredOptions!: Observable<number[]>;

  constructor(
    private dialogRef: MatDialogRef<ChangeTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts: TableService
  ) {}

  ngOnInit() {
    console.log(this.data['table1']);
    this.options = this.ts.tables.map(table => table.tableNumber)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: number): number[] {
    const filterValue = value;
    return this.options.filter(option => option.toString().includes(value.toString()))
  }
}
