import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { PartnersConnectionEditComponent } from '@features/connection/partners-connection/partners-connection-edit.component'
import { MoveService } from '@features/moves/move.service'
import { MoveFormBuilderService } from '@features/moves/move-form-builder.service'
import { DanceMove, DanceMoveFormGroup } from '@features/moves/dance-move.type'
import { getDanceMoveLevelDisplayName, danceMoveLevels } from '@features/moves/dance-moves-level'
import { fromSheets } from './moves.mock-2'


@Component({
  selector: 'app-move-add',
  standalone: true,
  imports: [ReactiveFormsModule, PartnersConnectionEditComponent],
  template: `
    <section class="move-details-edit">
      <h1>Ajouter un move</h1>

      @if (form) {
        <form [formGroup]="form" (ngSubmit)="onSubmit(form)">

          <label>
            <span>Catégorie</span>
            <input formControlName="category" />
          </label>

          <label>
            <span>Nom</span>
            <input formControlName="name" />
          </label>

          <label>
            <span>Niveau</span>
            <select formControlName="level">
              @for (level of danceMoveLevels; track level) {
                <option [value]="level">{{ getDanceMoveLevelDisplayName(level) }}</option>
              }
            </select>
          </label>

          <hr>

          <label>
            <span>Description</span>
            <textarea formControlName="description"></textarea>
          </label>

          <hr>

          <label>
            <span>Nombre de temps:</span>
            <input
              type="number"
              min="1"
              formControlName="steps"
            />
          </label>

          <hr>

          <label>
            <span>URL de la vidéo YouTube (ID)</span>
            <input type="text" formControlName="videoUrl" />
          </label>

          <hr>

          <h2>Connection</h2>
          <div class="connections">
            @let startGroup = getConnectionGroup(form, 'startingConnection');
            @if (startGroup) {
              <div class="connection">
                <h3>Connection de départ</h3>
                <app-partners-connection-edit [partnersConnection]="startGroup" />
              </div>
            }
            @let endGroup = getConnectionGroup(form, 'endingConnection');
            @if (endGroup) {
              <div class="connection">
                <h3>Connection de fin</h3>
                <app-partners-connection-edit [partnersConnection]="endGroup" />
              </div>
            }
          </div>
          <hr>

          <label class="checkbox">
            <span>Initiative du follower</span>
            <input type="checkbox" formControlName="isFollowerInitiative" />
          </label>

          <div class="form-actions">
            <button type="button" (click)="goBack()">❌ Annuler</button>
            <button type="submit" [disabled]="form.invalid">💾 Enregistrer</button>
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
export class MoveAddComponent {
  private router = inject(Router)
  private moveService = inject(MoveService)
  private moveFormBuilder = inject(MoveFormBuilderService)

  getDanceMoveLevelDisplayName = getDanceMoveLevelDisplayName
  danceMoveLevels = danceMoveLevels

  protected form: DanceMoveFormGroup = this.moveFormBuilder.createEmptyDanceMoveForm()

  protected getConnectionGroup = this.moveFormBuilder.getConnectionGroup

  onSubmit(form: DanceMoveFormGroup) {
    if (form.valid) {
      const updatedMove: Partial<DanceMove> = {
        ...form.getRawValue(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      this.moveService.addMove(updatedMove)
      console.log('✅ Move updated:', updatedMove)
      this.goBack()
    }
  }

  // addMockMoves() {
  //   fromSheets.forEach(move => {
  //     const updatedMove: Partial<DanceMove> = {
  //       ...move,
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     }
  //     this.moveService.addMove(move)
  //   })
  // }

  goBack() {
    this.router.navigate(['/moves'])
  }
}
