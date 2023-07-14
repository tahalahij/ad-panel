import { ImageAnimation } from "../components/scheduleModule";

export class FileUploadItem {
  constructor(
    public _id: string,
    public __v: number,
    public path: string,
    public createdAt: string,
    public updatedAt: Date | string | null,
    public ownerId: string,
    public type: "image" | "video" | "audio",
    public name: string,
    public originalName: string,
    public delay?: number,
    public animationName?: ImageAnimation,
    public resetKey?: string
  ) {}
}

export class ScheduleConductor {
  constructor(
    public conductor: string[],
    public ip: string,
    public name: string,
    public operator: string,
    public updatedAt: string | null,
    public __v: number,
    public _id: string
  ) {}
}
