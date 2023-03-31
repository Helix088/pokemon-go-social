import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommentsComponent } from "./comments/comments.component";
import { CommentEditComponent } from "./comments/comment-edit/comment-edit.component";
import { PostsComponent } from "./posts/posts.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      { path: 'new', component: PostEditComponent },
      { path: ':id/edit', component: PostEditComponent },
    ],
  },
  {
    path: 'comments',
    component: CommentsComponent,
    children: [
      { path: 'new', component: CommentEditComponent },
      { path: ':id/edit', component: CommentEditComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    
}