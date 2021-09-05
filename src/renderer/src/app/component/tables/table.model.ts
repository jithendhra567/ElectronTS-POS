import { Order } from "./order.model";

export class Table {
  constructor(
    public tableNumber: number,
    public capacity: number,
    public status: 0 | 1 | 2,
    public reserved_people: number,
    public order: Order[],
    public bill: number
  ) {}
}
