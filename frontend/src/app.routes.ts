import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { authGuard } from './app/auth/auth.guard';
import { AuthRedirectGuard } from './app/auth/auth-redirect.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/web/layout/layout.component').then((m) => m.WebLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./app/web/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'post/:postId',
        loadComponent: () =>
          import('./app/web/post-detail/post-detail.component').then(
            (m) => m.PostDetailComponent
          )
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthRedirectGuard],
    loadChildren: () => import('./app/auth/auth.routes')
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: AppLayout,
    loadChildren: () => import('./app/dashboard/dashboard.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
