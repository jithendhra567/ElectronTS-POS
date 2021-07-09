import { Injectable } from "@angular/core";
import { Table } from "./table.model";

@Injectable({
  providedIn: 'root'
})

export class TableService {

  private _tables: Table[] = [
    new Table(1, 5, false),
    new Table(2, 7, false),
    new Table(3, 6, true)
  ]

  constructor() {}

  get tables() {
    return this._tables
  }

  getTable(id: string | null) {
    return this.tables.filter((table) => table.tableNumber === +id);
  }

  addTable(tnum: number, cap: number, reserv_status: boolean) {
    this._tables.push(new Table(tnum, cap, reserv_status));
  }

  editTable(tnum: number, cap: number, reserv_status: boolean) {
    let getIndex = 0;
    for(var i in this._tables) {
      if(this._tables[+i].tableNumber === tnum) getIndex = +i;
    }
    this._tables[getIndex] = new Table(tnum, cap, reserv_status);
  }

  DeleteTable(id: string) {
    let getIndex = 0;
    for(var i in this._tables) {
      if(this._tables[+i].tableNumber === +id) getIndex = +i;
    }
    delete this._tables[getIndex];
  }

}
