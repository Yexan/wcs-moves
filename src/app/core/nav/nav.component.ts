import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [RouterModule],
  template: `
    <nav class="nav">
      <ul>
        <li>
          <a routerLink="/moves" routerLinkActive="active">Moves</a>
        </li>
        <li>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </li>
      </ul>
    </nav>
  `,
  styles: `
@use '../styles/mixins' as mixin
@use '../styles/variables' as var

.nav
  position: fixed
  +mixin.top-left
  width: 100%
  background: var.$gray-dark
  z-index: 100

ul
  +mixin.flex-row-left
  flex-wrap: wrap
  +mixin.wrapper(mixin.pxInRem(960))
  padding: 0
  list-style: none

li
  +mixin.flex-column-center

a
  padding: 1rem 1.5rem
  color: var.$white
  text-decoration: none
  border-bottom: 2px solid transparent
  +mixin.tr

  &.active,
  &:hover,
  &:focus
    color: var.$highlight
    border-bottom: 2px solid var.$highlight
  `
})
export class AppNavComponent { }