import { Component, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { MoveCardComponent } from './move-card.component'
import { movesData } from './moves.mock'

@Component({
  standalone: true,
  selector: 'app-move-list',
  imports: [CommonModule, FormsModule, MoveCardComponent],
  template: `
    <div class="container">
      <input
        class="search-input"
        type="text"
        placeholder="Search moves..."
        [(ngModel)]="search"
      />

      <ul class="move-list">
        <app-move-card
          *ngFor="let move of filteredMoves()"
          [move]="move"
        />
      </ul>
    </div>
  `,
  styles: `
@use '../../core/styles/mixins' as mixin
@use '../../core/styles/variables' as var

.container
  position: relative
  +mixin.wrapper(mixin.pxInRem(960))
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
  private readonly _search = signal('')

  get search(): string {
    return this._search()
  }

  set search(value: string) {
    this._search.set(value)
  }

  private readonly allMoves = signal(movesData)

  protected filteredMoves = computed(() =>
    this.allMoves().filter((move) => {
      const query = this.search.toLowerCase()
      return (
        move.name.toLowerCase().includes(query) ||
        move.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })
  )
}