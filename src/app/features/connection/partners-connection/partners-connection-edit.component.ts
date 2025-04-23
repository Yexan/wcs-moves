import { Component, Input, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { HandsConnectionEditComponent } from '../hands-connection/hands-connection-edit.component'
import { MoveFormBuilderService } from '../../moves/move-form-builder.service'
import { PartnersConnectionFormGroup } from './partners-connection.type'

@Component({
  selector: 'app-partners-connection-edit',
  standalone: true,
  imports: [ReactiveFormsModule, HandsConnectionEditComponent],
  template: `
    <div class="partners-connection-edit">
      @let follower = getPartnersConnection(partnersConnection, 'follower');
      @if (follower) {
        <app-hands-connection-edit
          dancerRole="Follower"
          [handsConnection]="follower"
          color="#FFD54F"
          textDirection="bottom"
          handsDirection="right-to-left" />
      }

      @let leader = getPartnersConnection(partnersConnection, 'leader');
      @if (leader) {
        <app-hands-connection-edit
          dancerRole="Leader"
          [handsConnection]="leader"
          color="#66BB6A"
          textDirection="top" />
      }
    </div>
  `,
  styles: `
    @use './partners-connection'
  `
})
export class PartnersConnectionEditComponent {
  @Input({ required: true }) partnersConnection!: PartnersConnectionFormGroup

  protected getPartnersConnection = inject(MoveFormBuilderService).getPartnersConnection
}