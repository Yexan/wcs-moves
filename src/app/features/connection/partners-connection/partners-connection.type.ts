import { inject } from "@angular/core"
import { FormBuilder, FormControl } from "@angular/forms"

import { HandsConnection, HandsConnectionFormGroup } from "../hands-connection/hands-connection.type"
import { TypedFormGroup, TypedFormGroupByControl } from "../../../shared/typed-form-control-and-group.type"

export type PartnersConnection = {
  leader: HandsConnection
  follower: HandsConnection
}

export type PartnersConnectionFormGroup = TypedFormGroupByControl<PartnersConnection, HandsConnectionFormGroup>
