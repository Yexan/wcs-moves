import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HandsConnectionComponent } from "../hands-connection/hands-connection.component"
import { PartnersConnection } from './partners-connection.type'


@Component({
  selector: 'app-partners-connection',
  standalone: true,
  imports: [CommonModule, HandsConnectionComponent],
  template: `
    <div class="partners-connection">
      <app-hands-connection dancerRole="Follower" [handsConnection]="partnersConnection.follower" color="#FFD54F" textDirection="bottom" handsDirection="right-to-left" />

      <app-hands-connection dancerRole="Leader" [handsConnection]="partnersConnection.leader" color="#66BB6A" textDirection="top" />
    </div>
  `,
  styles: `
    @use './partners-connection'
  `
})
export class PartnersConnectionComponent {
  @Input({ required: true }) partnersConnection!: PartnersConnection
}
