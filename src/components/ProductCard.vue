<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import Star from "@/assets/Star.svg"
import StarFilled from "@/assets/StarFilled.svg"

defineProps<{ product: Product }>()
const emits = defineEmits<{ 'category-click': [category: string] }>()
</script>

<template>
  <div class="product-card">
    <p class="product-title">{{ product.title }}</p>
    <img :src="product.image" :alt="product.description" width="100px"/>
    <div class="rating">
      <StarFilled v-for="n in Math.trunc(product.rating.rate)" :key="n" alt="Rating"
                  class="star"/>
      <Star alt="Rating" class="star_sm" v-for="n in 5-Math.trunc(product.rating.rate)" :key="n"/>
      <p class="rating-text">{{ product.rating.rate }} {{ product.rating.count }} отзывов </p>

    </div>
    <p class="underline" @click="emits('category-click',product.category)">Категория: {{ product.category }}</p>
    <p>Описание: {{ product.description }}</p>
    <p>Цена: {{ product.price }}</p>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
}

.product-title {
  font-weight: bold;
}

.rating {
  display: flex;
  align-items: center;
}

.star {
  width: 20px;
  color: gold;
}

.star_sm {
  height: 18px;
  color: gold;
  position: relative;
  top: -1px;
}
.underline{
  text-decoration: underline;
  cursor: pointer;
}

.rating-text {
  margin-left: 5px;
}
</style>
