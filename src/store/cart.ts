import type {Product} from '@/model/Product.ts';

export type CartItem =
  {
    product: Product,
    count: number,
  };
// Один объект корзины для всего приложения
const cart = {
  items: [] as CartItem[],


  addItem(product: Product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.count++;
    } else {
      this.items.push({product: {...product}, count: 1});
      console.log(`Товар ${product.title} добавлен в корзину`);
    }
    this.save();
  },


  removeItem(productId: number) {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      if (this.items[index] && this.items[index].count > 1) {
        this.items[index].count--;
      } else {
        this.items.splice(index, 1);
      }
    }
    this.save();
  },

  // Очистить корзину
  clear() {
    this.items = [];
    this.save();
  },

  // Получить количество товаров в корзине
  getCount(): number {
    return this.items.reduce((total, item) => total + item.count, 0)
  },

  // Получить общую стоимость товаров в корзине
  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.count, 0);
  },

  // Проверить, есть ли товар в корзине
  hasItem(productId: number): number {
    return this.items.find(item => item.product.id === productId)?.count ?? 0;
  },

  // Сохранить корзину в localStorage
  save() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Не удалось сохранить корзину в localStorage', e);
    }
  },

  // Загрузить корзину из localStorage
  load() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
        console.log(`Корзина загружена. Найдено ${this.items.length} товаров`);
      }
    } catch (e) {
      console.warn('Не удалось загрузить корзину из localStorage', e);
    }
  }
};

// Загружаем корзину при инициализации
cart.load();

export default cart;
