import { Component, Input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { ConnectionPointEditComponent } from '../connection-point/connection-point-edit.component'
import { HandsConnectionFormGroup } from './hands-connection.type'
import { ConnectionPoint } from '../connection-point/connection-point.type'
import { MoveFormBuilderService } from '../../moves/move-form-builder.service'


@Component({
  selector: 'app-hands-connection-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConnectionPointEditComponent],
  template: `
    <div class="hands-connection" [class.direction-reverse]="textDirection === 'top'">
      <div class="dancer-role" [style.background]="color">{{ dancerRole }}</div>
      <div
        class="hands"
        [formGroup]="handsConnection"
        [class.hands-right-to-left]="handsDirection !== 'left-to-right'">

        @let left = getConnectionPoint(handsConnection, 'left');
        <app-connection-point-edit
          *ngIf="left"
          side="Left"
          [connectionPoint]="left"
          [color]="color"
          [textDirection]="textDirection" />

        @let right = getConnectionPoint(handsConnection, 'right');
        <app-connection-point-edit
          *ngIf="right"
          side="Right"
          [connectionPoint]="right"
          [color]="color"
          [textDirection]="textDirection" />

      </div>
    </div>
  `,
  styles: `
    @use './hands-connection'
  `
})
export class HandsConnectionEditComponent {
  @Input({ required: true }) dancerRole!: string
  @Input({ required: true }) handsConnection!: HandsConnectionFormGroup
  @Input({ required: false }) textDirection = 'top'
  @Input({ required: false }) color = '#ccc'
  @Input({ required: false }) handsDirection = 'left-to-right'

  protected getConnectionPoint = inject(MoveFormBuilderService).getConnectionPoint
}