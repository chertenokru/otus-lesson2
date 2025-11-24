<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
const model = defineModel<{ minFilter: number, maxFilter: number }>({required: true})
defineProps<{ minValue: number, maxValue: number }>()
</script>
<template>
  <div>
    Фильтр по цене:
    <label for="min"/><input type="number" id="min" :min="minValue" :max="maxValue"
                             v-model="model.minFilter">
    <label for="max"/><input type="number" id="max" :min="minValue" :max="maxValue"
                             v-model="model.maxFilter">
    <button class="clear-button" v-show="modelValue"
            @click="()=>{model.maxFilter = maxValue; model.minFilter=minValue}">Сбросить
    </button>

  </div>

</template>

<style scoped>
.clear-button {
  margin-left: 5px;
}
</style>
