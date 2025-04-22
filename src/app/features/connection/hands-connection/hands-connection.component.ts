import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HandsConnection } from './hands-connection.type'
import { ConnectionPointComponent } from "../connection-point/connection-point.component";


@Component({
  selector: 'app-hands-connection',
  standalone: true,
  imports: [CommonModule, ConnectionPointComponent],
  template: `
    <div class="hands-connection" [class.direction-reverse]="textDirection === 'top'">
      <div class="dancer-role" [style.background]="color">{{ dancerRole }}</div>
      <div class="hands" [class.hands-right-to-left]="handsDirection !== 'left-to-right'">
        <app-connection-point side="Left" [connectionPoint]="handsConnection.left" [color]="color" [textDirection]="textDirection" />
        <app-connection-point side="Right" [connectionPoint]="handsConnection.right" [color]="color" [textDirection]="textDirection" />
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
