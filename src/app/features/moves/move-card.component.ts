import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'

import type { DanceMove } from '@features/moves/dance-move.type'

@Component({
  standalone: true,
  selector: 'app-move-card',
  imports: [RouterLink],
  template: `
    <li class="move-card">
      <a [routerLink]="['/moves', move.id]">
        <h2>{{ move.name }}</h2>
        <p>{{ move.description }}</p>
        <ul class="tags">
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
  `,
})
export class MoveCardComponent {
  @Input({ required: true }) move!: DanceMove
}