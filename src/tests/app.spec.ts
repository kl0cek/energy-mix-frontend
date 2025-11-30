import { test, expect } from '@playwright/test';

test.describe('Energy Mix Application', () => {
  test('should display energy mix charts and calculate optimal charging window', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('Miks Energetyczny UK');

    await page.waitForSelector('canvas', { timeout: 10000 });

    const charts = page.locator('canvas');
    await expect(charts).toHaveCount(3);

    await expect(page.getByText('Dzisiaj')).toBeVisible();
    await expect(page.getByText('Jutro')).toBeVisible();
    await expect(page.getByText('Pojutrze')).toBeVisible();

    const durationInput = page.locator('input[type="number"]');
    await expect(durationInput).toBeVisible();

    await durationInput.fill('4');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await page.waitForSelector('text=Wynik optymalizacji', { timeout: 10000 });

    await expect(page.getByText('Wynik optymalizacji')).toBeVisible();
    await expect(page.getByText('Początek ładowania')).toBeVisible();
    await expect(page.getByText('Koniec ładowania')).toBeVisible();
    await expect(page.getByText('Średni udział czystej energii')).toBeVisible();

    const cleanEnergyPercentage = page.locator('text=/\\d+\\.\\d+%/').first();
    await expect(cleanEnergyPercentage).toBeVisible();
  });
});