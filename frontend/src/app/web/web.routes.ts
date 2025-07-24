import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

export default [
  { path: '', component: HomeComponent },
  { path: 'post/:postId', component: PostDetailComponent },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
