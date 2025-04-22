import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, RouterLink } from '@angular/router'

import { DanceMove } from './dance-move.type'
import { movesData } from './moves.mock'
import { PartnersConnectionComponent } from "../connection/partners-connection/partners-connection.component";
import { Step } from '../steps/step.type'
import { StepComponent } from "../steps/step.component";

@Component({
  standalone: true,
  selector: 'app-move-detail',
  imports: [CommonModule, RouterLink, PartnersConnectionComponent, StepComponent],
  template: `
    <section class="move-details" *ngIf="move">
      <h1>{{ move.name }}</h1>
      <a routerLink="/moves/{{ move.id }}/edit" class="edit-link">🖋</a>

      <ul class="tags">
        <li *ngFor="let tag of move.tags" class="tag">{{ tag }}</li>
      </ul>

      <h2>Description</h2>
      <p>{{ move.description }}</p>

      <hr>

      @if (move.flow) {
        <h2>Flow</h2>
        <p>{{ move.flow }}</p>

        <hr>
      }

      <h2>Connection</h2>
      <div class="connections">
        <div class="connection">
          <h3>Starting Connection</h3>
          <app-partners-connection [partnersConnection]="move.startingConnection" />
        </div>
        <div class="connection">
          <h3>Ending Connection</h3>
          <app-partners-connection [partnersConnection]="move.endingConnection" />
        </div>
      </div>

      <hr>

      <h2>Steps details</h2>
      <p>Steps amount: {{ move.steps }}</p>
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
    </section>

    <p *ngIf="!move">Move not found.</p>
  `,
  styles: `
    @use './move-detail'
  `,
})
export class MoveDetailComponent {
  private route = inject(ActivatedRoute)

  id = this.route.snapshot.paramMap.get('id')
  move: DanceMove | undefined = movesData.find((m) => m.id === this.id)

  getStepDetailsArray(moveStepsAmount: number) {
    return Array.from({ length: moveStepsAmount * 2 }).map((k, i) => i + 1)
  }

  getStepDetailName(stepNumber: number): string {
    return (stepNumber % 2) ? `${(stepNumber + 1) / 2}` : '&'
  }

  getCorrespondingStepDetail(stepNumber: number, stepDetails: Step[] = []) {
    return stepDetails.find((step) => step.timing === stepNumber)
  }
}
