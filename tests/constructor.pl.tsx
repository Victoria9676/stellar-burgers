import { expect, test } from '@playwright/test';

test.describe('add ingredients to constructor works correctly', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
    });
    await page.routeFromHAR('./tests/hars/auth-user.har', {
      url: '**/api/auth/user',
    });
    await page.routeFromHAR('./tests/hars/orders.har', {
      url: '**/api/orders',
    });

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      document.cookie = 'accessToken=fake-access-token; path=/';
    });

    await page.goto('/');
  });

  test('добавление булки в конструктор', async ({ page }) => {
    const bun = page.locator('li').filter({ hasText: 'Краторная булка N-200i' });

    await bun.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page.getByTestId('constructor-bun-1').getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();
    await expect(
      page.getByTestId('constructor-bun-2').getByText('Краторная булка N-200i (низ)')
    ).toBeVisible();
  });

  test('добавление начинки в конструктор', async ({ page }) => {
    const ingredient = page.locator('li').filter({ hasText: 'Соус Spicy-X' });

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page
        .getByTestId('constructor-ingredients')
        .getByText('Соус Spicy-X', { exact: true })
    ).toBeVisible();
  });

  test('открытие модального окна ингредиента', async ({ page }) => {
    const ingredient = page
      .locator('li')
      .filter({ hasText: 'Соус Spicy-X' })
      .getByRole('link');

    await ingredient.click();

    const modal = page.getByTestId('modal');
    await expect(modal.getByRole('heading', { name: 'Детали ингредиента' })).toBeVisible(
      { timeout: 10_000 }
    );
    await expect(modal.getByRole('heading', { name: 'Соус Spicy-X' })).toBeVisible();
  });

  test('закрытие модального окна по клику на крестик', async ({ page }) => {
    const ingredient = page
      .locator('li')
      .filter({ hasText: 'Соус Spicy-X' })
      .getByRole('link');

    await ingredient.click();

    const modalTitle = page
      .getByTestId('modal')
      .getByRole('heading', { name: 'Детали ингредиента' });

    await expect(modalTitle).toBeVisible({ timeout: 10_000 });

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modalTitle).not.toBeVisible();
  });

  test('закрытие модального окна по клику на оверлей', async ({ page }) => {
    const ingredient = page
      .locator('li')
      .filter({ hasText: 'Соус Spicy-X' })
      .getByRole('link');

    await ingredient.click();

    const modalTitle = page
      .getByTestId('modal')
      .getByRole('heading', { name: 'Детали ингредиента' });

    await expect(modalTitle).toBeVisible({ timeout: 10_000 });

    const overlay = page.getByTestId('modal-overlay');
    await overlay.click({ position: { x: 10, y: 10 } });

    await expect(modalTitle).not.toBeVisible();
  });

  test('создание заказа и очистка конструктора', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Test User' })).toBeVisible();

    const bun = page.locator('li').filter({ hasText: 'Краторная булка N-200i' });
    await bun.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page.getByTestId('constructor-bun-1').getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();

    const ingredient = page.locator('li').filter({ hasText: 'Соус Spicy-X' });
    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page
        .getByTestId('constructor-ingredients')
        .getByText('Соус Spicy-X', { exact: true })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.getByTestId('modal');
    await expect(modal.getByText('12345')).toBeVisible();

    await expect(
      page.getByTestId('constructor').getByText('Выберите булки').first()
    ).toBeVisible();
    await expect(
      page.getByTestId('constructor').getByText('Выберите начинку')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modal.getByText('12345')).not.toBeVisible();
  });
});
