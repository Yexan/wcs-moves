import { FormControl, FormGroup } from '@angular/forms'

import { PartnersConnection, PartnersConnectionFormGroup } from '@features/connection/partners-connection/partners-connection.type'
import { PartnersFootPositions, PartnersFootPositionsFormGroup } from '@features/steps/partners-foot-positions.type'

export type Step = {
  timing: number
  connection: PartnersConnection
  footPositions: PartnersFootPositions
}

export type StepFormGroup = FormGroup<{
  timing: FormControl<number>
  connection: PartnersConnectionFormGroup
  footPositions: PartnersFootPositionsFormGroup
}>

