import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private subscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.subscription = this.postService.postListChangedEvent.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.getPosts();
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
