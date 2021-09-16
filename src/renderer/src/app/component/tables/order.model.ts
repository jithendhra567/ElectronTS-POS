import { Item } from "../items/item.model";

export class Order {
  constructor(
    public item: Item['itemName'],
    public quantity: number
  ) {}
}
