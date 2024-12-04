import { Routes } from '@angular/router';
import { ShipmentsComponent } from './features/shipments/components/shipments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'shipments', pathMatch: 'full' },
  { path: 'shipments', component: ShipmentsComponent },
  { path: '**', redirectTo: 'shipments' },
];
