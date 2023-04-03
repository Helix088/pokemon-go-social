import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy{
  comments: Comment[] = [];
  private subscription: Subscription;

  constructor(private commentService: CommentService) {}

  onAddComment(comment: Comment) {
    this.comments.push(comment);
  }

  ngOnInit() {
    // this.subscription = this.commentService.commentListChangedEvent.subscribe(
    //   (comments: Comment[]) => {
    //     this.comments = comments;
    //   }
    // );
    // this.commentService.getComments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
