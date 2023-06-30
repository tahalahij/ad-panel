export type USER_ROLE = "ADMIN" | "OPERATOR" | "CONTROLLER";

export class User {
  constructor(
    public _id: string,
    public __v: number,
    public name: string,
    public username: string,
    public createdAt: string,
    public updatedAt: Date | string | null,
    public role: USER_ROLE,
    public ip: string,
    public mac: string
  ) {}
}
