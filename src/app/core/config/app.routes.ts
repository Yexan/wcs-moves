import { Routes } from '@angular/router'

import { AuthGuard } from '@core/auth/auth.guard'

export const routes: Routes = [
  { path: '', redirectTo: 'moves', pathMatch: 'full' },
  {
    path: 'moves',
    loadComponent: () => import('@features/moves/move-list.component').then(m => m.MoveListComponent)
  },
  {
    path: 'moves/new',
    loadComponent: () => import('@features/moves/move-add.component').then(m => m.MoveAddComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'moves/:id',
    loadComponent: () => import('@features/moves/move-details.component').then(m => m.MoveDetailComponent)
  },
  {
    path: 'moves/:id/edit',
    loadComponent: () => import('@features/moves/move-edit.component').then(m => m.MoveEditComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('@core/login/login.component').then(m => m.LoginComponent)
  },
]
