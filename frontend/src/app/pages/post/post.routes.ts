import { Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { DetailComponent } from './detail/detail.component';

export default [
  { path: '', component: PostComponent },
  { path: ':postId', component: DetailComponent },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
