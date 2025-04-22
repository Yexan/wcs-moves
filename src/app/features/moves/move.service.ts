import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { movesData } from './moves.mock'
import { DanceMove } from './dance-move.type'

@Injectable({ providedIn: 'root' })
export class MoveService {

  getMoveById(id: string): Observable<DanceMove | null> {
    const move = movesData.find(m => m.id === id) ?? null
    return of(move)
  }
}