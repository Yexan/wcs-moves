// Get all keys of the union
export type KeysOfUnion<T> = T extends T ? keyof T : never


// Check if a key K is present in all members of the union T
type PresentInAll<T, K extends PropertyKey> =
  T extends T ? (K extends keyof T ? never : T) : never extends never ? true : false


// For each key, if all members have this key → strict type
// Otherwise → type | null (because it doesn't exist everywhere in all members)
export type MergeUnion<T> = {
  [K in KeysOfUnion<T>]:
  PresentInAll<T, K> extends true
  ? // if key is present in all members → union of values without null
  (T extends { [P in K]: infer V } ? V : never)
  : // otherwise → union of values + null
  (T extends { [P in K]: infer V } ? V : never) | null
}

export type FlattenForIDE<T> = { [K in keyof T]: T[K] } & {}
