import { Component, Input } from '@angular/core'

import { ConnectionPoint, getConnectionPointDisplayName } from './connection-point.type'

@Component({
  selector: 'app-connection-point',
  standalone: true,
  imports: [],
  template: `
    <div class="connection-point" [class.direction-reverse]="textDirection === 'top'" [style.opacity]="connectionPoint === 'free' ? 0 : 1">
      <div [style.background]="color" class="connection-origin"></div>
      <div class="connection-direction-spacer"></div>
      <div class="connection-direction">{{ getDisplayName(connectionPoint) }}</div>
    </div>
  `,
  styles: `
    @use './connection-point'
  `
})
export class ConnectionPointComponent {
  @Input({ required: true }) connectionPoint!: ConnectionPoint
  @Input({ required: false }) textDirection = 'top'
  @Input({ required: false }) color = '#ccc'

  getDisplayName = getConnectionPointDisplayName
}
