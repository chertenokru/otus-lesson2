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

    <div class="star-text ">

      <StarFilled v-for="n in Math.trunc(rate)" :key="n" alt="Rating"
                  class="star"/>
      <Star alt="Rating" class="star_sm" v-for="n in 5-Math.trunc(rate)" :key="n"/>
      <strong class="rating-text">{{ rate }} </strong>
    </div>
    <p class="rating-text">{{ count }} отзывов </p>

  </div>
</template>
<style scoped>

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.star {
  width: 20px;
  color: gold;
  margin-top: -1px;
}

.star_sm {
  height: 18px;
  color: gold;
  position: relative;
  top: -1px;
}

.rating-text {
  margin-left: 5px;
  margin-right: 5px;

}
.star-text {
  margin-top: 15px;
}
</style>
