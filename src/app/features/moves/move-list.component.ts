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
    .container
      position: relative
      width: 100%
      max-width: 960px
      margin: auto
      padding: 1rem

    .search-input
      width: 100%
      padding: 0.5rem
      margin-bottom: 1rem
      font-size: 1rem
      border: 1px solid #ccc
      border-radius: 0.5rem

    .move-list
      display: flex
      flex-wrap: wrap
      gap: 1rem
      padding: 0
      list-style: none

      & > *
        width: calc(50% - 0.5rem)

        @media (max-width: 490px)
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