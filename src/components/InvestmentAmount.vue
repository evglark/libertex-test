<template>
  <div class="inputWrapper">
    <img class="iconWrapper" :src="dollarIconUrl" alt=""/>
    <input type="text" class="inputText" :class="{ inputError: error }" :value="value" @input="$emit('update:value', parseValue($event))"/>
  </div>
</template>

<script>
export default {
  name: 'InvestmentAmount',
  props: { value: Number, error: Boolean },
  data() {
    return ({
      dollarIconUrl: require('/src/assets/dollar.svg')
    });
  },
  methods: {
    parseValue(e) {
      const val = +e.target.value
      this.valid = val > 100
      return val
    }
  }
}
</script>

<style scoped>
.inputWrapper {
  width: 125px;
  position: relative;
  display: flex;
}

.iconWrapper {
  width: 24px;
  position: absolute;
  top: 0;
  left: -4px;
}

.inputText {
  width: 100%;
  text-align: right;
  border-radius: 4px;
  border: 1px solid rgb(192, 194, 196);
}

.inputError {
  outline: none;
  border: 1px solid rgb(221, 45, 54);
}
</style>
