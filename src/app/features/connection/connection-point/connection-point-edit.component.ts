import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { ConnectionPoint, connectionPoints } from './connection-point.type'

@Component({
  selector: 'app-connection-point-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="connection-point" [class.direction-reverse]="textDirection === 'top'">
      <div [style.background]="color" class="connection-origin">{{ side }}</div>
      <div class="connection-direction-spacer"></div>
      <div class="connection-direction">
        <select [formControl]="connectionPoint">
          <option value="">-- none --</option>
          @for (point of connectionPoints; track point) {
            <option [value]="point">{{ point }}</option>
          }
        </select>
      </div>
    </div>
  `,
  styles: `
    @use './connection-point'

    select
      padding: 0.25rem
      font-size: 1rem
      border-radius: 4px
      border: 1px solid #ccc
  `
})
export class ConnectionPointEditComponent {
  @Input({ required: true }) side!: string
  @Input({ required: true }) connectionPoint!: FormControl<ConnectionPoint>
  @Input({ required: false }) textDirection = 'top'
  @Input({ required: false }) color = '#ccc'

  connectionPoints = connectionPoints
}
