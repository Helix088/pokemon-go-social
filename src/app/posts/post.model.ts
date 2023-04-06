import { Message } from "../messages/message.model";

export class Post {
  constructor(
    public id: string,
    public poster: string,
    public text: string,
    public image?: string,
    public children?: Message[]
  ) {}
}
