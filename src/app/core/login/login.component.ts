import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { Router } from '@angular/router'

import { AuthService } from '@core/auth/auth.service'


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [AsyncPipe],
  template: `
    <section>
      @let user = user$ | async;

      @if (user) {
        <h1>Se déconnecter</h1>
        <div class="action">
          <button (click)="logout()">Se déconnecter</button>
        </div>
      } @else {
        <h1>Connexion</h1>
        <div class="action">
          <button (click)="login()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span>Connexion avec Google</span>
          </button>
        </div>
      }
    </section>
  `,
  styles: `
    @use 'mixins' as mixin
    @use 'variables' as var

    :host
      position: relative
      display: block
      padding: 1rem

    section
      +mixin.wcs-section

    .action
      +mixin.flex-column-center
      min-height: mixin.pxInRem(300)

    button
      +mixin.flex-row-center
      padding: .7rem 1rem
      color: #1f1f1f
      font-size: .8rem
      background-color: #f2f2f2
      border: none
      border-radius: 0.5rem
      cursor: pointer

      svg
        +mixin.w-h(mixin.pxInRem(20))
        margin-right: mixin.pxInRem(12)
  `,
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  protected user$ = this.authService.user$

  login() {
    this.authService.loginWithGoogle().then(
      () => this.router.navigate(['/'])
    )
  }
  logout() {
    this.authService.logout().then(
      () => this.router.navigate(['/'])
    )
  }
}