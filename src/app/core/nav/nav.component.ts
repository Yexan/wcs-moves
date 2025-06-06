import { Component, inject } from "@angular/core"
import { RouterModule } from "@angular/router"
import { AsyncPipe } from "@angular/common"

import { AuthService } from "@core/auth/auth.service"

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [AsyncPipe, RouterModule],
  template: `
    <nav class="nav">
      <ul>
        <li>
          <a routerLink="/moves" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Moves</a>
        </li>
        @let isAdmin = isAdmin$ | async;
        @if (isAdmin) {
          <li>
            <a routerLink="/moves/new" routerLinkActive="active">Ajouter un move</a>
          </li>
        }
        <li>
          <a routerLink="/login" routerLinkActive="active">Connexion</a>
        </li>
      </ul>
    </nav>
  `,
  styles: `
@use 'mixins' as mixin
@use 'variables' as var

.nav
  position: fixed
  +mixin.top-left
  width: 100%
  background: var.$gray-dark
  z-index: 100

ul
  +mixin.flex-row-left
  flex-wrap: wrap
  +mixin.wrapper
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
export class AppNavComponent {
  private authService = inject(AuthService)
  protected isAdmin$ = this.authService.isAdmin$
}