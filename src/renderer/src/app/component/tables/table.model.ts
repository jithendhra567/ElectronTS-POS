export class Table {
  constructor(
    public tableNumber: number,
    public capacity: number,
    public reserved_status: boolean,
    public reserved_people: number
  ) {}
}