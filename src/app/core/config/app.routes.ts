import { Routes } from '@angular/router'

import { AuthGuard } from '@core/auth/auth.guard'
import { LoginComponent } from '@core/login/login.component'
import { MoveListComponent } from '@features/moves/move-list.component'
import { MoveDetailComponent } from '@features/moves/move-details.component'
import { MoveEditComponent } from '@features/moves/move-edit.component'
import { MoveAddComponent } from '@features/moves/move-add.component'

export const routes: Routes = [
  { path: '', redirectTo: 'moves', pathMatch: 'full' },
  { path: 'moves', component: MoveListComponent },
  { path: 'moves/new', component: MoveAddComponent, canActivate: [AuthGuard] },
  { path: 'moves/:id', component: MoveDetailComponent },
  { path: 'moves/:id/edit', component: MoveEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
]
