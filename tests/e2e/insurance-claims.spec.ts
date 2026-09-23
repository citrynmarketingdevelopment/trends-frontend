import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("insurance claims journey links the home hero to guidance and repair contact", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "INSURANCE CLAIMS", exact: true }).first().click();
  await expect(page).toHaveURL(/\/insurance-claims$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Insurance claims.\nA clear next step.",
  );

  const hero = page.locator('section[aria-labelledby="page-heading"]');
  expect(await hero.evaluate((element) => element.nextElementSibling?.id)).toBe(
    "insurance-companies",
  );

  await page.getByRole("link", { name: "01 / Start a claim" }).click();
  await expect(page).toHaveURL(/#claim-steps$/);
  const stepsTop = await page
    .locator("#claim-steps")
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(stepsTop).toBeGreaterThan(75);
  expect(stepsTop).toBeLessThan(200);

  const track = page.locator("[data-insurance-logo-track]");
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.getByRole("button", { name: "Pause insurance logos" }).click();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Resume insurance logos" }).click();
  await expect(track).toHaveCSS("animation-play-state", "running");

  await page
    .locator("summary")
    .filter({ hasText: "Can Trends file my insurance claim for me?" })
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "open the claim directly with the insurance company",
  );
  await expect(page.getByRole("link", { name: "Arrange vehicle pickup" })).toHaveAttribute(
    "href",
    "tel:+16613982029",
  );
  await page.getByRole("link", { name: "Talk about your repair" }).click();
  await expect(page).toHaveURL(/\/contact\?service=collision$/);
});

test("@a11y insurance guidance fits desktop and mobile and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/insurance-claims");
  await expect(page).toHaveTitle(/Auto Insurance Claims Guide/);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
      false,
    );
    if (width === 390 || width === 1440) {
      const heroImage = page.locator('section[aria-labelledby="page-heading"] img');
      const selectedImage = await heroImage.evaluate((image: HTMLImageElement) => {
        const url = new URL(image.currentSrc);
        return url.searchParams.get("url") ?? url.pathname;
      });
      expect(selectedImage).toBe(
        width === 390
          ? "/images/insurance/insurance-hero-mobile.webp"
          : "/images/insurance/insurance-hero-desktop.webp",
      );
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  const track = page.locator("[data-insurance-logo-track]");
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(track.getByRole("img")).toHaveCount(6);
  for (const logo of await track.getByRole("img").all()) {
    await expect(logo).toBeVisible();
    await expect
      .poll(() => logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
});
