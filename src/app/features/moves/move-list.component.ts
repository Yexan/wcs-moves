import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map } from 'rxjs'

import { MoveCardComponent } from '@features/moves/move-card.component'
import { MoveService } from '@features/moves/move.service'
import { DanceMoveLevel, danceMoveLevels, getDanceMoveLevelDisplayName } from '@features/moves/dance-moves-level'

@Component({
  standalone: true,
  selector: 'app-move-list',
  imports: [MoveCardComponent, AsyncPipe],
  template: `
    <div class="container">

      <div class="level-filters">
        <label class="level-filter-option">
          <input
            type="radio"
            name="levelFilter"
            value="all"
            [checked]="(levelFilter$ | async) === 'all'"
            (change)="onLevelFilterUpdated('all')"
          />
          <span>Tous</span>
        </label>

        @for (level of danceMoveLevels; track level) {
          <label class="level-filter-option">
            <input
              type="radio"
              name="levelFilter"
              [value]="level"
              [checked]="(levelFilter$ | async) === level"
              (change)="onLevelFilterUpdated(level)"
            />
            <span>{{ getDanceMoveLevelDisplayName(level) }}</span>
          </label>
        }
      </div>

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

.level-filters
  display: flex
  justify-content: center
  gap: 0.5rem
  margin-bottom: 1rem
  flex-wrap: wrap

.level-filter-option
  display: flex
  align-items: center
  padding: 0.5rem 1rem
  border: 1px solid var.$gray-ccc
  border-radius: 0.5rem
  cursor: pointer
  transition: all 0.2s ease
  background-color: white

  &:hover
    background-color: var.$gray-lighter

  input[type="radio"]
    position: absolute
    opacity: 0
    pointer-events: none

  input[type="radio"]:checked + span
    font-weight: bold

  &:has(input[type="radio"]:checked)
    background-color: var.$gray-dark
    color: white
    border-color: var.$gray-dark

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
  protected levelFilter$ = new BehaviorSubject<DanceMoveLevel | 'all'>('all')

  protected danceMoveLevels = danceMoveLevels
  protected getDanceMoveLevelDisplayName = getDanceMoveLevelDisplayName

  protected filteredMoves$ = combineLatest([
    this.moves$,
    this.searchQuery$.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ),
    this.levelFilter$
  ]).pipe(
    map(([moves, search, levelFilter]) => {
      const trimmedSearch = search.trim().toLowerCase()

      let filteredMoves = moves

      if (levelFilter !== 'all') {
        filteredMoves = filteredMoves.filter(move => move.level === levelFilter)
      }

      if (!trimmedSearch) return filteredMoves

      const searchWords = trimmedSearch.split(/\s+/)

      return filteredMoves.filter(move => {
        const searchableFields = [
          move.category,
          move.name,
          move.description ?? '',
          move.level ? getDanceMoveLevelDisplayName(move.level) : '',
          move.steps ?? '',
          move.teacher ?? '',
          move.location ?? '',
          ...(move.tags ?? [])
        ].join(' ').toLowerCase()

        return searchWords.every(word => searchableFields.includes(word))
      })
    })
  )

  onSearchUpdated(sq: string) {
    this.searchQuery$.next(sq)
  }

  onLevelFilterUpdated(level: DanceMoveLevel | 'all') {
    this.levelFilter$.next(level)
  }
}