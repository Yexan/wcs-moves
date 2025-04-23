import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { DanceMove } from '@features/moves/dance-move.type'
import { movesData } from '@features/moves/moves.mock'

@Injectable({ providedIn: 'root' })
export class MoveService {

  getMoveById(id: string): Observable<DanceMove | null> {
    const move = movesData.find(m => m.id === id) ?? null
    return of(move)
  }
}