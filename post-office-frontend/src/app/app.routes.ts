import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'shipments', pathMatch: 'full' },
  // { path: 'shipments', component: ShipmentsComponent },
  {
    path: 'shipments',
    loadComponent: () => import('./features/shipments/components/shipments.component').then((c) => c.ShipmentsComponent),
  },
  {
    path: 'post-offices',
    loadComponent: () => import('./features/postOffices/components/post-office.component').then((c) => c.PostOfficeComponent),
  },
  { path: '**', redirectTo: 'shipments' },
];
