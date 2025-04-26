import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { MoveCardComponent } from '@features/moves/move-card.component'
import { MoveService } from './move.service'

@Component({
  standalone: true,
  selector: 'app-move-list',
  imports: [FormsModule, MoveCardComponent, AsyncPipe],
  template: `
    <div class="container">
      <ul class="move-list">
        @for (move of (moves$ | async); track move.id) {
          <app-move-card [move]="move" />
        }
      </ul>
    </div>
  `,
  styles: `
@use 'mixins' as mixin
@use 'variables' as var

.container
  position: relative
  +mixin.wrapper
  padding: 1rem

.search-input
  width: 100%
  margin-bottom: 1rem
  padding: 0.5rem
  font-size: 1rem
  border: 1px solid var.$gray-ccc
  border-radius: 0.5rem

.move-list
  display: flex
  flex-wrap: wrap
  gap: 1rem
  padding: 0
  list-style: none

  & > *
    width: calc(50% - 0.5rem)

    @media (max-width: mixin.pxInRem(490))
      width: 100%
  `,
})
export class MoveListComponent {
  protected moves$ = inject(MoveService).moves$
}