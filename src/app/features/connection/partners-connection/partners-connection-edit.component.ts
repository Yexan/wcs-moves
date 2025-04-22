import { Component, Input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { HandsConnectionEditComponent } from '../hands-connection/hands-connection-edit.component'
import { PartnersConnectionFormGroup } from './partners-connection.type'
import { HandsConnectionFormGroup } from '../hands-connection/hands-connection.type'
import { MoveFormBuilderService } from '../../moves/move-form-builder.service'

@Component({
  selector: 'app-partners-connection-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HandsConnectionEditComponent],
  template: `
    <div class="partners-connection-edit">
      @let follower = getPartnersConnection(partnersConnection, 'follower');
      <app-hands-connection-edit
        *ngIf="follower"
        dancerRole="Follower"
        [handsConnection]="follower"
        color="#FFD54F"
        textDirection="bottom"
        handsDirection="right-to-left" />

      @let leader = getPartnersConnection(partnersConnection, 'leader');
      <app-hands-connection-edit
        *ngIf="follower"
        dancerRole="Leader"
        [handsConnection]="leader"
        color="#66BB6A"
        textDirection="top" />
    </div>
  `,
  styles: `
.partners-connection-edit
  display: flex
  flex-direction: column
  gap: 4rem
  margin: auto
  width: fit-content
  color: #383a42
  text-align: center

  &.direction-reverse
    flex-direction: column-reverse

  .hands
    display: flex
    flex-direction: row
  `
})
export class PartnersConnectionEditComponent {
  @Input({ required: true }) partnersConnection!: PartnersConnectionFormGroup

  protected getPartnersConnection = inject(MoveFormBuilderService).getPartnersConnection
}