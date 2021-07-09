import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Item } from "../item.model";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})

export class ViewItemsComponent implements OnInit {

  public cats: string[] = [];
  public itemDict: {[id: string]: string[]} = {};
  public items: Item[] = [];
  canDisplay = false
  prev_cat = ''

  constructor(private is: ItemService, private router: Router) {}

  ngOnInit() {
    this.cats = this.is.categories;
    this.items = this.is.items;
    for(var i of this.cats) {
      this.itemDict[i] = [];
    }
    for(var j of this.items) {
      this.itemDict[j.categoryName].push(j.itemName)
    }
    console.log(this.itemDict)
  }

  displayItems(category: string) {
    if(this.prev_cat === '') {
      this.prev_cat = category
    }
    this.items = this.is.items;
    if(this.canDisplay === false) {
      this.canDisplay = true
      this.items = this.items.filter(item => item.categoryName === category)
    }
    else if(this.canDisplay === true) {
      if(this.prev_cat === category) {
        this.canDisplay = false
      }
      else {
        this.items = this.items.filter(item => item.categoryName === category)
      }
    }
    this.prev_cat = category
  }

  onEditItem(itemId: number) {
    this.router.navigate(['items', 'edit-item', itemId])
  }
}
