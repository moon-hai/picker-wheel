<template>
  <div :class="['wheel', `wheel-level-${record.position}`]">
    <div
      class="wheel__reward-wrapper"
      :style="`transform: rotate(${wheelDeg}deg)`">
      <div
        v-for="(reward, index) in record.rewards"
        :key="reward.id"
        :style="`transform: translateY(-50%) rotate(${(360 / totalReward) * index}deg);`"
        class="wheel__reward-item">
        <p>{{ reward.name }}</p>
      </div>
    </div>

    <Wheel
      v-if="!!nestedRecord"
      :record="nestedRecord"
      :spin-level="localSpinLevel"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { REWARD_TYPES } from '@/constant'

const SPIN_TIMES_BEFORE_MATCH = 5

export default {
  name: 'Wheel',

  props: {
    record: {
      type: Object,
      required: true
    },

    spinLevel: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      spinValue: undefined,
      localSpinLevel: this.spinLevel,
      wheelDeg: 0,
      spinTime: 0
    }
  },

  methods: {
    ...mapMutations(['STORE_REWARD', 'STOP_SPIN']),

    getSpinValue() {
      const { rewards } = this.record
      const randomRewardIndex = Math.floor(Math.random() * this.totalReward)
      this.spinTime++
      this.spinValue = rewards[randomRewardIndex]
      this.wheelDeg =
        this.spinTime * SPIN_TIMES_BEFORE_MATCH * this.circleDeg +
          (this.degPerRewardSlice * (this.totalReward - randomRewardIndex))

      // delay after transition done
      setTimeout(() => {
        if (this.spinValue.type === REWARD_TYPES.CONTINUE) {
          this.localSpinLevel = this.localSpinLevel + 1
        } else {
          this.STORE_REWARD(this.spinValue)
          this.STOP_SPIN()
        }
      }, 4500)
    }
  },

  computed: {
    nestedRecord() {
      return this.record.nestedItems
    },

    shouldSpin() {
      return this.localSpinLevel === this.record.position
    },

    totalReward() {
      return this.record.rewards.length
    },

    circleDeg() {
      return 360
    },

    degPerRewardSlice() {
      return this.circleDeg / this.totalReward
    }
  },

  watch: {
    shouldSpin() {
      if (this.shouldSpin) this.getSpinValue()
    },

    spinLevel() {
      this.localSpinLevel = this.spinLevel
    }
  }
}
</script>

<style lang="scss" scoped>
$pi: 3.14159265358979;
$slice-colors: #a94fca, #EE4266, #FFD23F, #3BCEAC, #2765d4, #FF715B, #FFD23F, #3BCEAC, #2765d4, #FF715B;

$wheel-lv1-size: 20vw;
$wheel-lv1-item-count: 6;
$wheel-lv1-item-size: ($pi * $wheel-lv1-size) / $wheel-lv1-item-count;

$wheel-lv2-size: 36vw;
$wheel-lv2-item-count: 7;
$wheel-lv2-item-size: ($pi * $wheel-lv2-size) / $wheel-lv2-item-count;

$wheel-lv3-size: 50vw;
$wheel-lv3-item-count: 9;
$wheel-lv3-item-size: ($pi * $wheel-lv3-size) / $wheel-lv3-item-count;

.wheel {
  border-radius: 50%;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 1px solid #ddd;
}

.wheel__reward-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #ddd, 0 0 0 4px #ccc;
  transition: transform 4s ease-in-out;
}

.wheel__reward-item {
  position: absolute;
  z-index: -1;
  top: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  transform-origin: right;

  p {
    margin: 0;
    color: #000;
    font-weight: 600;
  }
}

.wheel-level-1 {
  width: $wheel-lv1-size;
  height: $wheel-lv1-size;

  > .wheel__reward-wrapper .wheel__reward-item {
    height: $wheel-lv1-item-size;

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      width: 0;
      height: 0;
      border-top: $wheel-lv1-item-size / 1.75 solid transparent;
      border-bottom: $wheel-lv1-item-size / 1.75 solid transparent;
      border-left: $wheel-lv1-size / 2 solid;
    }

    p {
      padding: 12px;
      font-size: 16px;
    }
  }
}

.wheel-level-2 {
  width: $wheel-lv2-size;
  height: $wheel-lv2-size;

  > .wheel__reward-wrapper .wheel__reward-item {
    height: $wheel-lv2-item-size;

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      width: 0;
      height: 0;
      border-top: $wheel-lv2-item-size / 1.85 solid transparent;
      border-bottom: $wheel-lv2-item-size / 1.85 solid transparent;
      border-left: $wheel-lv2-size / 2 solid;
    }

    p {
      padding: 12px;
      font-size: 18px;
    }
  }
}

.wheel-level-3 {
  width: $wheel-lv3-size;
  height: $wheel-lv3-size;

  > .wheel__reward-wrapper .wheel__reward-item {
    height: $wheel-lv3-item-size;

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      width: 0;
      height: 0;
      border-top: $wheel-lv3-item-size / 2 solid transparent;
      border-bottom: $wheel-lv3-item-size / 2 solid transparent;
      border-left: $wheel-lv3-size / 2 solid;
    }

    p {
      padding: 32px;
      font-size: 24px;
    }
  }
}

@for $i from 1 through 10 {
  .wheel__reward-wrapper .wheel__reward-item:nth-of-type(#{$i}) {
    &::after {
      border-left-color: nth($slice-colors, $i);
    }
  }
}
</style>
