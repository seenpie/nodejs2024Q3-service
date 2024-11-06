import { IUser } from "@/user/entities/user.interface";
import { generateId } from "@/utils/generateId";

export class User implements IUser {
  public updatedAt = new Date();
  public createdAt = new Date();
  public id = generateId();
  public version = 1;

  constructor(public login: string, public password: string) {}
}
