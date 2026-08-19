import { Routes } from '@angular/router';

import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { adminRoutes } from './features/admin/admin.routes';

export const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayout,
    children: adminRoutes
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },

  {
    path: '**',
    redirectTo: 'admin'
  }

];