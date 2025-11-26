import {defineStore} from "pinia";
import type {Product} from "@/model/Product.ts";
import {computed, ref} from "vue";

export type CartItem =
  {
    product: Product,
    count: number,
  };


export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalCount = computed(() => {
    return items.value.reduce((total, item) => total + item.count, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.product.price * item.count, 0);
  })

  const addItem = (product: Product) => {
    const existingItem = items.value.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.count++;
    } else {
      items.value.push({product: {...product}, count: 1});
      console.log(`Товар ${product.title} добавлен в корзину`);
    }
    save();
  }

  const removeItem = (productId: number) => {
    const index = items.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      if (items.value[index] && items.value[index].count > 1) {
        items.value[index].count--;
      } else {
        items.value.splice(index, 1);
      }
    }
    save();
  }


  // Очистить корзину
  const clear = () => {
    items.value = [];
    save();
  }


  // Проверить, есть ли товар в корзине
  const hasItem = (productId: number): number => {
    return items.value.find(item => item.product.id === productId)?.count ?? 0;
  }


  // Сохранить корзину в localStorage
  const save = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(items.value));
    } catch (e) {
      console.warn('Не удалось сохранить корзину в localStorage', e);
    }
  }


  // Загрузить корзину из localStorage
  const load = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        items.value = JSON.parse(savedCart);
        console.log(`Корзина загружена. Найдено ${items.value.length} товаров`);
      }
    } catch (e) {
      console.warn('Не удалось загрузить корзину из localStorage', e);
    }
  }

  load()

  return {items, totalCount, totalPrice, addItem, removeItem, hasItem, clear,}
})
