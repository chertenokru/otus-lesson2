<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
const model = defineModel<string>({required: true})
defineProps<{ filters: string[], }>()
</script>
<template>
  <div >
    Фильтр по категории:
    <select name=filter v-model="model">
      <option value="">Все</option>
      <option v-for="option in filters" :value="option">{{ option }}</option>
    </select>
    <button class="clear-button" v-show="modelValue" @click="model =''">Очистить</button>

  </div>

</template>

<style scoped>
.clear-button{
  margin-left: 5px;
}
</style>
