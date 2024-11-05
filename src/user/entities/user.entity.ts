import { IUser } from "@/user/entities/user.interface";
import { generateId } from "@/utils/generateId";

export class User implements IUser {
  public updatedAt = new Date();
  public createdAt: Date;
  public id: string;
  public version: number;

  constructor(
    public login: string,
    public password: string,
    id?: string,
    createdAt?: Date,
    version?: number,
  ) {
    this.id = id ?? generateId();
    this.createdAt = createdAt ?? new Date();
    this.version = version ?? 1;
  }
}
