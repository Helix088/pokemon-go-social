import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  posts: Post[] = [];
  postListChangedEvent = new Subject<Post[]>();
  postChangedEvent = new EventEmitter<Post[]>();
  postSelectedEvent = new EventEmitter<Post[]>();
  maxPostId: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getPosts() {}

  getPost(index: string) {
    return this.posts[index];
  }

  addPost(post: Post) {}

  updatePost(originalPost: Post, newPost: Post) {}

  deletePost(post: Post) {}

  getMaxId() {
    let maxId = 0;
    if (this.posts) {
      for (const post of this.posts) {
        const currentId = Number(post.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    }
    return maxId;
  }
}