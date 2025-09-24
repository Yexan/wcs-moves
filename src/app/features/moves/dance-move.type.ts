import { FormGroup } from '@angular/forms'

import { PartnersConnection, PartnersConnectionFormGroup } from '@features/connection/partners-connection/partners-connection.type'
import { DanceMoveLevel } from '@features/moves/dance-moves-level'
import { FlattenForIDE } from '@shared/type.helpers'
import { TypedFormControl } from '@shared/typed-form-control-and-group.type'


export type DanceMove = {
  id?: string
  category: string
  name: string
  description: string
  level: DanceMoveLevel
  tags: string[]
  videoUrl: string
  steps: number
  teacher: string
  location: string
  startingConnection: PartnersConnection
  endingConnection: PartnersConnection
  variations: string[]
  isFollowerInitiative: boolean
  startingPosition: string
  endingPosition: string
  createdAt: string
  updatedAt: string
}


export type DanceMoveFormData = Omit<DanceMove, 'id' | 'createdAt' | 'updatedAt'>
export type DanceMoveFormDataWithoutConnection = Omit<DanceMoveFormData,
  'startingConnection' | 'endingConnection'
>

export type DanceMoveBaseFormControls = TypedFormControl<DanceMoveFormDataWithoutConnection>
export type ConnectionFormControls = {
  startingConnection: PartnersConnectionFormGroup
  endingConnection: PartnersConnectionFormGroup
}

export type DanceMoveFormDataControls = FlattenForIDE<DanceMoveBaseFormControls & ConnectionFormControls>

export type DanceMoveFormGroup = FormGroup<DanceMoveFormDataControls>
