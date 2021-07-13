import { Injectable } from "@angular/core";
import { Table } from "./table.model";

@Injectable({
  providedIn: 'root'
})

export class TableService {

  private _tables: Table[] = [
    new Table(1, 5, false, 0),
    new Table(2, 7, false, 0),
    new Table(3, 6, true, 4),
    new Table(4, 6, true, 6),
    new Table(5, 6, false, 0),
    new Table(6, 7, true, 7),
    new Table(7, 7, false, 0),
    new Table(8, 5, true, 3),
    new Table(9, 6, false, 0),
    new Table(10, 4, true, 1),
    new Table(11, 4, true, 4),
    new Table(12, 6, false, 0),
    new Table(13, 2, true, 1),
    new Table(14, 2, false, 0)
  ]

  constructor() {}

  get tables() {
    return this._tables
  }

  getTable(id: any) {
    return this.tables.filter((table) => table.tableNumber === +id);
  }

  addTable(cap: number) {
    this._tables.push(new Table(this._tables.length + 1, cap, false, 0))
  }

  editTable(tnum: number, cap: number, reserv_status: boolean, reserv_people: number) {
    let getIndex = 0
    for(var i in this._tables) {
      if(this._tables[+i].tableNumber === tnum) getIndex = +i;
    }
    this._tables[getIndex] = new Table(tnum, cap, reserv_status, reserv_people);
  }

  deleteTable(id: number) {
    let getIndex = 0;
    for(var i in this._tables) {
      if(this._tables[+i].tableNumber === id) getIndex = +i;
    }
    delete this._tables[getIndex];
  }

  // editTable(tnum: number, cap: number, reserv_status: boolean) {
  //   let getIndex = 0;
  //   for(var i in this._tables) {
  //     if(this._tables[+i].tableNumber === tnum) getIndex = +i;
  //   }
  //   this._tables[getIndex] = new Table(tnum, cap, reserv_status);
  // }

  // DeleteTable(id: string) {
  //   let getIndex = 0;
  //   for(var i in this._tables) {
  //     if(this._tables[+i].tableNumber === +id) getIndex = +i;
  //   }
  //   delete this._tables[getIndex];
  // }

}
