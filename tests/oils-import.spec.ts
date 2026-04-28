import { test, expect } from "@playwright/test";
import path from "path";
import { execSync } from "child_process";

const FIXTURE = path.join(__dirname, "fixtures", "Shell new price 01.09.2023.xlsx");

function clearOils() {
  try {
    execSync(
      `sqlite3 prisma/dev.db "DELETE FROM Product WHERE category='OILS'"`,
      { stdio: "ignore" }
    );
  } catch {
    // ignore
  }
}

async function login(page: import("@playwright/test").Page) {
  await page.goto("/admin/login");
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("petral2024");
  await page.getByRole("button", { name: /Вход/ }).click();
  await page.waitForURL("/admin", { timeout: 15000 });
}

test.describe("Oils Excel import", () => {
  test("imports Shell pricelist, then re-imports as updates", async ({ page }) => {
    clearOils();
    await login(page);
    await page.goto("/admin/products/import");

    await expect(page.getByRole("heading", { name: /Импорт на масла/ })).toBeVisible();

    await page.locator('input[type="file"]').setInputFiles(FIXTURE);
    await page.getByRole("button", { name: /Импортирай/ }).click();

    await expect(page.getByText(/Готово:/)).toBeVisible({ timeout: 30000 });
    await expect(page.getByText(/Shell/).first()).toBeVisible();

    const createdRow = page.locator("dt:has-text('Нови продукти') + dd");
    const updatedRow = page.locator("dt:has-text('Обновени') + dd");
    const created1 = parseInt((await createdRow.textContent()) || "0");
    const updated1 = parseInt((await updatedRow.textContent()) || "0");
    expect(created1).toBeGreaterThan(0);
    expect(updated1).toBe(0);

    await page.locator('input[type="file"]').setInputFiles(FIXTURE);
    await page.getByRole("button", { name: /Импортирай/ }).click();
    await expect(page.getByText(/Готово:/).last()).toBeVisible({ timeout: 30000 });

    const created2 = parseInt((await createdRow.textContent()) || "0");
    const updated2 = parseInt((await updatedRow.textContent()) || "0");
    expect(created2).toBe(0);
    expect(updated2).toBeGreaterThan(0);
  });

  test("imported oils show on /oils with viscosity filter", async ({ page }) => {
    await page.goto("/oils");

    await expect(page.getByRole("heading", { name: "Масла" })).toBeVisible();
    await expect(page.locator('select').filter({ hasText: /Всички/ }).first()).toBeVisible();

    const viscositySelect = page.locator('label:has-text("Вискозитет") + select');
    await expect(viscositySelect).toBeVisible();
    await viscositySelect.selectOption("15W40");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("text=/Rimula/").first()).toBeVisible();
  });

  test("oil detail page shows per-unit and total price", async ({ page }) => {
    await page.goto("/oils?viscosity=15W40");
    const firstCard = page.locator("a[href^='/catalog/']").first();
    await firstCard.click();
    await expect(page.locator("text=/лв\\/(L|kg)/").first()).toBeVisible();
    await expect(page.locator("text=/Обща цена за опаковка/")).toBeVisible();
  });
});
