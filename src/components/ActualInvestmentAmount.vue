<template>
  <div class="output"> = $ {{ output }}</div>
</template>

<script>
export default {
  name: 'ActualInvestmentAmount',
  props: { output: String }
}
</script>

<style scoped>
.output {
  display: flex;
  color: rgb(125, 128, 130);
}
</style>
