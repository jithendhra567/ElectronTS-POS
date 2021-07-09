import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TableService } from "../table.service";

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})

export class AddTableComponent {

  @ViewChild('f', { static: true }) form: NgForm;

  constructor(private ts: TableService) {}

  onAddTable() {
    this.ts.addTable(this.form.value['tNum'], this.form.value['cap'], false);
    console.log(this.ts.tables);
  }
}
