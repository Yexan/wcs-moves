import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'

import type { DanceMove } from '@features/moves/dance-move.type'
import { getDanceMoveLevelDisplayName } from '@features/moves/dance-moves-level'

@Component({
  standalone: true,
  selector: 'app-move-card',
  imports: [RouterLink],
  template: `
    <li class="move-card">
      <a [routerLink]="['/moves', move.id]">
        <h2>{{ move.name }}</h2>
        <p class="description">{{ move.description }}</p>
        <ul class="tags">
          @if (move.level) {
            <li class="tag">{{ getDanceMoveLevelDisplayName(move.level) }}</li>
          }
          @if (move.steps) {
            <li class="tag">{{ move.steps }} temps</li>
          }
          @for (tag of move.tags; track tag) {
            <li class="tag">{{ tag }}</li>
          }
        </ul>
      </a>
    </li>
  `,
  styles: `
@use 'mixins' as mixin
@use 'variables' as var

.move-card
  +mixin.wcs-section('h2', 1rem, .7rem 1rem)

.tags
  display: flex
  flex-wrap: wrap
  gap: 0.5rem
  margin-top: 0.5rem
  padding: 0
  list-style: none

.tag
  background-color: var.$gray-medium
  padding: 0.25rem 0.75rem
  border-radius: 3rem
  font-size: 0.8rem

a
  display: block
  +mixin.w-h(100%)
  color: var.$gray-light
  text-decoration: none

.description
  display: -webkit-box
  -webkit-line-clamp: 4
  -webkit-box-orient: vertical
  overflow: hidden
  text-overflow: ellipsis
  max-height: calc(1.2em * 4)
  line-height: 1.2em
  `,
})
export class MoveCardComponent {
  @Input({ required: true }) move!: DanceMove

  getDanceMoveLevelDisplayName = getDanceMoveLevelDisplayName
}