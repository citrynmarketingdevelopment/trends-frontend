import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  ["/services", "Auto Services in Bakersfield"],
  ["/services/collision", "Collision Repair in Bakersfield"],
  ["/services/mechanical", "Auto Repair in Bakersfield"],
  ["/services/roadside", "Towing in Bakersfield"],
  ["/services/tires-alignment", "Wheel Alignment in Bakersfield"],
  ["/services/fleet-maintenance", "Fleet Maintenance in Bakersfield"],
  ["/about", "Trends Collision Center in Bakersfield"],
  ["/certifications", "Credentials behind the repair."],
  ["/contact", "Tell us what brings you in."],
] as const;

test("service heroes select the requested desktop and mobile photography", async ({ page }) => {
  const heroImages = [
    {
      path: "/services/roadside",
      desktop: "/images/Fleet/roadside-towing-hero.webp",
      mobile: "/images/Fleet/roadside-towing-verticle.webp",
    },
    {
      path: "/services/fleet-maintenance",
      desktop: "/images/Fleet/fleet-hero.webp",
      mobile: "/images/Fleet/Fleet-verticle.webp",
    },
    {
      path: "/services/mechanical",
      desktop: "/images/Mechanical/Mechinical-hero.webp",
      mobile: "/images/Mechanical/Mechinical-hero.webp",
    },
  ] as const;

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const service of heroImages) {
      await page.goto(service.path);
      const heroImage = page.locator('section[aria-labelledby="page-heading"] img');
      await expect(heroImage).toHaveCount(1);
      await expect
        .poll(() =>
          heroImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
        )
        .toBe(true);
      const selectedImage = await heroImage.evaluate((image: HTMLImageElement) => {
        const url = new URL(image.currentSrc);
        return url.searchParams.get("url") ?? url.pathname;
      });
      expect(selectedImage).toBe(width === 390 ? service.mobile : service.desktop);
    }
  }
});

test("service hero content fits in the viewport", async ({ page }) => {
  for (const viewport of [
    { width: 1368, height: 768 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const path of [
      "/services/collision",
      "/services/mechanical",
      "/services/roadside",
      "/services/tires-alignment",
      "/services/fleet-maintenance",
    ]) {
      await page.goto(path);
      const hero = page.locator('section[aria-labelledby="page-heading"]');
      const heroBox = await hero.boundingBox();
      const lastActionBox = await hero.locator("a").last().boundingBox();

      expect(heroBox).not.toBeNull();
      expect(lastActionBox).not.toBeNull();
      if (heroBox && lastActionBox) {
        expect(heroBox.height).toBeLessThanOrEqual(viewport.height);
        expect(lastActionBox.y + lastActionBox.height).toBeLessThanOrEqual(viewport.height);
      }
    }
  }
});

test("premium materials moved from home to Collision and About uses the requested shop photo", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Quality starts with what we use." }),
  ).toHaveCount(0);

  await page.goto("/services/collision");
  await expect(
    page.getByRole("heading", { level: 2, name: "Quality starts with what we use." }),
  ).toBeVisible();

  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Trends Collision Center in Bakersfield",
  );
  await expect(page.locator('img[src*="IMG_4413.jpeg"]')).toBeVisible();
});

for (const [path, title] of pages) {
  test(`@a11y ${path} renders complete, accessible content at desktop and mobile widths`, async ({
    page,
  }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Bakersfield/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Bakersfield/,
    );
    await expect(page.getByRole("contentinfo")).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow).toBe(false);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}

