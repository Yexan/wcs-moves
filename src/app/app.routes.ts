import { Routes } from '@angular/router'
import { MoveListComponent } from './features/moves/move-list.component'
import { MoveDetailComponent } from './features/moves/move-details.component'
import { MoveEditComponent } from './features/moves/move-edit.component'

export const routes: Routes = [
  { path: '', redirectTo: 'moves', pathMatch: 'full' },
  { path: 'moves', component: MoveListComponent },
  { path: 'moves/:id', component: MoveDetailComponent },
  { path: 'moves/:id/edit', component: MoveEditComponent },
]
