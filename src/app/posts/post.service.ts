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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  getPosts() {
    
    this.http.get<{message: string; posts: Post[]}>('http://localhost:3000/posts').subscribe(
      (posts) => {
        console.log(posts);
        this.posts = posts.posts;
        this.maxPostId = this.getMaxId();
        this.postListChangedEvent.next(this.posts.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getPost(index: string) {
    return this.posts[index];
  }

  addPost(post: Post) {
    if (!post) {
      return;
    }

    post.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; posts: Post }>(
        'http://localhost:3000/posts',
        post,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.posts.push(responseData.posts);
      });
  }

  updatePost(originalPost: Post, newPost: Post) {
    if (!originalPost || !newPost) {
      return;
    }

    const pos = this.posts.findIndex((p) => p.id === originalPost.id);

    if (pos < 0) {
      return;
    }

    newPost.id = originalPost.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/posts/' + originalPost.id, newPost, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.posts[pos] = newPost;
      });
  }

  deletePost(post: Post) {
    if (!post) {
      return;
    }

    const pos = this.posts.findIndex((p) => p.id === post.id);

    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/posts/' + post.id)
      .subscribe((response: Response) => {
        this.posts.splice(pos, 1);
      });
  }

  getMaxId() {
    let maxId = 0;
    if (this.posts) {
      for (const post of this.posts) {
        // this.posts[post];
        const currentId = Number(post.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    }
    return maxId;
  }
}