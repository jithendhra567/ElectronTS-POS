import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";
import { DataService } from "src/app/ipc.service";
import { Table } from "./table.model";

    // new Table(1, 5, false, 0),
    // new Table(2, 7, false, 0),
    // new Table(3, 6, true, 4),
    // new Table(4, 6, true, 6),
    // new Table(5, 6, false, 0),
    // new Table(6, 7, true, 7),
    // new Table(7, 7, false, 0),
    // new Table(8, 5, true, 3),
    // new Table(9, 6, false, 0),
    // new Table(10, 4, true, 1),
    // new Table(11, 4, true, 4),
    // new Table(12, 6, false, 0),
    // new Table(13, 2, true, 1),
    // new Table(14, 2, false, 0)

@Injectable({
  providedIn: 'root'
})

export class TableService {

  private _tables = new BehaviorSubject<Table[]>(DataService.tables);
  tableLength: number = 0

  constructor() {}

  get tables() {
    return this._tables.asObservable();
  }

  getTable(id: number) {
    // return this.tables.filter((table) => table.tableNumber === +id);
    return this.tables.pipe(map(tables => {
      return tables.filter((table => table.tableNumber === id))
    }))
  }

  getLength() {
    return this.tables.pipe(
      map(tables => {
        this.tableLength = tables.length
      })
    )
  }

  addTable() {
    this.getLength().subscribe()
    return this.tables.pipe(
      map(tables => {
        return tables
      }),
      take(1),
      tap(tables => {
        tables.push(new Table(this.tableLength + 1, 8, 0, 0))
        this._tables.next(tables)
      })
    )
  }

  editTable(tnum: number, status: 0 | 1| 2, reserv_people: number) {
    // let getIndex = 0
    // for(var i in this._tables) {
    //   if(this._tables[+i].tableNumber === tnum) getIndex = +i;
    // }
    // this._tables[getIndex] = new Table(tnum, 8, reserv_status, reserv_people);
    let editedTable = new Table(tnum, 8, status, reserv_people)
    return this.tables.pipe(
      map(tables => {
        return tables
      }),
      take(1),
      tap(tables => {
        tables[tnum - 1] = editedTable
        this._tables.next(tables)
      })
    )
  }

  deleteTable(id: number) {
    // let getIndex = 0;
    // for(var i in this._tables) {
    //   if(this._tables[+i].tableNumber === id) getIndex = +i;
    // }
    // delete this._tables[getIndex];
    return this.tables.pipe(
      map(tables => {
        return tables
      }),
      take(1),
      tap(tables => {
        this._tables.next(tables.filter((table) => table.tableNumber !== id))
      })
    )
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
