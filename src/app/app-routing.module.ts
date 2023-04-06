import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { JournalComponent } from './journal/journal.component';
import { JournalEditComponent } from './journal/journal-edit/journal-edit.component';
import { JournalDetailComponent } from './journal/journal-detail/journal-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      { path: 'new', component: PostEditComponent },
      { path: ':id', component: PostDetailComponent },
      { path: ':id/edit', component: PostEditComponent },
    ],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    children: [
      { path: 'new', component: PostEditComponent },
      { path: ':id', component: PostEditComponent },
      { path: ':id/edit', component: PostEditComponent },
    ],
  },
  {
    path: 'journals',
    component: JournalComponent,
    children: [
      { path: 'new', component: JournalEditComponent },
      { path: ':id', component: JournalDetailComponent },
      { path: ':id/edit', component: JournalEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
