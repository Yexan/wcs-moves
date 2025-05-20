import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormArray, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, map, of, shareReplay, startWith, switchMap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { PartnersConnectionEditComponent } from '@features/connection/partners-connection/partners-connection-edit.component'
import { StepEditComponent } from '@features/steps/step-edit.component'
import { MoveService } from '@features/moves/move.service'
import { MoveFormBuilderService } from '@features/moves/move-form-builder.service'
import { DanceMove, DanceMoveFormGroup } from '@features/moves/dance-move.type'
import { StepFormGroup } from '@features/steps/step.type'


@Component({
  selector: 'app-move-edit',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, PartnersConnectionEditComponent, StepEditComponent],
  template: `
    <section class="move-details-edit">
      <h1>Édition d'un mouvement</h1>

      @let move = move$ | async;
      @let form = form$ | async;

      @if (!form || !move) {
        <p>🚫 Mouvement non trouvé.</p>
      } @else {
        <form [formGroup]="form!" (ngSubmit)="onSubmit(form)">
          <label>
            <span>Nom</span>
            <input formControlName="name" />
          </label>

          <label>
            <span>Description</span>
            <textarea formControlName="description"></textarea>
          </label>

          <hr>

          <h2>Connexion</h2>
          <div class="connections">
            @let startGroup = getConnectionGroup(form, 'startingConnection');
            @if (startGroup) {
              <div class="connection">
                <h3>Connexion de départ</h3>
                <app-partners-connection-edit [partnersConnection]="startGroup" />
              </div>
            }
            @let endGroup = getConnectionGroup(form, 'endingConnection');
            @if (endGroup) {
              <div class="connection">
                <h3>Connexion de fin</h3>
                <app-partners-connection-edit [partnersConnection]="endGroup" />
              </div>
            }
          </div>

          <label>
            <span>Nombre de temps :</span>
            <input
              type="number"
              min="1"
              formControlName="steps"
            />
          </label>

          <h2>Détail des pas</h2>
          <div class="step-details">
            @let timingSteps = timingSteps$ | async;
            @for (timing of timingSteps; track timing) {
              <div class="step-detail-edit">
                <span class="step-number">{{ getStepDetailName(timing) }}</span>
                @let stepDetail = getStepDetailFormByTiming(form, timing);
                @if (stepDetail !== null) {
                  <app-step-edit [step]="stepDetail" (onRemoveStep)="removeStep(form, stepDetail)" />
                } @else {
                  <button class="add-step" type="button" (click)="addStep(form, timing)">
                    ➕ Ajouter un pas ici
                  </button>
                }
              </div>
            }
          </div>

          <label class="checkbox">
            <span>Initiative de follower ?</span>
            <input type="checkbox" formControlName="isFollowerInitiative" />
          </label>

          <div class="form-actions">
            <button type="button" (click)="goBack()">❌ Annuler</button>
            <button type="submit" [disabled]="form!.invalid">💾 Sauvegarder</button>
          </div>
        </form>
      }
    </section>
  `,
  styles: `
@use 'mixins' as mixin
@use 'variables' as var
@use './move-detail'

label
  display: block
  margin: 1rem 0 3rem

  span
    display: block
    margin: 1rem 0
    font-size: 1.2rem
    cursor: pointer

input, textarea
  display: block
  width: 100%
  padding: 0.7rem
  font-size: 1rem
  background-color: var.$gray-light
  border: none
  border-radius: .6rem

.checkbox
  +mixin.flex-column-top-left
  gap: 0.5rem

  input
    width: fit-content

.form-actions
  display: flex
  gap: 1rem
  justify-content: flex-end

  button
    padding: 0.5rem 1rem
    border: none
    border-radius: 4px
    color: var.$white
    font-weight: bold
    background-color: var.$gray-medium
    +mixin.tr(background-color)
    cursor: pointer

    &[type='submit']:hover
      background-color: var.$highlight

    &:hover
      background-color: var.$gray-darker

    &:disabled,
    &:disabled:hover
      background-color: var.$gray-light
      cursor: not-allowed


.add-step
  max-width: fit-content
  max-height: fit-content
  align-self: center
  cursor: pointer
  `
})
export class MoveEditComponent implements OnInit {
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)
  private moveService = inject(MoveService)
  private moveFormBuilder = inject(MoveFormBuilderService)

  @Input() id!: string

  protected move$: Observable<DanceMove | null> = of(null)
  protected form$: Observable<DanceMoveFormGroup | null> = of(null)
  protected timingSteps$: Observable<number[]> = of([])

  protected getConnectionGroup = this.moveFormBuilder.getConnectionGroup

  ngOnInit(): void {
    this.move$ = this.moveService.getMoveById(this.id)
    this.form$ = this.move$.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(move => move ? this.moveFormBuilder.createDanceMoveForm(move) : null),
      shareReplay(1)
    )

    this.timingSteps$ = this.form$.pipe(
      switchMap(form => {
        if (!form) return of([])
        return form.controls.steps.valueChanges.pipe(
          startWith(form.controls.steps.value),
          map((steps) => this.getTimingStepsArray(steps ?? 0))
        )
      }),
      takeUntilDestroyed(this.destroyRef),
    )
  }

  getStepFormArray(form: DanceMoveFormGroup) {
    return form.get('stepDetails') as FormArray<StepFormGroup>
  }

  getTimingStepsArray(moveStepsAmount: number): number[] {
    return Array.from({ length: moveStepsAmount * 2 }).map((_, i) => i + 1)
  }

  getStepDetailFormByTiming(form: DanceMoveFormGroup, timing: number) {
    const stepDetails = this.getStepFormArray(form)
    return stepDetails?.controls.find(ctrl => ctrl.value.timing === timing) ?? null
  }

  getStepDetailName(stepNumber: number): string {
    return (stepNumber % 2) ? `${(stepNumber + 1) / 2}` : '&'
  }

  addStep(form: DanceMoveFormGroup, timing: number) {
    const stepDetails = this.getStepFormArray(form)
    const alreadyExists = stepDetails.controls.some(
      ctrl => ctrl.get('timing')?.value === timing
    )
    if (alreadyExists) return

    const newStepForm = this.moveFormBuilder.createEmptyStepForm(timing)
    stepDetails.push(newStepForm)
  }

  removeStep(form: DanceMoveFormGroup, stepDetail: StepFormGroup) {
    const stepDetails = this.getStepFormArray(form)
    const index = stepDetails.controls.indexOf(stepDetail)
    if (index !== -1) {
      stepDetails.removeAt(index)
    }
  }

  onSubmit(form: DanceMoveFormGroup) {
    if (form.valid) {
      const updatedMove: Partial<DanceMove> = {
        ...form.getRawValue(),
        updatedAt: new Date().toISOString(),
      }
      this.moveService.updateMove(this.id, updatedMove)
      console.log('✅ Move updated:', updatedMove)
      this.goBack()
    }
  }

  goBack() {
    this.router.navigate(['/moves'])
  }
}
