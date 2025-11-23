<script setup lang="ts">
import type {Product} from "@/model/Product.ts";
import {useField, useForm} from "vee-validate";

const emits = defineEmits<{ 'submit-form': [Product] }>()
defineProps<{ categoryList: string[] }>()
const {handleSubmit, isSubmitting, resetForm} = useForm<Product>({
  initialValues: {
    title: '',
    category: '',
    description: '',
    image: '',
    price: 0,
  },
});


const onSubmit = handleSubmit(async (value: Product) => {

  emits('submit-form', value)
  // resetForm();
})

const {
  value: title,
  errorMessage: titleError,
  meta: titleMeta,
} = useField<string>('title', 'required|min:2|max:100');

const {
  value: image,
  errorMessage: imageError,
  meta: imageMeta,
} = useField<string>('image', 'required|min:4');


const {
  value: description,
  errorMessage: descriptionError,
  meta: descriptionMeta,
} = useField<string>('description', 'required|min:5');

const {
  value: price,
  errorMessage: priceError,
  meta: priceMeta,
} = useField<string>('price', 'required|numeric|gt0');

const {
  value: category,
  errorMessage: categoryError,
  meta: categoryMeta
} = useField('category', 'required');

</script>

<template>
  <form class="order-form" @submit.prevent="onSubmit">
    <fieldset class="order-form__section">
      <legend>Новый товар</legend>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': titleError && titleMeta.touched }">
        <label for="name">Название товара *</label>
        <input id="name" type="text" v-model="title"/>
        <p v-if="titleError && titleMeta.touched" class="order-form__error">
          {{ titleError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': categoryError && categoryMeta.touched }">
        <label for="category">Категория товара *</label>
        <select id="category" v-model="category">
          <option value=""></option>
          <option v-for="category in categoryList" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <p v-if="categoryError && categoryMeta.touched" class="order-form__error">
          {{ categoryError }}
        </p>
      </div>


      <div class="order-form__field"
           :class="{ 'order-form__field--error': imageError && imageMeta.touched }">
        <label for="image">Ссылка на изображение *</label>
        <input id="image" type="text" v-model="image"/>
        <p v-if="imageError && imageMeta.touched" class="order-form__error">
          {{ imageError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': descriptionError && descriptionMeta.touched }">
        <label for="description">Описание *</label>
        <input id="description" type="text" v-model="description"/>
        <p v-if="descriptionError && descriptionMeta.touched" class="order-form__error">
          {{ descriptionError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': priceError && priceMeta.touched }">
        <label for="price">Цена *</label>
        <input id="price" type="text" v-model="price"/>
        <p v-if="priceError && priceMeta.touched" class="order-form__error">
          {{ priceError }}
        </p>
      </div>

    </fieldset>
    <button type="submit" class="order-form__submit" :disabled="isSubmitting">
      Добавить товар
    </button>
  </form>
</template>

<style scoped>
.order-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
}

.order-form__section {
  border: 1px solid #ddd;
  padding: 16px 20px;
  border-radius: 8px;
}

.order-form__field {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.order-form__field label {
  font-weight: 500;
  margin-bottom: 4px;
}

.order-form__field input[type='text'],
.order-form__field input[type='email'],
.order-form__field input[type='tel'] {
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.order-form__field--error input,
.order-form__field--error select {
  border-color: #d93025;
}

.order-form__error {
  margin-top: 4px;
  font-size: 12px;
  color: #d93025;
}

.order-form__submit {
  margin-top: 16px;
  padding: 10px 16px;
}
</style>
