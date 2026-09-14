import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, type Page, test } from "@playwright/test";

const LOGO_MODEL_PATH = "/models/trends-logo-new.glb";
const HERO_SHADER_PATH = "/shaders/hero-liquid-metal.glsl";
const CAR_MODEL_PATH = "/models/revuelto-web.glb";

async function disableWebGL(page: Page) {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = (() =>
      null) as typeof HTMLCanvasElement.prototype.getContext;
  });
}

async function useCapableDesktop(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperties(navigator, {
      connection: {
        configurable: true,
        get: () => ({ saveData: false }),
      },
      deviceMemory: {
        configurable: true,
        get: () => 8,
      },
      hardwareConcurrency: {
        configurable: true,
        get: () => 8,
      },
    });
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1280, height: 720 });
}

async function clickAtCenter(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

test("homepage loads the new dimensional logo without requesting the Revuelto at the hero", async ({
  page,
}) => {
  await useCapableDesktop(page);
  const requestedPaths: string[] = [];
  page.on("request", (request) => requestedPaths.push(new URL(request.url()).pathname));
  const logoResponse = page.waitForResponse(
    (response) => new URL(response.url()).pathname === LOGO_MODEL_PATH,
  );
  const shaderResponse = page.waitForResponse(
    (response) => new URL(response.url()).pathname === HERO_SHADER_PATH,
  );

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Auto Collision Center in Bakersfield",
    }),
  ).toBeAttached();
  const heroDisplayTitle = page.locator("[data-hero-display-title]");
  await expect(heroDisplayTitle.locator("span").nth(0)).toHaveText("Trends");
  await expect(heroDisplayTitle.locator("span").nth(1)).toHaveText("Collision Center");
  await expect(page.getByAltText("Trends logo").first()).toBeVisible();
  const heroVideo = page.locator("[data-hero-video]");
  await expect(heroVideo).toBeVisible();
  await expect(heroVideo).toHaveJSProperty("autoplay", true);
  await expect(heroVideo).toHaveJSProperty("loop", true);
  await expect(heroVideo).toHaveJSProperty("muted", true);

  const logo = await logoResponse;
  const shader = await shaderResponse;
  expect(logo.ok()).toBe(true);
  expect(shader.ok()).toBe(true);
  await expect(page.locator('[data-rotation="rotating"][data-ready="true"] canvas')).toHaveCount(1);
  expect(requestedPaths).not.toContain(CAR_MODEL_PATH);

  const canvas = page.locator('[data-rotation="rotating"] canvas');
  await canvas.click({ position: { x: 80, y: 80 } });
  await expect(page.locator('[data-rotation="rotating"]')).toBeVisible();
  await expect(page.locator('[data-rotation="dragging"]')).toHaveCount(0);
});

