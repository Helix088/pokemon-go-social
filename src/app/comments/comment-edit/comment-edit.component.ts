import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css'],
})
export class CommentEditComponent implements OnInit {
  @ViewChild('commenter') commenterInputRef: ElementRef;
  @ViewChild('comment') commentInputRef: ElementRef;

  constructor(private commentService: CommentService) {
    
  }

  onSendComment() {
    const ingCommenter = this.commenterInputRef.nativeElement.value;
    const ingComment = this.commentInputRef.nativeElement.value;
    const newComment = new Comment(
      '1',
      ingComment,
      ingCommenter,
    );
    // this.commentService.addComment(newComment);
  }

  onClear() {
    this.commentInputRef.nativeElement.value = "";
    this.commenterInputRef.nativeElement.value = "";
  }

  ngOnInit() {

  }
}
