import { Component, OnInit} from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  selectedPost: Post;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.postSelectedEvent.subscribe(
      (post: Post) => {
        this.selectedPost = post;
      }
    )
  }
}
