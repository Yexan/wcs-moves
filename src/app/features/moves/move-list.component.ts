import { Component, computed, inject, signal } from '@angular/core'
import { AsyncPipe } from '@angular/common'

import { MoveCardComponent } from '@features/moves/move-card.component'
import { MoveService } from './move.service'
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs'

@Component({
  standalone: true,
  selector: 'app-move-list',
  imports: [MoveCardComponent, AsyncPipe],
  template: `
    <div class="container">

      <input
        #searchQueryInput
        type="text"
        class="search-input"
        (input)="onSearchUpdated(searchQueryInput.value)"
      />

      <ul class="move-list">
        @for (move of (filteredMoves$ | async); track move.id) {
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
  private moves$ = inject(MoveService).moves$
  private searchQuery$ = new BehaviorSubject('')

  protected filteredMoves$ = combineLatest([
    this.moves$,
    this.searchQuery$.pipe(
      debounceTime(250)
    )
  ]).pipe(
    map(([moves, search]) => {
      const trimmedSearch = search.trim().toLowerCase()

      if (!trimmedSearch) return moves

      const searchWords = trimmedSearch.split(/\s+/)

      return moves.filter(move => {
        const searchableFields = [
          move.name,
          move.description ?? '',
          move.flow ?? '',
          ...(move.tags ?? [])
        ].join(' ').toLowerCase()

        return searchWords.every(word => searchableFields.includes(word))
      })
    })
  )

  onSearchUpdated(sq: string) {
    this.searchQuery$.next(sq)
  }
}