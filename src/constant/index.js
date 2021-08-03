import { uuid } from 'vue-uuid'

export const REWARD_TYPES = {
  MONEY: 'money',
  CONTINUE: 'continue'
}

export const wheelData = {
  id: uuid.v4(),
  position: 1,
  rewards: [
    {
      id: uuid.v4(),
      name: '$0',
      value: '0',
      type: REWARD_TYPES.MONEY
    },
    {
      id: uuid.v4(),
      name: '$20',
      value: '20',
      type: REWARD_TYPES.MONEY
    },
    {
      id: uuid.v4(),
      name: '$5',
      value: '5',
      type: REWARD_TYPES.MONEY
    },
    {
      id: uuid.v4(),
      name: '$10',
      value: '10',
      type: REWARD_TYPES.MONEY
    },
    {
      id: uuid.v4(),
      name: 'Quay Tiếp',
      value: 'continue',
      type: REWARD_TYPES.CONTINUE
    },
    {
      id: uuid.v4(),
      name: '$15',
      value: '15',
      type: REWARD_TYPES.MONEY
    }
  ],
  nestedItems: {
    id: uuid.v4(),
    position: 2,
    rewards: [
      {
        id: uuid.v4(),
        name: '$0',
        value: '0',
        type: REWARD_TYPES.MONEY
      },
      {
        id: uuid.v4(),
        name: '$20',
        value: '20',
        type: REWARD_TYPES.MONEY
      },
      {
        id: uuid.v4(),
        name: '$5',
        value: '5',
        type: REWARD_TYPES.MONEY
      },
      {
        id: uuid.v4(),
        name: 'Quay Tiếp',
        value: 'continue',
        type: REWARD_TYPES.CONTINUE
      },
      {
        id: uuid.v4(),
        name: '0',
        value: '0',
        type: REWARD_TYPES.MONEY
      },
      {
        id: uuid.v4(),
        name: '$20',
        value: '20',
        type: REWARD_TYPES.MONEY
      },
      {
        id: uuid.v4(),
        name: '$15',
        value: '15',
        type: REWARD_TYPES.MONEY
      }
    ],
    nestedItems: {
      id: uuid.v4(),
      position: 3,
      rewards: [
        {
          id: uuid.v4(),
          name: '$10',
          value: '10',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$0',
          value: '0',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$20',
          value: '20',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$0',
          value: '0',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$15',
          value: '15',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$5',
          value: '15',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$20',
          value: '20',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$5',
          value: '5',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$0',
          value: '0',
          type: REWARD_TYPES.MONEY
        },
        {
          id: uuid.v4(),
          name: '$10',
          value: '10',
          type: REWARD_TYPES.MONEY
        }
      ]
    }
  }
}

export const totalSpinTimes = 5
