import { Routes } from '@angular/router';
import { PostComponent } from './post.component';

export default [
  { path: '', component: PostComponent },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
