export class Item {
  constructor(
    public itemId: string,
    public itemName: string,
    public categoryName: string,
    public rate: number,
    public stock: number,
    public tags: string[],
    public image: string
  ) {}
}
