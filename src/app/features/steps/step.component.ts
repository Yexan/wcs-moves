import { Component, Input } from '@angular/core'

import { PartnersConnectionComponent } from "@features/connection/partners-connection/partners-connection.component"
import { Step } from '@features/steps/step.type'

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [PartnersConnectionComponent],
  template: `
    <div class="step">
      <div class="foot-positions">
        <div class="foot-position">
          <h3>Follower steps</h3>
          <p>{{ step.footPositions.follower }}</p>
        </div>
        <div class="foot-position">
          <h3>Leader steps</h3>
          <p>{{ step.footPositions.leader }}</p>
        </div>
      </div>
      <div class="partners-connection">
        <app-partners-connection [partnersConnection]="step.connection"></app-partners-connection>
      </div>
    </div>
  `,
  styles: `
    .step
      display: grid
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr))
      grid-gap: 1rem

    .foot-positions
      display: grid
      grid-auto-rows: 1fr

    .partners-connection
      padding: 1rem 0
  `
})
export class StepComponent {
  @Input({ required: true }) step!: Step
}
