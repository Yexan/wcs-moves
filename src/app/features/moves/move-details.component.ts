import { Component, Input, OnInit, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { Observable, of } from 'rxjs'

import { PartnersConnectionComponent } from '@features/connection/partners-connection/partners-connection.component'
import { StepComponent } from '@features/steps/step.component'
import { MoveService } from '@features/moves/move.service'
import { AuthService } from '@core/auth/auth.service'
import { DanceMove } from '@features/moves/dance-move.type'
import { Step } from '@features/steps/step.type'

@Component({
  standalone: true,
  selector: 'app-move-detail',
  imports: [AsyncPipe, RouterLink, PartnersConnectionComponent, StepComponent],
  template: `
    <section class="move-details">
      @let move = move$ | async;
      @if (move) {
        <h1>{{ move.name }}</h1>

        @let isAdmin = isAdmin$ | async;
        @if (isAdmin) {
          <a routerLink="/moves/{{ move.id }}/edit" class="edit-link">🖋</a>
          <button (click)="onAskDelete()" class="delete-btn">🗑</button>
        }

        <ul class="tags">
          @for (tag of move.tags; track tag) {
            <li class="tag">{{ tag }}</li>
          }
        </ul>

        <h2>Description</h2>
        <p>{{ move.description }}</p>
        <hr>

        @if (move.flow) {
          <h2>Flow</h2>
          <p>{{ move.flow }}</p>
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

        <h2>Détails des pas</h2>
        <p>Nombre de temps : {{ move.steps }}</p>
        <div class="step-details">
          @for (step of getStepDetailsArray(move.steps); track step) {
            <div class="step-detail">
              <span class="step-number">{{ getStepDetailName(step) }}</span>
              @let stepDetail = getCorrespondingStepDetail(step, move.stepDetails);
              @if (!!stepDetail) {
                <app-step [step]="stepDetail" />
              }
            </div>
          }
        </div>

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

  @Input() id!: string

  protected move$: Observable<DanceMove | null> = of(null)
  protected showDeleteConfirm = false
  protected isAdmin$ = this.authService.isAdmin$

  ngOnInit() {
    this.move$ = this.moveService.getMoveById(this.id)
  }

  getStepDetailsArray(moveStepsAmount: number) {
    return Array.from({ length: moveStepsAmount * 2 }).map((k, i) => i + 1)
  }

  getStepDetailName(stepNumber: number): string {
    return (stepNumber % 2) ? `${(stepNumber + 1) / 2}` : '&'
  }

  getCorrespondingStepDetail(stepNumber: number, stepDetails: Step[] = []) {
    return stepDetails.find((step) => step.timing === stepNumber)
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
