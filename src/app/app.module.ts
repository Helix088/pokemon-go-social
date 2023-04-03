import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CommentsComponent } from './comments/comments.component';
import { DropdownDirective } from './dropdown.directive';
import { PostsComponent } from './posts/posts.component';
import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';
import { CommentItemComponent } from './comments/comment-item/comment-item.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostItemComponent } from './posts/post-item/post-item.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CommentsComponent,
    DropdownDirective,
    PostsComponent,
    CommentEditComponent,
    CommentItemComponent,
    CommentListComponent,
    PostEditComponent,
    PostItemComponent,
    PostListComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
