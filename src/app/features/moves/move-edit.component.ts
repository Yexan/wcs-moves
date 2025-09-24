import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, map, of, shareReplay } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { PartnersConnectionEditComponent } from '@features/connection/partners-connection/partners-connection-edit.component'
import { MoveService } from '@features/moves/move.service'
import { MoveFormBuilderService } from '@features/moves/move-form-builder.service'
import { DanceMove, DanceMoveFormGroup } from '@features/moves/dance-move.type'
import { getDanceMoveLevelDisplayName, danceMoveLevels } from '@features/moves/dance-moves-level'


@Component({
  selector: 'app-move-edit',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, PartnersConnectionEditComponent],
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
            <span>Nombre de temps :</span>
            <input
              type="number"
              min="1"
              formControlName="steps"
            />
          </label>

          <hr>

          <label>
            <span>Professeur</span>
            <input type="text" formControlName="teacher" />
          </label>
          <label>
            <span>Lieu</span>
            <input type="text" formControlName="location" />
          </label>
          <hr>

          <label>
            <span>URL de la vidéo YouTube (ID)</span>
            <input type="text" formControlName="videoUrl" />
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
            <span>Position de départ</span>
            <input type="text" formControlName="startingPosition" />
          </label>
          <label>
            <span>Position de fin</span>
            <input type="text" formControlName="endingPosition" />
          </label>
          <hr>

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

  getDanceMoveLevelDisplayName = getDanceMoveLevelDisplayName
  danceMoveLevels = danceMoveLevels

  @Input() id!: string

  protected move$: Observable<DanceMove | null> = of(null)
  protected form$: Observable<DanceMoveFormGroup | null> = of(null)

  protected getConnectionGroup = this.moveFormBuilder.getConnectionGroup

  ngOnInit(): void {
    this.move$ = this.moveService.getMoveById(this.id)
    this.form$ = this.move$.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(move => move ? this.moveFormBuilder.createDanceMoveForm(move) : null),
      shareReplay(1)
    )
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
