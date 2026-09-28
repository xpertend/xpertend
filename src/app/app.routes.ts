import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Xpertend',
        loadComponent: () => import('./home/home').then((module) => module.Home),
      },
      {
        path: 'ca-xpertend',
        title: 'CA Xpertend | Xpertend',
        loadComponent: () =>
          import('./ca-xpertend/ca-xpertend').then((module) => module.CaXpertend),
      },
      {
        path: 'astrology-xpertend',
        title: 'Astrology Xpertend | Xpertend',
        loadComponent: () =>
          import('./astrology-xpertend/astrology-xpertend').then(
            (module) => module.AstrologyXpertend,
          ),
      },
      {
        path: 'heavy-xpertend',
        title: 'Heavy Earth Moving Vehicle Connect | Xpertend',
        loadComponent: () =>
          import('./heavy-xpertend/heavy').then((module) => module.HeavyXpertend),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
