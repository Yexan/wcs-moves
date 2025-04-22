import { Injectable, inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { DanceMove, DanceMoveFormGroup } from './dance-move.type'
import { Step, StepFormGroup } from '../steps/step.type'
import { ConnectionPoint } from '../connection/connection-point/connection-point.type'
import { HandsConnectionFormGroup } from '../connection/hands-connection/hands-connection.type'
import { PartnersConnection, PartnersConnectionFormGroup } from '../connection/partners-connection/partners-connection.type'
import { PartnersFootPositions, PartnersFootPositionsFormGroup } from '../steps/partners-foot-positions.type'

@Injectable({ providedIn: 'root' })
export class MoveFormBuilderService {
  private formBuilder = inject(FormBuilder)

  // Edit a move

  createDanceMoveForm(move: DanceMove): DanceMoveFormGroup {
    return this.formBuilder.group({
      name: new FormControl(move.name, { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl(move.description, { nonNullable: true }),
      flow: new FormControl(move.flow, { nonNullable: true }),
      tags: new FormControl(move.tags, { nonNullable: true }),
      variations: new FormControl(move.variations, { nonNullable: true }),
      steps: new FormControl(move.steps, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      isFollowerInitiative: new FormControl(move.isFollowerInitiative, { nonNullable: true }),
      createdAt: new FormControl(move.createdAt, { nonNullable: true }),
      updatedAt: new FormControl(move.updatedAt, { nonNullable: true }),
      videoUrl: new FormControl(move.videoUrl ?? null),
      thumbnailUrl: new FormControl(move.thumbnailUrl ?? null),
      startingConnection: this.createPartnersConnectionForm(move.startingConnection),
      endingConnection: this.createPartnersConnectionForm(move.endingConnection),
      stepDetails: this.formBuilder.array(move.stepDetails.map(step => this.createStepForm(step)))
    }) as DanceMoveFormGroup
  }

  createPartnersConnectionForm(connection: PartnersConnection): PartnersConnectionFormGroup {
    return this.formBuilder.group({
      leader: this.formBuilder.group({
        left: new FormControl(connection.leader.left, { nonNullable: true }),
        right: new FormControl(connection.leader.right, { nonNullable: true }),
      }),
      follower: this.formBuilder.group({
        left: new FormControl(connection.follower.left, { nonNullable: true }),
        right: new FormControl(connection.follower.right, { nonNullable: true }),
      }),
    }) as PartnersConnectionFormGroup
  }

  createStepForm(step: Step): StepFormGroup {
    return this.formBuilder.group({
      timing: new FormControl(step.timing, { nonNullable: true }),
      connection: this.createPartnersConnectionForm(step.connection),
      footPositions: this.createFootPositionsForm(step.footPositions)
    }) as StepFormGroup
  }

  createFootPositionsForm(footPos: PartnersFootPositions): PartnersFootPositionsFormGroup {
    return this.formBuilder.group({
      leader: new FormControl(footPos.leader, { nonNullable: true }),
      follower: new FormControl(footPos.follower, { nonNullable: true })
    }) as PartnersFootPositionsFormGroup
  }

  // Create a move

  createEmptyDanceMoveForm(): DanceMoveFormGroup {
    return this.createDanceMoveForm(this.createEmptyDanceMove())
  }

  createEmptyPartnersConnectionForm(): PartnersConnectionFormGroup {
    return this.createPartnersConnectionForm(this.createEmptyPartnersConnection())
  }

  createEmptyFootPositionsForm(): PartnersFootPositionsFormGroup {
    return this.createFootPositionsForm(this.createEmptyFootPositions())
  }

  createEmptyStepForm(stepTiming: number): StepFormGroup {
    return this.createStepForm(this.createEmptyStep(stepTiming))
  }

  createEmptyDanceMove(): DanceMove {
    return {
      name: '',
      description: '',
      flow: '',
      tags: [],
      variations: [],
      steps: 6,
      isFollowerInitiative: false,
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      videoUrl: '',
      thumbnailUrl: '',
      startingConnection: this.createEmptyPartnersConnection(),
      endingConnection: this.createEmptyPartnersConnection(),
      stepDetails: []
    }
  }

  createEmptyPartnersConnection(): PartnersConnection {
    return {
      leader: { left: 'free', right: 'free' },
      follower: { left: 'free', right: 'free' }
    }
  }

  createEmptyFootPositions(): PartnersFootPositions {
    return {
      leader: '',
      follower: ''
    }
  }

  createEmptyStep(stepTiming: number): Step {
    return {
      timing: stepTiming,
      connection: this.createEmptyPartnersConnection(),
      footPositions: this.createEmptyFootPositions()
    }
  }

  getConnectionGroup(form: DanceMoveFormGroup, name: 'startingConnection' | 'endingConnection') {
    return form.get(name) as PartnersConnectionFormGroup
  }

  getStepConnection(step: StepFormGroup, name: 'connection') {
    return step.get(name) as PartnersConnectionFormGroup
  }

  getPartnersConnection(partnersConnection: PartnersConnectionFormGroup, name: 'leader' | 'follower') {
    return partnersConnection.get(name) as HandsConnectionFormGroup
  }

  getConnectionPoint(handsConnection: HandsConnectionFormGroup, name: 'left' | 'right') {
    return handsConnection.get(name) as FormControl<ConnectionPoint>
  }
}