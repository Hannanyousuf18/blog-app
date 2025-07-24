import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { HomeComponent } from './app/pages/home/home.component';
import { authGuard } from './app/auth/auth.guard';
import { WebLayout } from './app/web/layout/web.layout';

// export const appRoutes: Routes = [
//     {
//         path: '',
//         component: AppLayout,
//         children: [
//             { path: '', component: Dashboard },
//             { path: 'post', loadChildren: () => import('./app/post/post.routes') }
//             // { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
//             // { path: 'documentation', component: Documentation },
//             // { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
//         ]
//     },
//     // { path: 'landing', component: Landing },
//     { path: 'notfound', component: Notfound },
//     { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
//     { path: '**', redirectTo: '/notfound' }
// ];
export const appRoutes: Routes = [
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
  },
  {
    path: 'auth',
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
