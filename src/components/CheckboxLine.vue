<template>
  <div class="checkboxLine">
    <div class="checkboxWrapper">
      <input type="checkbox" :id="checkbox" :checked="checked" @change="$emit('update:checked', $event.target.checked)"/>
      <label :for="checkbox" class="label">{{ label }}</label>
    </div>
    <div class="inputWrapper">
      <img class="iconWrapper" :src="dollarIconUrl" alt="">
      <input type="number" class="input" :value="value" :disabled="!checked">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxLine',
  props: {
    checkbox: String,
    checked: Boolean,
    label: String,
    value: String,
    investmentAmount: Number
  },
  data() {
    return ({
      dollarIconUrl: require('/src/assets/dollar.svg'),
    })
  },
  watch: {
    checked(newChecked) {
      console.log(1, newChecked ? Math.floor((this.investmentAmount/100) * 30) : null)
      return this.$emit('update:value', newChecked ? Math.floor((this.investmentAmount/100) * 30) : null)
    }
  }
}
</script>

<style scoped>
.checkboxLine {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 12px;
  margin-left: 8px;
}

.inputWrapper {
  width: 125px;
  position: relative;
}

.iconWrapper {
  width: 24px;
  position: absolute;
  top: 0;
  left: -4px;
}

.input {
  width: 100%;
  text-align: right;
  border-radius: 4px;
  border: 1px solid rgb(192, 194, 196);
}
</style>