test("service submenu works with keyboard, hover, Escape, and mobile navigation", async ({
  page,
}) => {
  await page.goto("/services");
  const services = page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Services", exact: true });
  await services.focus();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page.locator("#service-navigation").getByRole("link", { name: "Collision", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(services).toBeFocused();
  await expect(services).toHaveAttribute("aria-expanded", "false");
  await services.hover();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("button", { name: "Close menu", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNavigation).toBeVisible();
  const closeMenu = page.getByRole("button", { name: "Close menu", exact: true });
  await expect(closeMenu).toBeFocused();
  const closeBox = await closeMenu.boundingBox();
  expect(closeBox?.x).toBeLessThanOrEqual(20);
  expect(closeBox?.y).toBeLessThanOrEqual(20);
  const menuBox = await primaryNavigation.boundingBox();
  expect(menuBox).toMatchObject({ x: 0, y: 0, width: 390, height: 844 });
  expect(
    await primaryNavigation.evaluate((element) => getComputedStyle(element).backdropFilter),
  ).not.toBe("none");
  expect(await page.locator("html").evaluate((element) => element.style.overflow)).toBe("hidden");
  const startRepair = primaryNavigation.getByRole("link", {
    name: "Start a repair",
    exact: true,
  });
  expect(await startRepair.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe(
    "none",
  );
  const insuranceClaims = primaryNavigation.getByRole("link", {
    name: "Insurance claims",
    exact: true,
  });
  await expect(insuranceClaims).toBeVisible();
  await expect(insuranceClaims).toHaveAttribute("href", "/insurance-claims");
  const [startRepairBox, insuranceClaimsBox] = await Promise.all([
    startRepair.boundingBox(),
    insuranceClaims.boundingBox(),
  ]);
  expect(startRepairBox).not.toBeNull();
  expect(insuranceClaimsBox).not.toBeNull();
  if (startRepairBox && insuranceClaimsBox) {
    expect(insuranceClaimsBox.y).toBeGreaterThan(startRepairBox.y + startRepairBox.height);
  }
  const insuranceStyle = await insuranceClaims.evaluate((element) => ({
    borderColor: getComputedStyle(element).borderColor,
    boxShadow: getComputedStyle(element).boxShadow,
  }));
  expect(insuranceStyle.borderColor).toBe("rgb(255, 255, 255)");
  expect(insuranceStyle.boxShadow).not.toBe("none");
  const homeLink = primaryNavigation.getByRole("link", { name: "Home", exact: true });
  const homeBox = await homeLink.boundingBox();
  expect(homeBox).not.toBeNull();
  if (homeBox) expect(Math.abs(homeBox.x + homeBox.width / 2 - 195)).toBeLessThan(2);
  const homeType = await homeLink.evaluate((element) => ({
    fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
    fontWeight: Number.parseInt(getComputedStyle(element).fontWeight, 10),
  }));
  expect(homeType.fontSize).toBeGreaterThanOrEqual(30);
  expect(homeType.fontWeight).toBeGreaterThanOrEqual(700);

  const serviceNavigation = page.locator("#service-navigation");
  const serviceToggle = primaryNavigation.getByRole("button", {
    name: "Expand service pages",
    exact: true,
  });
  await expect(serviceNavigation).toBeHidden();
  await expect(serviceToggle).toHaveAttribute("aria-expanded", "false");
  await serviceToggle.click();
  await expect(serviceNavigation).toBeVisible();
  await expect(
    primaryNavigation.getByRole("button", { name: "Collapse service pages", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .locator("#service-navigation")
    .getByRole("link", { name: "Mechanical", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services\/mechanical$/);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("service feature uses one full background image and service cards share the home treatment", async ({
  page,
}) => {
  await page.goto("/services/mechanical");
  const feature = page.locator("section").filter({
    has: page.getByRole("heading", { name: "More than what you can see.", exact: true }),
  });
  await expect(feature.locator("img")).toHaveCount(1);

  const capabilities = page.locator("section").filter({
    has: page.getByRole("heading", {
      name: "Mechanical repairs for your vehicle",
      exact: true,
    }),
  });
  await expect(capabilities.locator("article")).toHaveCount(4);
  for (const number of ["01", "02", "03", "04"]) {
    await expect(capabilities.getByText(number, { exact: true })).toBeVisible();
  }
});

test("service inquiry CTAs preselect the service and FAQs disclose answers", async ({ page }) => {
  await page.goto("/services/mechanical");
  await page
    .locator("summary")
    .filter({ hasText: "What mechanical concerns can I bring to Trends?" })
    .click();
  await expect(page.getByText(/Contact us about warning lights/)).toBeVisible();
  await page.getByRole("link", { name: "Let’s talk about your vehicle" }).click();
  await expect(page.getByLabel("Service *", { exact: true })).toHaveValue("mechanical");
  await page.goto("/contact?service=unknown");
  await expect(page.getByLabel("Service *", { exact: true })).toHaveValue("general");
});

test("unknown service routes return a genuine 404", async ({ page }) => {
  expect((await page.goto("/services/not-a-service"))?.status()).toBe(404);
});
