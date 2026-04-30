import { test, expect } from '@playwright/test';

test.describe('Composant Add - test E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/add');
  });

  test('doit afficher les deux inputs et le bouton Sum', async ({ page }) => {
    const inputs = page.locator('input[type="text"]');
    await expect(inputs).toHaveCount(2);
    await expect(page.getByRole('button', { name: 'Sum' })).toBeVisible();
    await expect(page.locator('#result')).toHaveText('0');
  });

  test('doit additionner deux nombres et afficher le résultat puis prendre une capture', async ({
    page,
  }, testInfo) => {
    const inputs = page.locator('input[type="text"]');

    await inputs.nth(0).fill('12');
    await inputs.nth(1).fill('30');

    await page.getByRole('button', { name: 'Sum' }).click();

    const result = page.locator('#result');
    await expect(result).toHaveText('42');

    const screenshot = await page.screenshot({
      path: 'e2e/screenshots/add-after-click.png',
      fullPage: true,
    });

    await testInfo.attach('add-after-click', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('doit gérer une addition avec des nombres négatifs', async ({ page }) => {
    const inputs = page.locator('input[type="text"]');

    await inputs.nth(0).fill('-5');
    await inputs.nth(1).fill('3');

    await page.getByRole('button', { name: 'Sum' }).click();

    await expect(page.locator('#result')).toHaveText('-2');
  });

  test('ne doit pas concaténer mais bien additionner', async ({ page }) => {
    const inputs = page.locator('input[type="text"]');

    await inputs.nth(0).fill('5');
    await inputs.nth(1).fill('7');

    await page.getByRole('button', { name: 'Sum' }).click();

    await expect(page.locator('#result')).toHaveText('12');
    await expect(page.locator('#result')).not.toHaveText('57');
  });
});
