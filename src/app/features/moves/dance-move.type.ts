import { FormArray, FormControl, FormGroup } from '@angular/forms'

import { PartnersConnection, PartnersConnectionFormGroup } from '@features/connection/partners-connection/partners-connection.type'
import { Step, StepFormGroup } from '@features/steps/step.type'
import { DanceMoveLevel } from '@features/moves/dance-moves-level'


export type DanceMove = {
  id?: string
  name: string
  description: string
  level: DanceMoveLevel
  flow: string
  tags: string[]
  startingConnection: PartnersConnection
  endingConnection: PartnersConnection
  videoUrl?: string
  thumbnailUrl?: string
  variations: string[]
  steps: number
  isFollowerInitiative: boolean
  createdAt: string
  updatedAt: string
}

export type DanceMoveFormGroup = FormGroup<{
  name: FormControl<string>
  description: FormControl<string>
  level: FormControl<DanceMoveLevel>
  flow: FormControl<string>
  tags: FormControl<string[]>
  startingConnection: PartnersConnectionFormGroup
  endingConnection: PartnersConnectionFormGroup
  videoUrl?: FormControl<string>
  thumbnailUrl?: FormControl<string>
  variations: FormControl<string[]>
  steps: FormControl<number>
  isFollowerInitiative: FormControl<boolean>
  createdAt: FormControl<string>
  updatedAt: FormControl<string>
}>
