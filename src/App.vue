<script setup lang="ts">
import {onMounted} from "vue"
import ProductCardList from "@/components/ProductCardList.vue";
import {useProducts} from "@/composable/useProducts.ts";

const {productList, updateProducts, isLoading, isError, errorText} = useProducts()


onMounted(async () => {
  await updateProducts()
})

</script>

<template>
  <div class="app">
    <h1>Welcome to SampleShop !</h1>

    <div v-show="isLoading"> Загрузка...</div>
    <div v-show="!isLoading && !isError">
      <ProductCardList :product-list="productList"/>
    </div>
    <div class="error-message" v-show="isError">
      у нас что-то поломалось и мы типа уже чиним...
      <p>{{ errorText }}</p>
      <button @click="updateProducts" class="refresh-button">попробуйте ещё раз!</button>
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
}

.error-message {
  text-align: center;
  color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin: 100px auto;
  width: 100%;

  .refresh-button {
    width: 200px;
  }

}
</style>
