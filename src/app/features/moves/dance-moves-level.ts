export const danceMoveLevels = ['beginner', 'intermediate', 'advanced'] as const

export type DanceMoveLevel = typeof danceMoveLevels[number]

export const danceMoveLevelDisplayNames = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé'
} as const satisfies Record<DanceMoveLevel, string>

export type DanceMoveLevelDisplayName = typeof danceMoveLevelDisplayNames[DanceMoveLevel]

export const getDanceMoveLevelDisplayName = (level: DanceMoveLevel): DanceMoveLevelDisplayName => {
  return danceMoveLevelDisplayNames[level] || level
}
