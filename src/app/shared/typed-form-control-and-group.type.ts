import { FormControl, FormGroup } from "@angular/forms"

export type TypedFormControl<T> = {
  [K in keyof T]: FormControl<T[K]>
}

// export type TypedFormGroup<T> = FormGroup<TypedFormControl<T>>
// Typescript lose type inferrence on hover with the refacto version

export type TypedFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>
}>

export type TypedFormGroupByControl<T, P> = FormGroup<{
  [K in keyof T]: P extends FormControl<any> | FormGroup<any> ? P : never
}>
