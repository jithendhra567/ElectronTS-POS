import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { DataService } from "src/app/ipc.service";
import { Item } from "./item.model";

@Injectable({
  providedIn: "root",
})

// new Item(1, 'Idly', 'Tiffins', 30),
// new Item(2, 'Dosa', 'Tiffins', 40),
// new Item(3, 'Chapathi', 'Tiffins', 40),
// new Item(4, 'Parota', 'Tiffins', 45),
// new Item(5, 'Veg meals full plate', 'Veg Meals', 60),
// new Item(6, 'Veg Meals half plate', 'Veg Meals', 30),
// new Item(7, 'Chicken Biryani', 'Non-Veg Meals', 120),
// new Item(8, 'Veg Biryani', 'Veg Meals', 80),
// new Item(9, 'Chicken Curry', 'Non-Veg Meals', 75)
export class ItemService implements OnInit {
  public _categories = new BehaviorSubject<string[]>(DataService.categories);

  private _items = new BehaviorSubject<Item[]>(DataService.items);

  itemLength: number = 0

  constructor() {}

  ngOnInit() {}

  get items() {
    return this._items.asObservable();
  }

  get categories() {
    return this._categories.asObservable();
  }

  getItem(id: number) {
    // return this._items.filter(item => item.itemId === id);
    return this.items.pipe(
      map((items) => {
        return items.filter((item) => item.itemId === id);
      })
    );
  }

  getLength() {
    return this.items.pipe(
      map(items => {
        this.itemLength = items.length
      })
    )
  }

  addCategory(name: string) {
    return this.categories.pipe(
      map((categories) => {
        return categories;
      }),
      take(1),
      tap(categories => {
        categories.push(name)
        this._categories.next(categories)
      })
    );
  }

  assignCategory(items: string[], category: string) {
    // for (var i of items) {
    //   this.items.forEach((el, id) => {
    //     if (el.itemName == i) el.categoryName = category;
    //   });
    // }
    let newItems: Item[]
    this.items.subscribe(itemList => {
      newItems = itemList
      for(var i of items) {
        newItems.forEach((el, id) => {
          if(el.itemName == i)  el.categoryName = category
        });
      }
    })
    return this.items.pipe(
      map(() => {
        this._items.next(newItems)
        return newItems
      })
    )
  }

  deleteCategories(cats: string[]) {
    // for (var i of cats) {
    //   this.categories.forEach((el, id) => {
    //     if (el == i) this.categories.splice(id, 1);
    //   });
    // }
    let newCategories: string[]
    this.categories.subscribe(categories => {
      newCategories = categories
      for(var i of cats) {
        newCategories.forEach((el, id) => {
          if(el === i)  newCategories.splice(id, 1);
        })
      }
    })
    return this.categories.pipe(
      map(() => {
        this._categories.next(newCategories)
        return newCategories
      })
    )
  }

  addItem(name: string, cat: string, rate: number) {
    // this._items.push(new Item(this._items.length + 1, name, cat, rate));
    this.getLength().subscribe()
    return this._items.pipe(
      map(items => {
        return items
      }),
      take(1),
      tap(items => {
        items.push(new Item(this.itemLength + 1, name, cat, rate))
        this._items.next(items)
      })
    )
  }

  editItem(id: number, name: string, cat: string, rate: number) {
    // let getIndex = 0;
    // for (var i in this._items) {
    //   if (this._items[+i].itemId === id) getIndex = +i;
    // }
    // this._items[getIndex] = new Item(id, name, cat, rate);
    let editedItem = new Item(id, name, cat, rate)
    return this.items.pipe(
      map(items => {
        return items
      }),
      take(1),
      tap(items => {
        items[id - 1] = editedItem
        this._items.next(items)
      })
    )
  }

  deleteItem(id: number) {
    // let getIndex = 0;
    // for (var i in this._items) {
    //   if (this._items[+i].itemId === id) getIndex = +i;
    // }
    // delete this._items[getIndex];
    // this._items.splice(getIndex, 1);
    // console.log(this._items);
    return this.items.pipe(
      map(items => {
        return items
      }),
      take(1),
      tap(items => {
        this._items.next(items.filter((item) => item.itemId !== id))
      })
    )
  }
}
