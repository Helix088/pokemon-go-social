import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  posts: Post[] = [new Post('', '', '', '')];
  id: string;
  nativeWindow: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.post = this.postService.getPost(this.id);
      }
    );
  }

  onView() {
    if(this.post.image) {
      this.nativeWindow.open(this.post.image);
    }
  }

  onDelete() {
    this.postService.deletePost(this.post);
    this.router.navigateByUrl('/');
  }
}
