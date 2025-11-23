<script setup lang="ts">

import {useForm, useField} from 'vee-validate';
import {type AxiosResponse} from "axios";
import api from "@/api.ts";

type OrderFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryType: 'Курьер' | 'Пункт выдачи' | '';
  paymentType: 'Карта' | 'Наличные' | '';
  agree: boolean;
};


const {handleSubmit, isSubmitting, resetForm} = useForm<OrderFormValues>({
  initialValues: {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryType: '',
    paymentType: '',
    agree: false,
  },
});

// поля с правилами

const {
  value: name,
  errorMessage: nameError,
  meta: nameMeta,
} = useField<string>('name', 'required|min:5|max:100');

const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
} = useField<string>('email', 'required|email|max:100');

const {
  value: phone,
  errorMessage: phoneError,
  meta: phoneMeta,
} = useField<string>('phone', 'required|min:10|max:20');

const {
  value: address,
  errorMessage: addressError,
  meta: addressMeta,
} = useField<string>('address', 'required|min:5|max:200');

const {
  value: city,
  errorMessage: cityError,
  meta: cityMeta,
} = useField<string>('city', 'required|min:2|max:100');

// почтовый индекс: обязательный, 6 цифр
const {
  value: postalCode,
  errorMessage: postalCodeError,
  meta: postalMeta,
} = useField<string>('postalCode', 'required|digits:6');

const {
  value: deliveryType,
  errorMessage: deliveryTypeError,
  meta: deliveryMeta,
} = useField<'Курьер' | 'Пункт выдачи' | ''>('deliveryType', 'required');

const {
  value: paymentType,
  errorMessage: paymentTypeError,
  meta: paymentMeta,
} = useField<'Карта' | 'Наличные' | ''>('paymentType', 'required');


const {
  value: agree,
  errorMessage: agreeError,
  meta: agreeMeta,
} = useField<boolean>('agree', 'accepted');

const onSubmit = handleSubmit(async (values) => {
try {
  const res = await api.post<OrderFormValues,AxiosResponse<OrderFormValues>>('https://httpbin.org/post', {values});
  if (res.status >= 200 && res.status < 300) {
    alert(`Заказ отправлен:\n ${JSON.stringify(res.data)}`);
  }
} catch (e)
{
  alert(`Не удалось отправить данные заказа: {e.message} `);
}

  resetForm();
});

</script>

<template>
  <form class="order-form" @submit.prevent="onSubmit">
    <fieldset class="order-form__section">
      <legend>Контактные данные</legend>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': nameError && nameMeta.touched }">
        <label for="name">Имя *</label>
        <input id="name" type="text" v-model="name" autocomplete="name"/>
        <p v-if="nameError && nameMeta.touched" class="order-form__error">
          {{ nameError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': emailError && emailMeta.touched }">
        <label for="email">E-mail *</label>
        <input id="email" type="email" v-model="email" autocomplete="email"/>
        <p v-if="emailError && emailMeta.touched" class="order-form__error">
          {{ emailError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': phoneError && phoneMeta.touched }">
        <label for="phone">Телефон *</label>
        <input
          id="phone"
          type="tel"
          v-model="phone"
          placeholder="+7 (___) ___-__-__"
          autocomplete="tel"
        />
        <p v-if="phoneError && phoneMeta.touched" class="order-form__error">
          {{ phoneError }}
        </p>
      </div>
    </fieldset>

    <fieldset class="order-form__section">
      <legend>Адрес доставки</legend>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': cityError && cityMeta.touched }">
        <label for="city">Город *</label>
        <input id="city" type="text" v-model="city"/>
        <p v-if="cityError && cityMeta.touched" class="order-form__error">
          {{ cityError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': addressError && addressMeta.touched }">
        <label for="address">Улица, дом, квартира *</label>
        <input id="address" type="text" v-model="address"/>
        <p v-if="addressError && addressMeta.touched" class="order-form__error">
          {{ addressError }}
        </p>
      </div>

      <div
        class="order-form__field order-form__field--small"
        :class="{ 'order-form__field--error': postalCodeError && postalMeta.touched }"
      >
        <label for="postalCode">Индекс *</label>
        <input id="postalCode" type="text" v-model="postalCode"/>
        <p v-if="postalCodeError && postalMeta.touched" class="order-form__error">
          {{ postalCodeError }}
        </p>
      </div>
    </fieldset>

    <fieldset class="order-form__section">
      <legend>Доставка и оплата</legend>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': deliveryTypeError && deliveryMeta.touched }">
        <label>Способ доставки *</label>

        <div class="order-form__options">
          <label>
            <input type="radio" value="courier" v-model="deliveryType"/>
            Курьером
          </label>
          <label>
            <input type="radio" value="pickup" v-model="deliveryType"/>
            Самовывоз
          </label>
        </div>

        <p v-if="deliveryTypeError && deliveryMeta.touched" class="order-form__error">
          {{ deliveryTypeError }}
        </p>
      </div>

      <div class="order-form__field"
           :class="{ 'order-form__field--error': paymentTypeError && paymentMeta.touched }">
        <label>Способ оплаты *</label>

        <div class="order-form__options">
          <label>
            <input type="radio" value="card" v-model="paymentType"/>
            Картой онлайн
          </label>
          <label>
            <input type="radio" value="cash" v-model="paymentType"/>
            Наличными / картой при получении
          </label>
        </div>

        <p v-if="paymentTypeError && paymentMeta.touched" class="order-form__error">
          {{ paymentTypeError }}
        </p>
      </div>
    </fieldset>

    <div class="order-form__footer">
      <label
        class="order-form__checkbox"
        :class="{ 'order-form__field--error': agreeError && agreeMeta.touched }"
      >
        <input type="checkbox" v-model="agree"/>
        <span>Я принимаю условия обработки персональных данных и оферту *</span>
      </label>
      <p v-if="agreeError && agreeMeta.touched" class="order-form__error">
        {{ agreeError }}
      </p>

      <button type="submit" class="order-form__submit" :disabled="isSubmitting">
        Оформить заказ
      </button>
    </div>
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

.order-form__field--small {
  max-width: 200px;
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

.order-form__options {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.order-form__checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.order-form__submit {
  margin-top: 16px;
  padding: 10px 16px;
}
</style>
