import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "src/app/ipc.service";
import { Table } from "./table.model";

// new Table(1, 5, flse, 0),
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
  providedIn: "root",
})
export class TableService {
  private _tables = new BehaviorSubject<Table[]>(DataService.tables);
  tableLength: number = 0;
  tableData: AngularFirestoreDocument;
  tableInfo: any = [];

  constructor(private db: AngularFirestore) {
    this.tableData = this.db.collection("hotels").doc("POS");
    this.fetchTables();
  }

  get tables() {
    return this._tables.asObservable();
  }

  fetchTables() {
    var allTables: Table[] = [];
    return this.tableData
      .get()
      .toPromise()
      .then((data) => {
        const d: any = data.data();
        allTables = d["tables"];
        if (allTables) {
          this._tables.next(allTables);
          this.tableInfo = allTables;
        }
      })
      .catch((err) => console.log(err));
  }

  getTable(id: number) {
    return this.tables.pipe(
      map((tables) => {
        return tables.filter((table) => table.tableNumber === id);
      })
    );
  }

  getLength() {
    return this.tables.pipe(
      map((tables) => {
        this.tableLength = tables.length;
      })
    );
  }

  addTable(cap: number) {
    this.getLength().subscribe();
    const map = {
      tableNumber: this.tableLength + 1,
      capacity: cap,
      status: 0,
      reserved_people: 0,
      order: [],
      bill: 0,
    };
    this.tableInfo.push(map);
    return this.tableData
      .update({ tables: this.tableInfo })
      .then(() => this.fetchTables())
      .catch((err) => {
        this.tableData.get().toPromise().then((data) => {
          const d: any = data.data();
          d["tables"] = this.tableInfo;
          console.log(d);
          // this.tableData.set(d);
        });
      });
  }

  editTable(
    tnum: number,
    cap: number,
    status: 0 | 1 | 2,
    reserv_people: number
  ) {
    let editedTable = {
      tableNumber: tnum,
      capacity: cap,
      status: status,
      reserved_people: reserv_people,
      order: [],
      bill: 0,
    };
    this.tableInfo[tnum - 1] = editedTable;
    return this.tableData
      .update({ tables: this.tableInfo })
      .then(() => this.fetchTables())
      .catch((err) => console.log(err));
  }

  deleteTable(id: number) {
    this.tableInfo.splice(id - 1, 1);
    return this.tableData
      .update({ tables: this.tableInfo })
      .then(() => this.fetchTables())
      .catch((err) => console.log(err));
  }
}
