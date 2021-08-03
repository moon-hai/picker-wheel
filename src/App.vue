<template>
  <div class="app-wrapper">
    <div class="reward-section">
      <h3>Giải thưởng bạn nhận được</h3>
      <ul>
        <li v-for="reward in rewards" :key="reward.id">${{ reward.value }}</li>
      </ul>
      <h3>Tổng cộng: ${{ totalReward }}</h3>

      <el-button v-if="rewards.length > 0" type="primary" @click="retry">Thử lại</el-button>
    </div>

    <div class="wheel-wrapper">
      <button :disabled="spinLevel > 0 || totalSpinTimes === 0" class="wheel-button" @click="spin">Quay</button>
      <Wheel :record="wheelData" :spin-level="spinLevel" />
    </div>

    <el-modal></el-modal>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Wheel from './components/Wheel.vue'
import { wheelData, totalSpinTimes } from '@/constant'

export default {
  name: 'App',

  data() {
    return {
      spinLevel: 0,
      totalSpinTimes
    }
  },

  components: {
    Wheel
  },

  computed: {
    ...mapState(['rewards', 'isStop']),

    wheelData() {
      return wheelData
    },

    totalReward() {
      return this.rewards?.reduce((acc, reward) => acc += Number(reward.value), 0) || 0
    }
  },

  methods: {
    ...mapMutations(['CONTINUE_SPIN', 'CLEAR_REWARDS']),

    spin() {
      if (this.totalSpinTimes - 1 >= 0) {
        this.totalSpinTimes -= 1
        this.spinLevel = 1
      }
    },

    retry() {
      this.totalSpinTimes = totalSpinTimes
      this.CLEAR_REWARDS()
    }
  },

  watch: {
    isStop() {
      if (this.isStop) {
        this.spinLevel = 0
        this.CONTINUE_SPIN()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
}

.wheel-button {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  outline: 0;
  color: white;
  font-weight: 700;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgb(34, 33, 33);
  box-shadow: 0 5px 20px #000;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -24px;
    border-width: 0 8px 32px;
    border-style: solid;
    border-color: transparent transparent rgb(229, 255, 0);
    z-index: 0;
    transform: translateY(-50%) rotate(-90deg);
  }
}
</style>
