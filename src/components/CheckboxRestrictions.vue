<template>
  <div class="radioGroup">
    <div class="radioWrapper">
      <input type="radio" id="percent" value="percent" name="restrictions"
             :checked="checked" @input="$emit('update:value', 'percent')"/>
      <label for="percent">%</label>
    </div>
    <div class="radioWrapper">
      <input type="radio" id="dollar" value="dollar" name="restrictions"
             :checked="checked" @input="$emit('update:value', 'dollar')"/>
      <label for="dollar">$</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxRestrictions',
  props: { value: String },
  data() {
    return ({
      checked: this.value
    })
  }
}
</script>

<style scoped>
.radioGroup {
  display: flex;
  justify-content: left;
  width: 125px;
}

.radioWrapper {
  font-size: 12px;
}

label {
  margin: 0 8px 0 4px;
  font-size: 12px;
}
</style>
