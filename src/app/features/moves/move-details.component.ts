import { Component, Input, OnInit, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { Observable, of } from 'rxjs'

import { PartnersConnectionComponent } from '@features/connection/partners-connection/partners-connection.component'
import { MoveService } from '@features/moves/move.service'
import { AuthService } from '@core/auth/auth.service'
import { DanceMove } from '@features/moves/dance-move.type'
import { getDanceMoveLevelDisplayName } from '@features/moves/dance-moves-level'
import { VideoPlayerComponent } from '@features/video/video-player.component'

@Component({
  standalone: true,
  selector: 'app-move-detail',
  imports: [AsyncPipe, RouterLink, PartnersConnectionComponent, VideoPlayerComponent],
  template: `
    <section class="move-details">
      @let move = move$ | async;
      @if (move) {
        <h1>{{ move.category }} - {{ move.name }}</h1>

        @let isAdmin = isAdmin$ | async;
        @if (isAdmin) {
          <a routerLink="/moves/{{ move.id }}/edit" class="edit-link">🖋</a>
          <button (click)="onAskDelete()" class="delete-btn">🗑</button>
        }

        <ul class="tags">
        @if (move.level) {
            <li class="tag">{{ getDanceMoveLevelDisplayName(move.level) }}</li>
          }
          @if (move.steps) {
            <li class="tag">{{ move.steps }} temps</li>
          }
          @for (tag of move.tags; track tag) {
            <li class="tag">{{ tag }}</li>
          }
        </ul>

        <h2>Description</h2>
        <p>{{ move.description }}</p>
        <hr>

        @if (move.videoUrl) {
          <h2>Vidéo</h2>
          <app-video-player [videoId]="move.videoUrl" [title]="move.name" />
          <hr>
        }

        <h2>Connexion</h2>
        <div class="connections">
          <div class="connection">
            <h3>Connexion de départ</h3>
            <app-partners-connection [partnersConnection]="move.startingConnection" />
          </div>
          <div class="connection">
            <h3>Connexion de fin</h3>
            <app-partners-connection [partnersConnection]="move.endingConnection" />
          </div>
        </div>
        <hr>

        @if (showDeleteConfirm) {
          <div class="modal-backdrop" (click)="onCancelDelete()">
            <div class="modal" (click)="stopPropagation($event)">
              <p>Est-tu sûr de vouloir supprimer ce mouvement ?</p>
              <div class="actions">
                <button (click)="onCancelDelete()">Annuler</button>
                <button class="danger" (click)="onConfirmDelete()">Oui, supprimer</button>
              </div>
            </div>
          </div>
        }
      } @else {
        <p>Mouvement non trouvé.</p>
      }
    </section>
  `,
  styles: `
    @use './move-detail'
  `,
})
export class MoveDetailComponent implements OnInit {
  private moveService = inject(MoveService)
  private authService = inject(AuthService)
  private router = inject(Router)

  getDanceMoveLevelDisplayName = getDanceMoveLevelDisplayName

  @Input() id!: string

  protected move$: Observable<DanceMove | null> = of(null)
  protected showDeleteConfirm = false
  protected isAdmin$ = this.authService.isAdmin$


  ngOnInit() {
    this.move$ = this.moveService.getMoveById(this.id)
  }

  onAskDelete() {
    this.showDeleteConfirm = true
  }

  onCancelDelete() {
    this.showDeleteConfirm = false
  }

  onConfirmDelete() {
    this.moveService.deleteMove(this.id).then(() => {
      this.router.navigate(['/moves'])
    })
  }

  stopPropagation(event: Event) {
    event.stopPropagation()
  }
}
