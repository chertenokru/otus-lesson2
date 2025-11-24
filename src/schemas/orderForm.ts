import * as v from 'valibot';

export const OrderSchema = v.object({
  name: v.pipe(
    v.string('Введите имя'),
    v.trim(),
    v.minLength(2, 'Имя должно быть не короче 2 символов'),
    v.maxLength(100, 'Имя должно быть не длиннее 100 символов'),
  ),

  email: v.pipe(
    v.string('Введите e-mail'),
    v.trim(),
    v.email('Некорректный e-mail'),
    v.maxLength(100, 'E-mail слишком длинный'),
  ),

  phone: v.pipe(
    v.string('Введите номер телефона'),
    v.trim(),
    v.minLength(10, 'Телефон слишком короткий'),
    v.maxLength(20, 'Телефон слишком длинный'),
  ),

  city: v.pipe(
    v.string('Укажите город'),
    v.trim(),
    v.minLength(2, 'Город должен быть не короче 2 символов'),
    v.maxLength(100, 'Название города слишком длинное'),
  ),

  address: v.pipe(
    v.string('Укажите адрес'),
    v.trim(),
    v.minLength(5, 'Адрес должен быть не короче 5 символов'),
    v.maxLength(200, 'Адрес слишком длинный'),
  ),

  postalCode: v.pipe(
    v.string('Укажите индекс'),
    v.trim(),
    v.regex(/^[0-9]{5,6}$/, 'Индекс должен содержать 5–6 цифр'),
  ),

  // варианты: 'courier' | 'pickup'
  deliveryType: v.picklist(
    ['courier', 'pickup'] as const,
    'Выберите способ доставки',
  ),

  // варианты: 'card' | 'cash'
  paymentType: v.picklist(
    ['card', 'cash'] as const,
    'Выберите способ оплаты',
  ),

  // чекбокс согласия: должен быть true
  agree: v.pipe(
    v.boolean('Подтвердите согласие с условиями'),
    v.check((value) => value === true, 'Необходимо согласиться с условиями'),
  ),
});

export type OrderFormValues = v.InferInput<typeof OrderSchema>;
// export type OrderFormOutput = v.InferOutput<typeof OrderSchema>;
