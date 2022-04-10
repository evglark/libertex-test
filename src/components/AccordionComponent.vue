<template>
  <div class="accordion" @click="onToggleShowSlot">
    <div class="titleWrapper">
      <img class="iconWrapper" :src="chevronIconUrl" alt=""/>
      <div class="title">{{ title }}</div>
    </div>
    <div class="slot" v-show="showSlot" @click.stop>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionComponent',
  props: { title: String },
  data() {
    return ({
      showSlot: false,
      chevronIconUrl: require('/src/assets/chevron.svg'),
    })
  },
  methods: {
    onToggleShowSlot() {
      this.showSlot = !this.showSlot
    },
  },
}
</script>

<style scoped>
.accordion {
  margin-top: 10px;
  height: 105px;
}

.titleWrapper {
  display: flex;
  cursor: pointer;
}

.title {
  margin-left: 4px;
  color: rgb(125, 128, 130);
}

.iconWrapper {
  margin-left: -16px;
  width: 12px;
}

.slot {
  margin-top: 10px;
}
</style>
