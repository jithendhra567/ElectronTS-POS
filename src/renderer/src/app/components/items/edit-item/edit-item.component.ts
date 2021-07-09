import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Item } from "../item.model";
import { ItemService } from "../item.service";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})

export class EditItemComponent implements OnInit {

  itemData: Item[] = [];

  @ViewChild('f', { static: true }) form: NgForm

  constructor(private route: ActivatedRoute, private is: ItemService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if(!paramMap.has('itemId')) {
        return
      }
      this.itemData = this.is.getItem(+paramMap.get('itemId'));
    })
  }

  onEditItem() {
    this.is.editItem(this.itemData[0].itemId, this.form.value['itemName'], this.form.value['cat'], this.form.value['rt']);
  }
}
