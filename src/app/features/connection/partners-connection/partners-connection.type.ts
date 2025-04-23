import { HandsConnection, HandsConnectionFormGroup } from "../hands-connection/hands-connection.type"
import { TypedFormGroupByControl } from "../../../shared/typed-form-control-and-group.type"

export type PartnersConnection = {
  leader: HandsConnection
  follower: HandsConnection
}

export type PartnersConnectionFormGroup = TypedFormGroupByControl<PartnersConnection, HandsConnectionFormGroup>
