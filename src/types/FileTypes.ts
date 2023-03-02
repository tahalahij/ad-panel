export class FileUploadItem {
  constructor(
    public _id: string,
    public __v: number,
    public path: string,
    public createdAt: string,
    public updatedAt: Date | string | null,
    public ownerId: string,
    public type: "image" | "video" | "audio"
  ) {}
}

export class ScheduleConductor {
  constructor(
    public conductor: string[],
    public ip: string,
    public operator: string,
    public updatedAt: string | null,
    public __v: number,
    public _id: string
  ) {}
}
