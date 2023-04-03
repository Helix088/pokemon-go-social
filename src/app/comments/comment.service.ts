import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { map, Subject, switchMap } from 'rxjs';
import { Comment } from '@angular/compiler';

@Injectable({
    providedIn: 'root',
})
export class CommentService implements OnInit {
    comments: Comment[] = [];
    commentListChangedEvent = new Subject<Comment[]>();
    commentChangeEvent = new EventEmitter<Comment[]>();
    maxCommentId: number;

    constructor(
        private http: HttpClient,
    ) {}

    ngOnInit() {}

    getComments() {

    }

    getComment() {

    }

    addComment(comment: Comment) {

    }

    getMaxId() {

    }
}