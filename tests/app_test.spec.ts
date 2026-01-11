import {expect, test} from "@playwright/test";

test.describe("App", () => {


  test('test', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'great outerwear jackets for' }).click();
    await page.getByRole('button', { name: 'Добавить в корзину' }).click();
    await expect(page.getByRole('img', { name: 'great outerwear jackets for' })).toBeVisible();
    await page.getByText('В корзине -').click();
    await page.getByRole('link', { name: '🛒 Корзина (1)' }).click();
    await expect(page.getByRole('link', { name: 'Mens Cotton Jacket' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Корзина' })).toBeVisible();
    await expect(page.getByRole('main')).toContainText('55.99');
    await expect(page.getByRole('main')).toContainText('1');
    await expect(page.getByText('Общая стоимость: 55.99')).toBeVisible();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByText('2', { exact: true })).toBeVisible();
    await expect(page.getByText('Всего товаров: 2')).toBeVisible();
    await expect(page.getByText('Общая стоимость: 111.98')).toBeVisible();
    await page.getByRole('link', { name: 'Каталог' }).click();
    await page.getByRole('link', { name: 'Easy upgrade for faster boot' }).click();
    await expect(page.getByRole('img', { name: 'Easy upgrade for faster boot' })).toBeVisible();
    await page.getByRole('button', { name: 'Добавить в корзину' }).click();
    await expect(page.getByRole('link', { name: '🛒 Корзина (3)' })).toBeVisible();
    await page.getByRole('link', { name: '🛒 Корзина (3)' }).click();
    await expect(page.getByRole('link', { name: 'Mens Cotton Jacket' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'SanDisk SSD PLUS 1TB Internal' })).toBeVisible();
    await expect(page.getByText('Всего товаров: 3')).toBeVisible();
    await expect(page.getByText('Общая стоимость: 220.')).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Mens Cotton Jacket55.99-2+');
    await expect(page.getByRole('main')).toContainText('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s109-1+');
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
    await expect(page.getByText('Состав заказа:')).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Состав заказа: Товаров: 3 на сумму: 220.98 руб.');
    await expect(page.getByRole('heading', { name: 'Оформление заказа' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Имя *' }).click();
    await page.getByRole('textbox', { name: 'Имя *' }).fill('123213');
    await page.getByRole('textbox', { name: 'E-mail *' }).click();
    await page.getByRole('textbox', { name: 'E-mail *' }).fill('1231231@ED.RU');
    await page.getByRole('textbox', { name: 'Телефон *' }).click();
    await page.getByRole('textbox', { name: 'Телефон *' }).click();
    await page.getByRole('textbox', { name: 'Телефон *' }).fill('1111454534111');
    await page.getByRole('textbox', { name: 'Город *' }).click();
    await page.getByRole('textbox', { name: 'Город *' }).fill('34343');
    await page.getByRole('textbox', { name: 'Улица, дом, квартира *' }).click();
    await page.getByRole('textbox', { name: 'Улица, дом, квартира *' }).fill('434345T54G5G G454G4');
    await page.getByRole('textbox', { name: 'Улица, дом, квартира *' }).click();
    await page.getByRole('textbox', { name: 'Индекс *' }).click();
    await page.getByRole('textbox', { name: 'Индекс *' }).fill('34344');
    await page.getByRole('radio', { name: 'Курьером' }).check();
    await page.getByRole('radio', { name: 'Картой онлайн' }).check();
    await page.getByRole('checkbox', { name: 'Я принимаю условия обработки персональных данных и оферту *' }).check();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Заказ отправлен')
      await dialog.accept()
    })
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('navigation')).toContainText('Корзина (0)');
  });
})
