<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
const model = defineModel<string>({required: true})
</script>
<template>
  <div >
    Фильтр по названию:
    <input type="text" name=filter v-model="model">

    <button class="clear-button" v-show="modelValue" @click="model =''">Очистить</button>

  </div>

</template>

<style scoped>
.clear-button{
  margin-left: 5px;
}
</style>
