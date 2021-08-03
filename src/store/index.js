import { createStore, createLogger } from 'vuex'

import { STORE_REWARD, CLEAR_REWARDS, STOP_SPIN, CONTINUE_SPIN } from './mutation-types'

const store = createStore ({
  state: {
    isStop: false,
    rewards: []
  },

  mutations: {
    [STORE_REWARD](state, payload) {
      state.rewards.push(payload)
    },

    [CLEAR_REWARDS](state) {
      state.rewards = []
    },

    [STOP_SPIN](state) {
      state.isStop = true
    },

    [CONTINUE_SPIN](state) {
      state.isStop = false
    }
  },

  strict: true,
  plugins: [createLogger()]
})

export default store
