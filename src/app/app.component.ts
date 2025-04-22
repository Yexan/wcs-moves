import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AppNavComponent } from "./core/nav/nav.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppNavComponent],
  template: `
  <app-nav />
  <router-outlet />
  `,
})
export class AppComponent { }