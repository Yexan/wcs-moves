import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

import type { DanceMove } from './dance-move.type.js'

@Component({
  standalone: true,
  selector: 'app-move-card',
  imports: [CommonModule, RouterLink],
  template: `
    <li class="move-card">
      <a [routerLink]="['/moves', move.id]">
        <h2>{{ move.name }}</h2>
        <p>{{ move.description }}</p>
        <ul class="tags">
          <li *ngFor="let tag of move.tags" class="tag">{{ tag }}</li>
        </ul>
      </a>
    </li>
  `,
  styles: `
    .move-card
      position: relative
      margin-bottom: 1rem
      padding: 1rem
      background-color: #383a42
      border-radius: .4rem
      overflow: hidden

    h2
      margin: -1rem -1rem 0
      padding: 0.7rem 1rem
      font-size: 1rem
      color: #fff
      background-color: #4a5059

    .tags
      display: flex
      flex-wrap: wrap
      gap: 0.5rem
      margin-top: 0.5rem
      padding: 0
      list-style: none

    .tag
      background-color: #4a5059
      padding: 0.25rem 0.75rem
      border-radius: 3rem
      font-size: 0.8rem

    a
      color: #c4c6ce
      text-decoration: none
  `,
})
export class MoveCardComponent {
  @Input({ required: true }) move!: DanceMove
}