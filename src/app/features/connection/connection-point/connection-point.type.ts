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

export type ConnectionPoint = typeof connectionPoints[number]


export const connectionPointDisplayNames = {
  'free': 'libre',
  'left hand': 'main gauche',
  'right hand': 'main droite',
  'left scapula': 'omoplate gauche',
  'right scapula': 'omoplate droite',
  'left hip': 'hanche gauche',
  'right hip': 'hanche droite',
  'left shoulder': 'épaule gauche',
  'right shoulder': 'épaule droite',
  'left arm': 'bras gauche',
  'right arm': 'bras droit',
  'left forearm': 'avant-bras gauche',
  'right forearm': 'avant-bras droit',
  'left wrist': 'poignet gauche',
  'right wrist': 'poignet droit'
} as const satisfies Record<ConnectionPoint, string>

export type ConnectionPointDisplayName = typeof connectionPointDisplayNames[ConnectionPoint]

export const getConnectionPointDisplayName = (connectionPoint: ConnectionPoint): ConnectionPointDisplayName => {
  return connectionPointDisplayNames[connectionPoint] || connectionPoint
}
