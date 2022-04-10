<template>
  <div class="multiplierInputWrapper" v-click-outside="onHideRange" @click.stop="onShowRange">
    <img class="iconWrapper" :src="crossIconUrl" alt=""/>
    <input class="multiplier" :class="{ multiplierActive: showRange }" type="text" :value="value" :readonly="true">
    <div class="slot">
      <slot/>
    </div>
    <div class="popupWrapper" v-show="showRange">
      <div class="popupTriangle"/>
      <div class="rangeWrapper">
        <input type="range" :min="min" :max="max" step="1"
               class="slider" :style="{ 'background-size': getValuePercentByRange+'% 100%' }"
               :value="value" @input="$emit('update:value', +$event.target.value)"/>
        <div class="rangeValues">
          <span class="minValue">{{ min }}</span>
          <span class="currentValue" :style="{ left: getValuePercentByRange+'%' }">{{ value }}</span>
          <span class="maxValue">{{ max }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputMultiplier',
  props: { range: String, value: Number },
  data() {
    const inputRange = this.range.split('-')
    return ({
      showRange: false,
      min: inputRange[0],
      max: inputRange[1],
      crossIconUrl: require('/src/assets/cross.svg'),
    })
  },
  methods: {
    onShowRange() {
      this.showRange = true
    },
    onHideRange() {
      this.showRange = false
    }
  },
  computed: {
    getValuePercentByRange() {
      return (this.value - this.min) * 100 / (this.max - this.min)
    }
  }
}
</script>

<style scoped>
.multiplierInputWrapper {
  width: 125px;
  position: relative;
  display: flex;
}

.iconWrapper {
  position: absolute;
  top: 18%; left: 2px;
  width: 14px;
}

.multiplier {
  width: 24px;
  padding: 0 4px 0 12px;
  text-align: right;
  border-radius: 4px;
  margin: 1px;
  border: 1px solid rgb(192, 194, 196);
  cursor: pointer;
}

.slot {
  margin-left: 4px;
}

.multiplierActive {
  margin: 0;
  border: 2px solid rgb(135, 157, 224);
}

.popupWrapper {
  position: absolute;
  top: 100%;
  left: -80%;
  width: 200%;
  z-index: 1;
}

.popupTriangle {
  margin: 0 auto;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid rgb(58, 59, 60);
}

.rangeWrapper {
  padding: 10px 10px 5px 10px;
  height: 35px;
  display: flex;
  flex-flow: column;
  background-color: rgb(58, 59, 60);
}

.slider {
  height: 5px;
  border-radius: 8px;
  background-color: rgb(127, 130, 132);
  background-image: linear-gradient(rgb(107, 131, 222), rgb(107, 131, 222));
  background-size: 40% 100%;
  background-repeat: no-repeat;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(255, 255, 255) 35%, rgb(107, 131, 222) 35%);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.rangeValues {
  width: 100%;
  margin-top: 5px;
  position: relative;
  color: rgb(125, 128, 130);
}

.minValue {
  position: absolute;
  left: 0;
}

.currentValue {
  position: absolute;
}

.maxValue {
  position: absolute;
  right: 0;
}
</style>
