export const connectionPoints = [
  'free',
  'left hand',
  'right hand',
  'left scapula',
  'right scapula',
  'left hip',
  'right hip',
  'left shoulder',
  'right shoulder',
  'left arm',
  'right arm',
  'left forearm',
  'right forearm',
  'left wrist',
  'right wrist'
] as const

export type ConnectionPoint = typeof connectionPoints[number] | (string & {})
