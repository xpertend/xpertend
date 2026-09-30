import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Xpertend | Expert Offline Coordination Desk',
    loadComponent: () => import('./home/home').then((module) => module.Home),
  },
  {
    path: 'admin',
    title: 'Xpertend | Admin Requests',
    loadComponent: () => import('./admin/admin').then((module) => module.Admin),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
