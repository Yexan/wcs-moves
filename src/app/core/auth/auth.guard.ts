import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAdmin = await this.authService.isCurrentUserAdmin()
    if (!isAdmin) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}