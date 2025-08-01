import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';

export default [
  { path: '', component: Dashboard },
  { path: 'post', loadChildren: () => import('./post/post.routes') },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
