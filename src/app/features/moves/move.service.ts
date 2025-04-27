import { Injectable, inject } from '@angular/core'
import { Observable, map, shareReplay } from 'rxjs'

import { DanceMove } from '@features/moves/dance-move.type'
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore'

@Injectable({ providedIn: 'root' })
export class MoveService {
  firestore = inject(Firestore)
  danceMoves = collection(this.firestore, 'danceMoves')

  moves$ = collectionData(this.danceMoves, { idField: 'id' }).pipe(
    map((moves) => moves as DanceMove[]),
    map((moves) => moves.sort((a, b) => a.name.localeCompare(b.name))),
    shareReplay(1)
  )

  getMoveById(id: string): Observable<DanceMove | null> {
    return this.moves$.pipe(
      map((moves) => moves.find((move) => move.id === id) || null)
    )
  }

  async addMove(move: Partial<DanceMove>): Promise<void> {
    await addDoc(this.danceMoves, move)
  }

  async updateMove(id: string, move: Partial<DanceMove>): Promise<void> {
    const moveRef = doc(this.danceMoves, id)
    await updateDoc(moveRef, move)
  }

  async deleteMove(id: string): Promise<void> {
    const moveRef = doc(this.danceMoves, id)
    await deleteDoc(moveRef)
  }
}