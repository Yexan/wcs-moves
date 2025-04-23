import { ConnectionPoint } from '@features/connection/connection-point/connection-point.type'
import { TypedFormGroup } from '@shared/typed-form-control-and-group.type'


export type HandsConnection = {
  left: ConnectionPoint
  right: ConnectionPoint
}

export type HandsConnectionFormGroup = TypedFormGroup<HandsConnection>
