import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import { PostsComponent } from './posts/posts.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostItemComponent } from './posts/post-item/post-item.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { JournalComponent } from './journal/journal.component';
import { JournalEditComponent } from './journal/journal-edit/journal-edit.component';
import { JournalDetailComponent } from './journal/journal-detail/journal-detail.component';
import { JournalListComponent } from './journal/journal-list/journal-list.component';
import { JournalItemComponent } from './journal/journal-item/journal-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PostsComponent,
    PostEditComponent,
    PostItemComponent,
    PostListComponent,
    PostDetailComponent,
    MessagesComponent,
    MessageEditComponent,
    MessageItemComponent,
    MessageListComponent,
    JournalComponent,
    JournalEditComponent,
    JournalDetailComponent,
    JournalListComponent,
    JournalItemComponent
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
