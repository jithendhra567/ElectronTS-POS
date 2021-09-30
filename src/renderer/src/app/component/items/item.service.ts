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
  public _categories = new BehaviorSubject<string[]>(DataService.categories);

  private _items = new BehaviorSubject<Item[]>(DataService.items);
  itemData: AngularFirestoreCollection;
  categoryData: AngularFirestoreDocument;
  itemLength: number = 0;
  itemInfo: any = [];
  categoryInfo: any = [];

  constructor(private db: AngularFirestore) {
    this.itemData = this.db.collection("POS");
    this.categoryData = this.db.collection("hotels").doc("POS");
    this.fetchCategories();
    this.fetchItems();
  }

  ngOnInit() {}

  get categories() {
    return this._categories.asObservable();
  }

  fetchCategories() {
    var allCategories = [];
    return this.categoryData
      .get()
      .toPromise()
      .then((data) => {
        if (data.data()) {
          const d: any = data.data();
          allCategories = d["categories"] ?? [];
          this.categoryInfo = allCategories;
          this._categories.next(allCategories);
        }
      })
      .catch((err) => console.log(err));
  }

  addCategory(name: string) {
    this.categoryInfo.push(name);
    return this.categoryData
      .set({ categories: this.categoryInfo }, { merge: true })
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

  deleteCategories(cats: string[]) {
    for (var i of cats) {
      this.categoryInfo.forEach((el: any, id: any) => {
        if (el === i) this.categoryInfo.splice(id, 1);
      });
    }
    return this.categoryData
      .set({ categories: this.categoryInfo }, { merge: false })
      .then(() => {
        console.log("Hello World");
        this.fetchCategories();
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => console.log(err));
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
      .then(() => this.fetchItems())
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
      .set(editedItem, { merge: false })
      .then(() => this.fetchItems())
      .catch((err) => console.log(err));
  }

  deleteItem(id: string) {
    let ind = this.itemInfo.findIndex((item: any) => item.itemId === id);
    this.itemInfo.splice(ind, 1);
    return this.itemData
      .doc().delete()
      .then(() => this.fetchItems())
      .catch((err) => console.log(err));
  }
}