test("the branded hero loader covers the fallback until the enhanced scene is ready", async ({
  page,
}) => {
  await useCapableDesktop(page);
  await page.route(`**${HERO_SHADER_PATH}`, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await page.goto("/");

  const heroScene = page.locator("[data-attempt]");
  const loader = heroScene.locator("[data-hero-loader]");
  await expect(heroScene).toHaveAttribute("data-loading", "true");
  await expect(loader).toBeVisible();

  await expect(heroScene).toHaveAttribute("data-ready", "true", { timeout: 20_000 });
  await expect(heroScene).not.toHaveAttribute("data-loading", "true");
  await expect(loader).toHaveCSS("opacity", "0");
});

test("reduced motion keeps the enhanced hero but pauses its motion", async ({ page }) => {
  await useCapableDesktop(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const heroScene = page.locator('[data-rotation="paused"][data-ready="true"]');
  await expect(heroScene.locator("canvas")).toHaveCount(1);
  await expect(heroScene).not.toHaveAttribute("data-failed", "true");
});

test("a capable mobile browser loads the hero shader and 3D logo", async ({ page }) => {
  await useCapableDesktop(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.locator('[data-rotation="rotating"][data-ready="true"] canvas')).toHaveCount(1);
  const heroVideo = page.locator("[data-hero-video]");
  await expect(heroVideo).toBeVisible();
  await expect
    .poll(() => heroVideo.evaluate((video: HTMLVideoElement) => video.currentTime))
    .toBeGreaterThan(0);
});

test("the hero retries once after a transient WebGL context loss", async ({ page }) => {
  await useCapableDesktop(page);
  await page.goto("/");

  const heroScene = page.locator("[data-attempt]");
  const canvas = heroScene.locator("canvas");
  await expect(heroScene).toHaveAttribute("data-ready", "true");
  await canvas.dispatchEvent("webglcontextlost", { bubbles: false, cancelable: true });

  await expect(heroScene).toHaveAttribute("data-attempt", "1");
  await expect(heroScene).toHaveAttribute("data-ready", "true", { timeout: 20_000 });
  await expect(heroScene).not.toHaveAttribute("data-failed", "true");
  await expect(heroScene.locator("canvas")).toHaveCount(1);
});

test("service cards expand on desktop hover and return to the default reel", async ({ page }) => {
  await useCapableDesktop(page);
  await page.goto("/");

  const reel = page.locator("[data-service-reel]");
  await reel.scrollIntoViewIfNeeded();
  const cards = reel.locator("[data-service-card]");
  await expect(cards).toHaveCount(5);

  const widths = async () =>
    Promise.all(
      [0, 1, 2, 3, 4].map(async (index) => (await cards.nth(index).boundingBox())?.width ?? 0),
    );

  const initial = await widths();
  expect(initial[0]).toBeGreaterThan(initial[1] ?? 0);

  await cards.nth(2).hover();
  await expect
    .poll(async () => {
      const hovered = await widths();
      return (hovered[2] ?? 0) > (hovered[0] ?? 0);
    })
    .toBe(true);

  await page.mouse.move(0, 0);
  await expect
    .poll(async () => {
      const reset = await widths();
      return (reset[0] ?? 0) > (reset[1] ?? 0);
    })
    .toBe(true);

  const dealerRail = page.locator("[data-dealer-logo-track]");
  const dealerViewport = page.getByRole("region", {
    name: "Vehicle makes represented by dealers that trust Trends",
  });
  await dealerViewport.scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { level: 3, name: "Dealers that trust Trends" }),
  ).toBeVisible();
  await expect(page.getByAltText("Hyundai")).toBeVisible();
  for (const make of ["Ram", "Kia", "Corvette"]) {
    const logo = page.getByAltText(make);
    await expect(logo).toBeVisible();
    await expect
      .poll(() =>
        logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
      )
      .toBe(true);
  }
  expect(await dealerRail.evaluate((element) => getComputedStyle(element).animationDuration)).toBe(
    "46s",
  );
  await dealerViewport.hover();
  expect(await dealerRail.evaluate((element) => getComputedStyle(element).animationPlayState)).toBe(
    "running",
  );
});

test("service imagery and homepage section order match the current launch layout", async ({
  page,
}) => {
  await disableWebGL(page);
  await page.goto("/");

  await expect(page.locator('img[src*="collision-repair-crashed-car.webp"]').first()).toBeVisible();
  await expect(page.locator('img[src*="roadside-tow-truck.webp"]').first()).toBeVisible();
  await expect(page.locator('section[aria-labelledby="repair-services-heading"] img')).toHaveCount(
    4,
  );

  const sections = page.locator("#main-content > section");
  await expect(sections.nth(2)).toContainText("Full visibility.");
  const trackingIndex = await sections.evaluateAll((items) =>
    items.findIndex((item) => item.textContent?.includes("Full visibility.")),
  );
  const certificationIndex = await sections.evaluateAll((items) =>
    items.findIndex((item) => item.textContent?.includes("Credentials behind the repair.")),
  );
  const repairServicesIndex = await sections.evaluateAll((items) =>
    items.findIndex((item) => item.textContent?.includes("Everything we do, under one roof.")),
  );
  expect(trackingIndex).toBe(2);
  expect(certificationIndex).toBeGreaterThan(trackingIndex);
  expect(repairServicesIndex).toBe(certificationIndex + 1);
});

