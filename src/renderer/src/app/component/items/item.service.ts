import { Injectable, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "src/app/ipc.service";
import { Item } from "./item.model";

@Injectable({
  providedIn: "root",
})
export class ItemService implements OnInit {
  public _categories = new BehaviorSubject<{name: string, image: string}[]>([]);
  private _items = new BehaviorSubject<Item[]>([]);
  itemData: AngularFirestoreCollection;
  POS_DATA: AngularFirestoreDocument;
  itemLength: number = 0;
  itemInfo: any = [];
  categoryData: { name: string, image: string }[] = [];

  constructor(private db: AngularFirestore) {
    this.itemData = this.db.collection("POS");
    this.POS_DATA = this.db.collection("hotels").doc("POS");
    this.fetchCategories();
    this.fetchItems();
  }

  ngOnInit() {}

  get categories() {
    return this._categories.asObservable();
  }

  backup() {
    this.db
      .collection("POS_BACKUP")
      .doc("categories")
      .set({ categoriesData: this.categoryData })
      .then(() => {
        alert("Backup Successful");
      });
  }

  getBackup() {
    this.db
      .collection("POS_BACKUP")
      .doc("categories")
      .get()
      .subscribe((data) => {
        const d:any = data.data();
        if (!d) return;
        this._categories.next(d.categoriesData);
        //set categories to POS
        this.POS_DATA
          .update({ categoriesData: d["categoriesData"] })
          .then(() => this.fetchCategories())
          .catch((err) => {
            //get data from pos
            this.POS_DATA
              .get()
              .toPromise()
              .then((data) => {
                const d1:any = data.data();
                if (!d1) return;
                d1["categoriesData"] = d["categoriesData"];
                this.POS_DATA
                  .set(d1);
              });
          });
      });
  }


  fetchCategories() {
    var allCategories = [];
    return this.POS_DATA
      .get()
      .toPromise()
      .then((data) => {
        if (data.data()) {
          const d: any = data.data();
          allCategories = d["categoriesData"] ?? [];
          this.categoryData = [];
          allCategories.forEach((val: { name: string, image: string }) => this.categoryData.push({ name: val.name, image: val.image }));
          this._categories.next(this.categoryData);
        }
      })
      .catch((err) => console.log(err));
  }



  addCategory(name: string, image: string) {
    this.categoryData.push({name: name, image: image});
    return this.POS_DATA
      .update({ categoriesData: this.categoryData })
      .then(() => this.fetchCategories())
      .catch((err) => console.log(err));
  }

  uploadData(categories: { name: string; image: string; }[]) {
    return this.POS_DATA
      .update({ categoriesData: categories })
      .then(() => this.fetchCategories())
      .catch((err) => console.log(err));
  }

  assignCategory(items: string[], category: string) {
    let newItems: Item[];
    this.items.subscribe((itemList) => {
      newItems = itemList;
      for (var i of items) {
        newItems.forEach((el, id) => {
          if (el.itemName == i) el.categoryName = category;
        });
      }
    });
    return this.items.pipe(
      map(() => {
        this._items.next(newItems);
        return newItems;
      })
    );
  }

  get items() {
    return this._items.asObservable();
  }

  getItem(id: string) {
    return this.items.pipe(
      map((items) => {
        return items.filter((item) => item.itemId === id);
      })
    );
  }

  getLength() {
    return this.items.pipe(
      map((items) => {
        this.itemLength = items.length;
      })
    );
  }

  fetchItems() {
    var allItems: Item[] = [];
    return this.itemData
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data: any = doc.data();
          allItems.push(data);
        });
        this._items.next(allItems);
        this.itemInfo = allItems;
        // //get categories from all items
        // this.categoryData = [];
        // allItems.forEach(val => {
        //   if (val.categoryName) {
        //     this.categoryData.push({ name: val.categoryName, image: "" });
        //   }
        // });
        // //get unique categories
        // this.categoryData = this.arrUnique(this.categoryData);
        // //upload categories to POS
        // this.POS_DATA
        //   .set({ categoriesData: this.categoryData })
        //   .then(() => this.fetchCategories())
        //   .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  arrUnique(arr:{name:string, image: string}[]) {
    var cleaned:{name:string, image: string}[] = [];
    arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function (itm2) {
            if (itm.name === itm2.name && itm2.image === itm.image) unique = false;
          });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
  }

  addItem(name: string, cat: string, rate: number, image: string) {
    this.getLength().subscribe();
    var iid = this.db.createId();
    const item = {
      itemId: iid,
      itemName: name,
      categoryName: cat,
      rate: rate,
      stock: 10,
      tags: [],
      image: image,
    };
    this.itemInfo.push(item);
    this.itemData
      .doc(iid)
      .set(item)
      .then(() => {
        this.fetchItems();
        alert("Item Added"+iid);
      })
      .catch((err) => console.log(err));
  }

  editItem(id: string, name: string, cat: string, rate: number, image: string) {
    let editedItem = {
      itemId: id,
      itemName: name,
      categoryName: cat,
      rate: rate,
      stock: 10,
      tags: [],
      image: image,
    };
    let ind = this.itemInfo.findIndex((item: any) => item.itemId === id)
    this.itemInfo[ind] = editedItem
    return this.itemData
      .doc(id)
      .set(editedItem)
      .then(() => this.fetchItems())
      .catch((err) => console.log(err));
  }

  deleteItem(id: string) {
    let ind = this.itemInfo.findIndex((item: any) => item.itemId === id);
    this.itemInfo.splice(ind, 1);
    return this.itemData
      .doc(id).delete()
      .then(() => this.fetchItems())
      .catch((err) => console.log(err));
  }
}
