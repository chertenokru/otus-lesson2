import * as v from 'valibot';

export const NewProductSchema = v.object({
  title: v.pipe(
    v.string('Введите наименование товара'),
    v.trim(),
    v.minLength(2, 'Имя должно быть не короче 2 символов'),
    v.maxLength(100, 'Имя должно быть не длиннее 100 символов'),
  ),
  category: v.pipe(
    v.string('Выберите категорию товара'),
    v.trim(),
    v.minLength(2, 'Категория должна быть не короче 2 символов'),
  ),
  description: v.pipe(
    v.string('Введите описание товара'),
    v.trim(),
    v.minLength(5, 'Описание должно быть не короче 5 символов'),
    v.maxLength(500, 'Описание должно быть не длиннее 100 символов'),
  ),
  image: v.pipe(
    v.string('Укажите путь к изображению товара'),
    v.trim(),
    v.minLength(8, 'Строка должно быть не короче 8 символов'),
  ),
  price: v.pipe(
    v.number('Укажите цену товара'),
    v.gtValue(0, 'Цена должна быть больше 0'),
  ),

})


export type NewProductValues = v.InferInput<typeof NewProductSchema>;
