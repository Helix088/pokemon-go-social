import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  originalPost: Post;
  post: Post;
  editMode: boolean = false;
  id: string;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (params['id'] == null) {
            this.editMode = false;
            return;
          }
          this.originalPost = this.postService.getPost(this.id);

          if( this.originalPost == null) {
            return;
          }
          this.editMode = true;
          this.post = JSON.parse(JSON.stringify(this.originalPost));
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPost = new Post(
      value.id,
      value.poster,
      value.text
    );
    if(this.editMode == true) {
      this.postService.updatePost(this.originalPost, newPost);
    } else {
      this.postService.addPost(newPost);
    }
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
