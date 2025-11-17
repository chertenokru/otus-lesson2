<script setup lang="ts">
import StarFilled from "@/assets/StarFilled.svg"
import Star from "@/assets/Star.svg"

defineProps<{
  rate: number
  count: number
}>()

</script>


<template>
  <div class="rating">
    <StarFilled v-for="n in Math.trunc(rate)" :key="n" alt="Rating"
                class="star"/>
    <Star alt="Rating" class="star_sm" v-for="n in 5-Math.trunc(rate)" :key="n"/>
    <p class="rating-text">{{ rate }} {{ count }} отзывов </p>

  </div>
</template>
<style scoped>

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

.rating-text {
  margin-left: 5px;
}
</style>
