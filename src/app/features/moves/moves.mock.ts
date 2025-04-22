import { DanceMove } from './dance-move.type'

export const movesData: DanceMove[] = [
  {
    id: '1',
    name: 'Left Side Pass',
    description: 'Basic 6-count move where the follower passes to the left of the leader.',
    flow: '',
    tags: ['basic', 'left', 'pass'],
    startingConnection: {
      leader: { left: 'left hand', right: 'free' },
      follower: { left: 'free', right: 'right hand' },
    },
    endingConnection: {
      leader: { left: 'left hand', right: 'free' },
      follower: { left: 'free', right: 'right hand' },
    },
    videoUrl: '',
    thumbnailUrl: '',
    variations: ['with turn', 'with check'],
    steps: 6,
    stepDetails: [
      {
        timing: 1,
        connection: {
          leader: { left: 'left hand', right: 'free' },
          follower: { left: 'free', right: 'right hand' },
        },
        footPositions: {
          leader: 'Step back on left foot, initiating lead',
          follower: 'Step forward on right foot, accepting the lead',
        },
      },
      {
        timing: 3,
        connection: {
          leader: { left: 'left hand', right: 'free' },
          follower: { left: 'free', right: 'right hand' },
        },
        footPositions: {
          leader: 'Step in place on right foot, opening lane',
          follower: 'Step forward on left foot, passing left of leader',
        },
      },
      {
        timing: 5,
        connection: {
          leader: { left: 'left hand', right: 'free' },
          follower: { left: 'free', right: 'right hand' },
        },
        footPositions: {
          leader: 'Triple step (left-right-left) anchoring',
          follower: 'Triple step (right-left-right) anchoring',
        },
      },
    ],
    isFollowerInitiative: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Right Side Pass',
    description: 'Follower passes to the right of the leader, also a 6-count move.',
    flow: '',
    tags: ['basic', 'right', 'pass'],
    startingConnection: {
      leader: { left: 'right hand', right: 'free' },
      follower: { left: 'free', right: 'left hand' },
    },
    endingConnection: {
      leader: { left: 'right hand', right: 'free' },
      follower: { left: 'free', right: 'left hand' },
    },
    videoUrl: '',
    thumbnailUrl: '',
    variations: ['inside turn', 'outside turn'],
    steps: 6,
    stepDetails: [
      {
        timing: 1,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Step back on left foot, leading with right hand',
          follower: 'Step forward on right foot',
        },
      },
      {
        timing: 3,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Step in place on right foot, clearing path',
          follower: 'Step forward on left foot, passing to the right',
        },
      },
      {
        timing: 5,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Triple step anchoring (left-right-left)',
          follower: 'Triple step anchoring (right-left-right)',
        },
      },
    ],
    isFollowerInitiative: false,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Sugar Push',
    description: 'Follower is led forward then pushed back — compression move.',
    flow: 'Step - Step - Triple step - Triple step',
    tags: ['basic', 'compression', '6-count'],
    startingConnection: {
      leader: { left: 'right hand', right: 'free' },
      follower: { left: 'free', right: 'left hand' },
    },
    endingConnection: {
      leader: { left: 'left hand', right: 'free' },
      follower: { left: 'free', right: 'right hand' },
    },
    videoUrl: '',
    thumbnailUrl: '',
    variations: ['with anchor syncopation', 'with arm styling'],
    steps: 6,
    stepDetails: [
      {
        timing: 1,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Anchor position, then step back with left foot',
          follower: 'Anchor position, then step forward with right foot following the lead',
        }
      },
      {
        timing: 3,
        connection: {
          leader: { left: 'right hand', right: 'left hand' },
          follower: { left: 'right hand', right: 'left hand' },
        },
        footPositions: {
          leader: 'Right foot steps in place or slightly back, establish compression',
          follower: 'Left foot steps close to leader, initiate compression',
        }
      },
      {
        timing: 5,
        connection: {
          leader: { left: 'right hand', right: 'left hand' },
          follower: { left: 'right hand', right: 'left hand' },
        },
        footPositions: {
          leader: 'Step left to the side starting triple step',
          follower: 'Step right back, away from compression',
        }
      },
      {
        timing: 7,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Step right together to finish triple step',
          follower: 'Step left together to finish triple step',
        }
      },
      {
        timing: 9,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Anchor step back on left foot',
          follower: 'Anchor step back on right foot',
        }
      },
      {
        timing: 11,
        connection: {
          leader: { left: 'right hand', right: 'free' },
          follower: { left: 'free', right: 'left hand' },
        },
        footPositions: {
          leader: 'Anchor step in place with right foot',
          follower: 'Anchor step in place with left foot',
        }
      }
    ],
    isFollowerInitiative: false,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Whip',
    description: '8-count move with a rotational element and redirection.',
    flow: '',
    tags: ['whip', 'rotation', '8-count'],
    startingConnection: {
      leader: { left: 'left hand', right: 'right hand' },
      follower: { left: 'left hand', right: 'right hand' },
    },
    endingConnection: {
      leader: { left: 'left hand', right: 'right hand' },
      follower: { left: 'left hand', right: 'right hand' },
    },
    videoUrl: '',
    thumbnailUrl: '',
    variations: ['whip with inside turn', 'whip with outside roll'],
    steps: 8,
    stepDetails: [
      {
        timing: 1,
        connection: {
          leader: { left: 'left hand', right: 'right hand' },
          follower: { left: 'left hand', right: 'right hand' },
        },
        footPositions: {
          leader: 'Step back on left foot to prepare lead',
          follower: 'Step forward on right foot',
        },
      },
      {
        timing: 3,
        connection: {
          leader: { left: 'left hand', right: 'right hand' },
          follower: { left: 'left hand', right: 'right hand' },
        },
        footPositions: {
          leader: 'Step to side on right foot creating slot space',
          follower: 'Continue forward motion — preparing for redirection',
        },
      },
      {
        timing: 5,
        connection: {
          leader: { left: 'left hand', right: 'right hand' },
          follower: { left: 'left hand', right: 'right hand' },
        },
        footPositions: {
          leader: 'Triple step to left, redirecting follower',
          follower: 'Rotate and triple step (right-left-right)',
        },
      },
      {
        timing: 7,
        connection: {
          leader: { left: 'left hand', right: 'right hand' },
          follower: { left: 'left hand', right: 'right hand' },
        },
        footPositions: {
          leader: 'Anchor step (right-left-right)',
          follower: 'Anchor step (left-right-left)',
        },
      },
    ],
    isFollowerInitiative: false,
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Underarm Turn',
    description: 'Follower performs an inside or outside turn under the leader’s arm.',
    flow: '',
    tags: ['turn', 'basic', '6-count'],
    startingConnection: {
      leader: { left: 'left hand', right: 'free' },
      follower: { left: 'free', right: 'right hand' },
    },
    endingConnection: {
      leader: { left: 'left hand', right: 'free' },
      follower: { left: 'free', right: 'right hand' },
    },
    videoUrl: '',
    thumbnailUrl: '',
    variations: ['inside turn', 'outside turn', 'hair comb'],
    steps: 6,
    stepDetails: [
      {
        timing: 1,
        connection: {
          leader: { left: 'left hand', right: 'free' },
          follower: { left: 'free', right: 'right hand' },
        },
        footPositions: {
          leader: 'Step back on left foot, prepping turn lead',
          follower: 'Step forward on right foot, receiving prep',
        },
      },
      {
        timing: 3,
        connection: {
          leader: { left: 'left hand high', right: 'free' },
          follower: { left: 'free', right: 'right hand turning' },
        },
        footPositions: {
          leader: 'Step in place, raising arm for turn',
          follower: 'Step forward and initiate turn under arm',
        },
      },
      {
        timing: 5,
        connection: {
          leader: { left: 'left hand', right: 'free' },
          follower: { left: 'free', right: 'right hand' },
        },
        footPositions: {
          leader: 'Triple step anchoring (left-right-left)',
          follower: 'Finish turn with triple step (right-left-right)',
        },
      },
    ],
    isFollowerInitiative: false,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
]