<script setup lang="ts">
import {onMounted, ref} from "vue"
import type {Product} from "@/model/Product.ts";
import ProductCardList from "@/components/ProductCardList.vue";

const productList = ref<Product[]>([])
const url = "https://fakestoreapi.com/products"
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);

const loadProduct = async () => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  productList.value = await result.json()
}


const reload = async () => {
  isError.value = false;
  isLoading.value = true;
  try {
    await loadProduct()
  } catch (e) {
    console.log(`Ошибка загрузки : ${e}`)
    isError.value = true;
  }
  isLoading.value = false
}

onMounted(async () => {
  await reload()
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
      <button @click="reload" class="refresh-button">попробуйте ещё раз!</button>
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
  .refresh-button{
    width: 200px;
  }

}
</style>
