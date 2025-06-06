import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { PartnersConnectionEditComponent } from '@features/connection/partners-connection/partners-connection-edit.component'
import { MoveFormBuilderService } from '@features/moves/move-form-builder.service'
import { StepFormGroup } from '@features/steps/step.type'

@Component({
  selector: 'app-step-edit',
  standalone: true,
  imports: [ReactiveFormsModule, PartnersConnectionEditComponent],
  template: `
    @if (step) {
      <div class="step-edit" [formGroup]="step">
        <div class="timing">
          <h3>Timing</h3>
          <input type="number" formControlName="timing" />
        </div>
      </div>
      <div class="step-edit" [formGroup]="step">
        <div class="foot-positions" formGroupName="footPositions">
          <div class="foot-position">
            <h3>Follower</h3>
            <textarea formControlName="follower"></textarea>
          </div>
          <div class="foot-position">
            <h3>Leader</h3>
            <textarea formControlName="leader"></textarea>
          </div>
        </div>
        @let connection = getStepConnection(step, 'connection');
        @if (connection) {
          <div class="partners-connection">
            <app-partners-connection-edit [partnersConnection]="connection" />
          </div>
        }
      </div>
      <div class="step-edit">
        <button type="button" class="remove-step" (click)="removeStep()">Supprimer le pas</button>
      </div>
    } @else {
      <div class="step-edit">
        <p>Aucun pas sélectionné</p>
      </div>
    }
  `,
  styles: `
@use 'mixins' as mixin
@use 'variables' as var

.step-edit
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr))
  grid-gap: 1rem

  & + .step-edit
    margin: 2rem 0

.foot-positions
  display: grid
  grid-auto-rows: 1fr
  gap: .5rem

.foot-position input
  width: 100%
  padding: .5rem
  border-radius: .3rem
  border: none

.partners-connection
  padding: 1rem 0

.timing input
  width: calc(100% - 3rem)
  padding: 0.5rem 1rem
  border-radius: 0.5rem

textarea
  display: block
  width: 100%
  min-height: 6rem
  padding: 0.7rem
  font-size: 1rem
  background-color: var.$gray-light
  border: none
  border-radius: .6rem

.remove-step
  width: calc(100% - 3rem)
  padding: 0.5rem 1rem
  color: var.$white
  background-color: var.$red
  border: none
  border-radius: 0.5rem
  cursor: pointer
  +mixin.tr(background-color)

  &:hover
    background-color: var.$red-dark
  `
})
export class StepEditComponent {
  @Input({ required: true }) step!: StepFormGroup
  @Output() onRemoveStep = new EventEmitter<void>()

  protected getStepConnection = inject(MoveFormBuilderService).getStepConnection

  removeStep() {
    this.onRemoveStep.emit()
  }
}