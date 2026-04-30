import { Routes } from '@angular/router';
import { Page01 } from './page-01/page-01';
import { PageError } from './page-error/page-error';
import { Page03 } from './page-03/page-03';
import { Page04 } from './page-04/page-04';
import { todosResolver } from './todos-resolver';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'page-01', component: Page01 },
  { path: 'page-02', loadComponent: () => import('./page-02/page-02').then((m) => m.Page02) },
  // {path:"page-03/",component:Page03},
  { path: 'page-03/:name', component: Page03 },

  { path: 'page-04',
    component: Page04,
    resolve: { todos: todosResolver } ,
    canActivate: [authGuard]
  },

  { path: 'page-error', component: PageError },

  { path: '', redirectTo: '/page-01', pathMatch: 'full' },
  { path: '**', redirectTo: '/page-error' },
];
