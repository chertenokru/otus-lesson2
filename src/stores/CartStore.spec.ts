import {beforeEach, describe, expect, test} from 'vitest'
import {useCartStore} from "@/stores/CartStore.ts";
import type {Product} from "@/model/Product.ts";
import {createPinia, setActivePinia} from "pinia";


const product1: Product = {
  category: "1",
  description: "desc1",
  id: 1,
  image: "image1",
  price: 100,
  rating: {
    "rate": 5,
    "count": 1
  },
  title: "product1"
}
const product2: Product = {
  category: "2",
  description: "desc2",
  id: 2,
  image: "image2",
  price: 200,
  rating: {
    "rate": 3,
    "count": 5
  },
  title: "product2"
}

describe('CartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })
  test('Добавляет товар', () => {
      const store = useCartStore()
      store.clear()
      store.addItem(product1)
      expect(store.hasItem(product1.id)).toBe(1)
    }
  )
  test('суммирует одинаковые товары', () => {
    const store = useCartStore()
    store.clear()
    store.addItem(product1)
    store.addItem(product1)
    expect(store.hasItem(product1.id)).toBe(2)
  })
  test('не суммирует разные товары', () => {
      const store = useCartStore()
      store.clear()
      store.addItem(product1)
      store.addItem(product2)
      expect(store.hasItem(product1.id)).toBe(1)
      expect(store.hasItem(product2.id)).toBe(1)
    }
  )
  test('уменьшает количество товара', () => {
      const store = useCartStore()
      store.clear()
      store.addItem(product1)
      store.addItem(product1)
      expect(store.hasItem(product1.id)).toBe(2)
      store.removeItem(product1.id)
      expect(store.hasItem(product1.id)).toBe(1)
    }
  )
  test('удаляет товар', () => {
      const store = useCartStore()
      store.clear()
      store.addItem(product1)
      store.addItem(product2)
      expect(store.hasItem(product1.id)).toBe(1)
      expect(store.hasItem(product2.id)).toBe(1)
      store.removeItem(product1.id)
      expect(store.hasItem(product1.id)).toBe(0)
      expect(store.hasItem(product2.id)).toBe(1)
      store.removeItem(product2.id)
      expect(store.hasItem(product1.id)).toBe(0)
      expect(store.hasItem(product2.id)).toBe(0)

    }
  )
  test('очищает корзину', () => {
      const store = useCartStore()
      store.clear()
      store.addItem(product1)
      store.addItem(product2)
      expect(store.hasItem(product1.id)).toBe(1)
      expect(store.hasItem(product2.id)).toBe(1)
      expect(store.items.length).toBe(2)
      store.clear()
      expect(store.hasItem(product1.id)).toBe(0)
      expect(store.hasItem(product2.id)).toBe(0)
      store.removeItem(product2.id)
      expect(store.hasItem(product1.id)).toBe(0)
      expect(store.hasItem(product2.id)).toBe(0)
      expect(store.items.length).toBe(0)
    }
  )
  test('удаление несуществующего товара', () => {
      const store = useCartStore()
      store.clear()
      store.removeItem(product2.id)
      expect(store.items.length).toBe(0)
    }
  )
  test('сохраняет и загружает из localStorage', () => {
      const store = useCartStore()
      store.clear()
      store.addItem(product1)
      store.addItem(product2)
      expect(store.hasItem(product1.id)).toBe(1)
      expect(store.hasItem(product2.id)).toBe(1)
      expect(store.items.length).toBe(2)
      // новый экземпляр pinia
      setActivePinia(createPinia())
      // должен загрузить из localStorage
      const store1 = useCartStore()
      // старый очищаем и localStorage очищается (проверка, что сторы не связаны)
      store.clear()
      // смотрим что загрузилось во второй экземпляр pinia при создании
      expect(store1.items.length).toBe(2)
    }
  )
  test('проверяем items,totalCount,totalPrice', () => {
      const store = useCartStore()
      store.clear()
      // 1ый товар
      store.addItem(product1)
      expect(store.items.length).toBe(1)
      expect(store.items).toEqual(expect.arrayContaining(
        [
          expect.objectContaining({
            product: expect.objectContaining({id: product1.id}),
            count: 1,
          })]))
      expect(store.totalCount).toBe(1)
      expect(store.totalPrice).toBe(100)
      // 2ой тот же товар
      store.addItem(product1)
      expect(store.items.length).toBe(1)
      expect(store.items).toEqual(expect.arrayContaining(
        [
          expect.objectContaining({
            product: expect.objectContaining({id: product1.id}),
            count: 2,
          })]))
      expect(store.totalCount).toBe(2)
      expect(store.totalPrice).toBe(200)
      // 3ий другой товар
      store.addItem(product2)
      expect(store.items.length).toBe(2)
      expect(store.items).toEqual(expect.arrayContaining(
        [
          expect.objectContaining({
            product: expect.objectContaining({id: product1.id}),
            count: 2,
          }),
          expect.objectContaining({
            product: expect.objectContaining({id: product2.id}),
            count: 1,
          })
        ]))
      expect(store.totalCount).toBe(3)
      expect(store.totalPrice).toBe(400)
    }
  )
})
