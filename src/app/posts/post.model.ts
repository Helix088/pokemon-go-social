export class Post {
  constructor(
    public id: string,
    public poster: string,
    public text: string,
    public image?: string
  ) {}
}
