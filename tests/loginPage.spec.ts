import { test, expect } from "@playwright/test";

test("Cenário 1: Acessar a pagina de Login", async ({ page }) => {
    await page.goto("/");

  });