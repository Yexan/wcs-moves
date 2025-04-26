import { Injectable, inject } from '@angular/core'
import { Auth, authState, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth'
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore'
import { switchMap, map, shareReplay, firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth)
  private firestore = inject(Firestore)

  user$ = authState(this.auth)

  isAdmin$ = this.user$.pipe(
    switchMap(user => this.getOrCreateUser(user?.uid ?? '')),
    map(userData => userData.isAdmin),
    shareReplay(1)
  )

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(this.auth, provider)
  }

  async logout(): Promise<void> {
    await this.auth.signOut()
  }

  private async getOrCreateUser(uid: string): Promise<{ isAdmin: boolean }> {
    console.log('getOrCreateUser', uid)
    if (!uid) return { isAdmin: false }

    const userRef = doc(this.firestore, `users/${uid}`)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as { isAdmin: boolean }
    } else {
      await setDoc(userRef, { isAdmin: false })
      return { isAdmin: false }
    }
  }

  async isCurrentUserAdmin(): Promise<boolean> {
    return firstValueFrom(this.isAdmin$)
  }
}