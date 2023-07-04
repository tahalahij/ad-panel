export class Setting {
  constructor(
    public _id: string,
    public name: string,
    public value: string,
    public createdAt: Date | string,
    public updatedAt: Date | string
  ) {}
}
