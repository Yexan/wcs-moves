import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PartnersConnection } from './partners-connection.type'
import { HandsConnectionComponent } from "../hands-connection/hands-connection.component"


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
.partners-connection
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
export class PartnersConnectionComponent {
  @Input({ required: true }) partnersConnection!: PartnersConnection
}
