import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit{

  categorySwitch = false
  itemSwitch = false
  categories: string[] = []

  @ViewChild('f1', { static: true }) form1: NgForm;
  @ViewChild('f2', { static: true }) form2: NgForm;

  constructor(private is: ItemService) {}

  ngOnInit() {
    this.categories = this.is.categories
  }

  onCreateCategory() {
    if(this.categorySwitch === false) {
      this.categorySwitch = true
      this.itemSwitch = false
    }
    else  this.categorySwitch = false
  }

  onCreateItem() {
    if(this.itemSwitch === false) {
      this.itemSwitch = true
      this.categorySwitch = false
    }
    else  this.itemSwitch = false
  }

  onAddCategory() {
    this.is.addCategory(this.form1.value['cat']);
  }

  onAddItem() {
    this.is.addItem(this.form2.value['item'], this.form2.value['category'], this.form2.value['rate'])
  }
}
