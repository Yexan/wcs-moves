import { Component, Input } from '@angular/core'

import { ConnectionPointComponent } from '@features/connection/connection-point/connection-point.component'
import { HandsConnection } from './hands-connection.type'


@Component({
  selector: 'app-hands-connection',
  standalone: true,
  imports: [ConnectionPointComponent],
  template: `
    <div class="hands-connection" [class.direction-reverse]="textDirection === 'top'">
      <div class="dancer-role" [style.background]="color">{{ dancerRole }}</div>
      <div class="hands" [class.hands-right-to-left]="handsDirection !== 'left-to-right'">
        <app-connection-point [connectionPoint]="handsConnection.left" [color]="color" [textDirection]="textDirection" />
        <app-connection-point [connectionPoint]="handsConnection.right" [color]="color" [textDirection]="textDirection" />
      </div>
    </div>
  `,
  styles: `
    @use './hands-connection'
  `
})
export class HandsConnectionComponent {
  @Input({ required: true }) dancerRole!: string
  @Input({ required: true }) handsConnection!: HandsConnection
  @Input({ required: false }) textDirection = 'top'
  @Input({ required: false }) color = '#ccc'
  @Input({ required: false }) handsDirection = 'left-to-right'
}