test("supplied certifications filter and update their detail panel", async ({ page }) => {
  await useCapableDesktop(page);
  await page.goto("/");

  const section = page.locator("#certifications");
  await section.scrollIntoViewIfNeeded();
  await expect(
    section.getByRole("heading", { level: 2, name: "Credentials behind the repair." }),
  ).toBeVisible();
  await expect(section.locator("[data-certification-grid] button")).toHaveCount(6);
  await expect(
    section.getByRole("button", { name: "OEM certifications", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(section.locator('img[src*="training-industry-03.webp"]')).toHaveCount(2);

  await section.getByRole("button", { name: "OEM certifications", exact: true }).click();
  await expect(section.locator("[data-certification-grid] button")).toHaveCount(6);
  await section
    .getByRole("button", {
      name: "Kia Recognized Collision Repair Center. OEM certifications.",
    })
    .click();
  await expect(
    section.locator("[data-selected-certificate='kia-recognized-collision-repair-center']"),
  ).toBeVisible();
  await expect(
    section.getByRole("heading", { level: 3, name: "Kia Recognized Collision Repair Center" }),
  ).toBeVisible();
  await expect(section.getByText("No validity date shown on the supplied artwork")).toBeVisible();
});

test("the car request begins near the process and the live scene becomes ready", async ({
  page,
}) => {
  test.slow();
  await useCapableDesktop(page);
  const carResponse = page.waitForResponse(
    (response) => new URL(response.url()).pathname === CAR_MODEL_PATH,
  );
  await page.goto("/");
  const process = page.locator("#process");
  await process.scrollIntoViewIfNeeded();
  expect((await carResponse).ok()).toBe(true);
  await expect(page.locator('[data-lifecycle="ready"]')).toBeVisible({ timeout: 75_000 });
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("returning to the hero restores its scene without showing the loader again", async ({
  page,
}) => {
  test.slow();
  await useCapableDesktop(page);
  await page.route(`**${CAR_MODEL_PATH}`, (route) =>
    route.fulfill({
      path: "public/models/trends-logo-web.glb",
      contentType: "model/gltf-binary",
    }),
  );
  await page.goto("/");

  const heroScene = page.locator("[data-attempt]");
  const loader = heroScene.locator("[data-hero-loader]");
  await expect(heroScene).toHaveAttribute("data-ready", "true", { timeout: 20_000 });
  await expect(heroScene).toHaveAttribute("data-presented", "true");

  const process = page.locator("#process");
  const processTop = await process.evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: "instant" }),
    Math.max(1, processTop - viewportHeight * 1.15),
  );
  await expect(process).toHaveAttribute("data-enhanced", "true");
  await expect(page.locator('[data-lifecycle="ready"]')).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("canvas")).toHaveCount(1);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(heroScene).not.toHaveAttribute("data-loading", "true");
  await expect(loader).toHaveCSS("opacity", "0");
  await expect(heroScene).toHaveAttribute("data-ready", "true", { timeout: 20_000 });
  await expect(heroScene).toHaveAttribute("data-rotation", "rotating");
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("scroll intent advances one locked sequence at a time in both directions", async ({
  page,
}) => {
  test.slow();
  await useCapableDesktop(page);
  await page.route(`**${CAR_MODEL_PATH}`, (route) =>
    route.fulfill({
      path: "public/models/trends-logo-web.glb",
      contentType: "model/gltf-binary",
    }),
  );
  await page.goto("/");
  const process = page.locator("#process");
  expect(await page.evaluate(() => window.scrollY)).toBe(0);

  const processTop = await process.evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  await page.mouse.wheel(0, Math.max(1, Math.floor(processTop - viewportHeight * 1.15)));
  await expect(process).toHaveAttribute("data-enhanced", "true");
  await expect(page.locator('[data-lifecycle="ready"]')).toBeVisible({ timeout: 30_000 });

  const remainingDistance = await process.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  await page.mouse.move(160, 360);
  await page.mouse.wheel(0, Math.ceil(remainingDistance + 320));
  await page.mouse.wheel(0, 2400);

  await expect(process).toHaveAttribute("data-sequence-index", "1");
  await expect(process).toHaveAttribute("data-phase", "assess");
  await expect(
    process.locator('article[data-active="true"] h3[aria-label="See the whole picture."]'),
  ).toBeVisible();
  const pinnedScroll = await page.evaluate(() => window.scrollY);
  const pinnedStageTop = await process
    .locator("[data-process-stage]")
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(Math.abs(pinnedStageTop)).toBeLessThan(2);

  await page.mouse.wheel(0, 2400);
  await page.mouse.wheel(0, 2400);
  await expect(process).toHaveAttribute("data-sequence-index", "1");
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - pinnedScroll)).toBeLessThan(3);
  await expect(process).not.toHaveAttribute("data-sequence-playing", "true", { timeout: 4000 });
  await page.waitForTimeout(450);

  const nextChapter = page.getByRole("button", {
    name: "Next process chapter (Page Down)",
  });
  const previousChapter = page.getByRole("button", {
    name: "Previous process chapter (Page Up)",
  });
  await clickAtCenter(page, nextChapter);
  await expect(process).toHaveAttribute("data-sequence-index", "2");
  await expect(process).not.toHaveAttribute("data-sequence-playing", "true", { timeout: 4000 });
  await clickAtCenter(page, previousChapter);
  await expect(process).toHaveAttribute("data-sequence-index", "1");
  await expect(process).not.toHaveAttribute("data-sequence-playing", "true", { timeout: 4000 });
  await page.waitForTimeout(450);

  const advance = async (index: number, phase: string, direction: 1 | -1 = 1) => {
    await page.mouse.wheel(0, direction * 620);
    await expect(process).toHaveAttribute("data-sequence-index", String(index));
    await expect(process).toHaveAttribute("data-sequence-playing", "true");
    await expect(process).not.toHaveAttribute("data-sequence-playing", "true", {
      timeout: 10_000,
    });
    await expect(process).toHaveAttribute("data-phase", phase);
    await page.waitForTimeout(450);
  };

  await advance(2, "restore");
  await expect(
    process.locator(
      'article[data-active="true"] h3[aria-label="Bring every line back into order."]',
    ),
  ).toBeVisible();
  await advance(3, "reveal");
  await expect(
    process.locator('article[data-active="true"] h3[aria-label="Let the surface tell the truth."]'),
  ).toBeVisible();
  await advance(2, "restore", -1);
  await advance(3, "reveal");
  await advance(4, "explore");

  await clickAtCenter(page, page.getByRole("button", { name: "Explore 360" }));
  const oxblood = page.getByRole("button", { name: "Oxblood" });
  const champagne = page.getByRole("button", { name: "Champagne" });
  await expect(oxblood).toHaveAttribute("aria-pressed", "true");
  await clickAtCenter(page, champagne);
  await expect(champagne).toHaveAttribute("aria-pressed", "true");

  const pause = page.getByRole("button", { name: "Pause 360" });
  await clickAtCenter(page, pause);
  await expect(page.getByRole("button", { name: "Play 360" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await clickAtCenter(page, page.getByRole("button", { name: "Return to story" }));
});

test("reduced motion and failed WebGL retain the readable static experience", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await disableWebGL(page);
  await page.goto("/");

  await expect(page.getByAltText("Trends logo").first()).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(
    await page
      .locator("[data-dealer-logo-track]")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await expect(
    page.getByRole("heading", { level: 3, name: "See the whole picture." }).last(),
  ).toBeVisible();
  await expect(page.getByText("The complete process remains below.", { exact: false })).toHaveCount(
    0,
  );
});

test("the FAQ index updates its detail panel by pointer and keyboard", async ({ page }) => {
  await disableWebGL(page);
  await page.goto("/");

  const tracking = page.getByRole("tab", {
    name: "Can I track my vehicle while it is being repaired?",
  });
  await tracking.click();
  await expect(tracking).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("not a live customer portal");

  await tracking.press("ArrowDown");
  const roadside = page.getByRole("tab", { name: "Do you offer towing or roadside service?" });
  await expect(roadside).toBeFocused();
  await expect(roadside).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Availability and timing must be confirmed",
  );
  await expect(
    page.getByRole("tabpanel").getByRole("link", { name: "START A REPAIR" }),
  ).toHaveAttribute("href", "/contact");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all essential content and CTA destinations remain available", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Auto Collision Center in Bakersfield",
      }),
    ).toBeAttached();
    const heroDisplayTitle = page.locator("[data-hero-display-title]");
    await expect(heroDisplayTitle.locator("span").nth(0)).toHaveText("Trends");
    await expect(heroDisplayTitle.locator("span").nth(1)).toHaveText("Collision Center");
    await expect(
      page.getByRole("heading", { level: 2, name: "Full visibility. Zero guesswork." }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Questions are part of the process." }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Send us the damage." }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Start a repair" }).first()).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(
      page.getByRole("heading", { level: 3, name: "Collision Repair", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Tires & Alignment" })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
  });
});

test("mobile navigation, skip link, anchors, and narrow layouts remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const menu = page.locator('button[aria-controls="marketing-navigation"]');
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNavigation.getByRole("link", { name: "Services" })).toBeVisible();
  await expect(primaryNavigation.getByRole("link", { name: "About Us" })).toBeVisible();
  await primaryNavigation.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.goto("/#services");
  await page.locator("#services").scrollIntoViewIfNeeded();

  const cards = page.locator("[data-service-card]");
  const firstCard = await cards.first().boundingBox();
  const reel = await page.locator("[data-service-reel]").boundingBox();
  expect(firstCard).not.toBeNull();
  expect(reel).not.toBeNull();
  if (firstCard && reel) expect(Math.abs(firstCard.width - reel.width)).toBeLessThan(2);

  for (const viewport of [
    { width: 320, height: 700 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    const layout = await page.locator("html").evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
  }
});

test("@a11y homepage has no automatically detectable violations before enhancement", async ({
  page,
}) => {
  await disableWebGL(page);
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
