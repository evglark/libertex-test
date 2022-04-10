<template>
  <div class="inputWrapper">
    <input type="text" class="inputText" :value="value" @input="$emit('update:value', +$event.target.value)"/>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: { value: Number }
}
</script>

<style scoped>
.inputWrapper {
  display: flex;
}

.inputText {
  text-align: right;
  border-radius: 4px;
  border: 1px solid rgb(192, 194, 196);
}
</style>
