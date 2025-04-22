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
    .nav
      display: flex
      gap: 1rem
      padding: 1rem
      background: #383a42

    ul
      display: flex
      width: 100%
      max-width: 960px
      margin: auto
      padding: 0
      gap: 1.5rem
      list-style: none

    a
      text-decoration: none
      color: #fff

    .active
      color: #ffcc00
      font-weight: bold
      border-bottom: 2px solid #ffcc00
  `
})
export class AppNavComponent { }