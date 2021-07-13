import { Injectable, OnInit } from "@angular/core";
import { Item } from "./item.model";

@Injectable({
  providedIn: 'root'
})

export class ItemService implements OnInit {

  public categories: string[] = ['Tiffins', 'Veg Meals', 'Non-Veg Meals'];

  private _items: Item[] = [
    new Item(1, 'Idly', 'Tiffins', 30),
    new Item(2, 'Dosa', 'Tiffins', 40),
    new Item(3, 'Chapathi', 'Tiffins', 40),
    new Item(4, 'Parota', 'Tiffins', 45),
    new Item(5, 'Veg meals full plate', 'Veg Meals', 60),
    new Item(6, 'Veg Meals half plate', 'Veg Meals', 30),
    new Item(7, 'Chicken Biryani', 'Non-Veg Meals', 120),
    new Item(8, 'Veg Biryani', 'Veg Meals', 80),
    new Item(9, 'Chicken Curry', 'Non-Veg Meals', 75)
  ]

  constructor() {}

  ngOnInit() {

  }

  get items() {
    return this._items
  }

  getItem(id: number) {
    return this._items.filter(item => item.itemId === id);
  }

  addCategory(name: string) {
    this.categories.push(name);
  }

  assignCategory(items: string[], category: string) {
    for(var i of items) {
      this.items.forEach((el, id) => {
        if(el.itemName == i) el.categoryName = category
      })
    }
  }

  deleteCategories(cats: string[]) {
    for(var i of cats) {
      this.categories.forEach((el, id) => {
        if(el == i) this.categories.splice(id, 1);
      })
    }
  }

  addItem(name: string, cat: string, rate: number) {
    this._items.push(new Item(this._items.length + 1, name, cat, rate));
  }

  editItem(id: number, name: string, cat: string, rate: number) {
    let getIndex = 0;
    for(var i in this._items) {
      if(this._items[+i].itemId === id) getIndex = +i;
    }
    this._items[getIndex] = new Item(id, name, cat, rate);
  }

  deleteItem(id: number) {
    let getIndex = 0;
    for(var i in this._items) {
      if(this._items[+i].itemId === id) getIndex = +i;
    }
    delete this._items[getIndex];
    this._items.splice(getIndex, 1);
    console.log(this._items);
  }
}
