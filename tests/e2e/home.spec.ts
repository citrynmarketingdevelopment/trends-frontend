import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const MODEL_PATH = "/models/revuelto-web.glb";
const GROUND_AO_PATH = "/textures/internal_ground_ao_texture.jpeg";
const SCENE_READY_TIMEOUT = 75_000;
const SHOWROOM_PATH = "/showroom/revuelto";

const revueltoHeading = (page: Page) => page.getByRole("heading", { level: 1, name: "REVUELTO" });
const sceneImage = (page: Page) =>
  page.getByRole("img", {
    name: "Interactive three-dimensional Lamborghini Revuelto",
  });
const loadingStatus = (page: Page) =>
  page.getByRole("status").filter({ hasText: "LOADING REVUELTO" });
const renderingError = (page: Page) =>
  page.locator('[role="alert"]').filter({
    hasText: "THE 3D MODEL COULD NOT BE LOADED.",
  });

async function disableWebGL(page: Page) {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = (() =>
      null) as typeof HTMLCanvasElement.prototype.getContext;
  });
}

async function expectInteractiveCanvas(page: Page) {
  await expect(sceneImage(page).locator("canvas")).toHaveCount(1);
}

async function waitForExperience(page: Page) {
  await expect(revueltoHeading(page)).toBeVisible();
  await expect(loadingStatus(page)).toBeHidden({ timeout: SCENE_READY_TIMEOUT });
  await expectInteractiveCanvas(page);
}

test("showroom loads the Revuelto assets and renders one interactive canvas", async ({ page }) => {
  test.slow();

  const modelResponse = page.waitForResponse(
    (response) => new URL(response.url()).pathname === MODEL_PATH,
  );
  const groundAoResponse = page.waitForResponse(
    (response) => new URL(response.url()).pathname === GROUND_AO_PATH,
  );

  await page.goto(SHOWROOM_PATH);

  await expect(loadingStatus(page)).toBeVisible();

  const [model, groundAo] = await Promise.all([modelResponse, groundAoResponse]);

  expect(model.ok()).toBe(true);
  expect(groundAo.ok()).toBe(true);
  await waitForExperience(page);

  await expect(sceneImage(page)).toBeVisible();
  await expect(
    page.getByText("A new era of V12 performance, rendered in real time."),
  ).toBeVisible();
});

test("keyboard users can skip directly to the main content", async ({ page }) => {
  await page.goto(SHOWROOM_PATH);

  const skipLink = page.getByRole("link", { name: "Skip to main content" });

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await skipLink.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator("#main-content")).toBeFocused();
});

test("camera, paint, and rotation controls expose their current state", async ({ page }) => {
  await disableWebGL(page);
  await page.goto(SHOWROOM_PATH);
  await expect(renderingError(page)).toBeVisible();

  const front = page.getByRole("button", { name: "FRONT" });
  const profile = page.getByRole("button", { name: "PROFILE" });
  const rear = page.getByRole("button", { name: "REAR" });

  await expect(front).toHaveAttribute("aria-pressed", "true");
  await expect(profile).toHaveAttribute("aria-pressed", "false");
  await expect(rear).toHaveAttribute("aria-pressed", "false");

  await profile.click();
  await expect(front).toHaveAttribute("aria-pressed", "false");
  await expect(profile).toHaveAttribute("aria-pressed", "true");

  await rear.click();
  await expect(profile).toHaveAttribute("aria-pressed", "false");
  await expect(rear).toHaveAttribute("aria-pressed", "true");

  const startRotation = page.getByRole("button", { name: "VIEW 360" });

  await expect(startRotation).toHaveAttribute("aria-pressed", "false");
  await startRotation.click();

  const pauseRotation = page.getByRole("button", { name: "PAUSE 360" });

  await expect(pauseRotation).toHaveAttribute("aria-pressed", "true");
  await pauseRotation.click();
  await expect(page.getByRole("button", { name: "VIEW 360" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );

  const arancio = page.getByRole("button", { name: "Arancio" });
  const verde = page.getByRole("button", { name: "Verde" });
  const nero = page.getByRole("button", { name: "Nero" });

  await expect(arancio).toHaveAttribute("aria-pressed", "true");
  await expect(verde).toHaveAttribute("aria-pressed", "false");
  await expect(nero).toHaveAttribute("aria-pressed", "false");

  await verde.click();
  await expect(arancio).toHaveAttribute("aria-pressed", "false");
  await expect(verde).toHaveAttribute("aria-pressed", "true");
  await expect(nero).toHaveAttribute("aria-pressed", "false");
});

test.describe("progressive enhancement", () => {
  test.use({ javaScriptEnabled: false });

  test("essential hero content remains available without JavaScript", async ({ page }) => {
    await page.goto(SHOWROOM_PATH);

    await expect(revueltoHeading(page)).toBeVisible();
    await expect(page.getByRole("link", { name: "Revuelto home" })).toBeVisible();
    await expect(
      page.getByText("A new era of V12 performance, rendered in real time."),
    ).toBeVisible();
    await expect(loadingStatus(page)).toBeHidden();
  });
});

test.describe("reduced motion", () => {
  test("the complete experience remains visible and operable", async ({ page }) => {
    test.slow();

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(SHOWROOM_PATH);
    await expectInteractiveCanvas(page);

    expect(
      await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    ).toBe(true);
    await expect(revueltoHeading(page)).toBeVisible();

    const profile = page.getByRole("button", { name: "PROFILE" });

    await profile.click();
    await expect(profile).toHaveAttribute("aria-pressed", "true");
  });
});

test("the experience reports a usable fallback when WebGL is unavailable", async ({ page }) => {
  await disableWebGL(page);

  await page.goto(SHOWROOM_PATH);

  const alert = renderingError(page);

  await expect(alert).toBeVisible();
  await expect(alert.getByRole("button", { name: "TRY AGAIN" })).toBeVisible();
  await expect(loadingStatus(page)).toBeHidden();
});

test("content reflows without horizontal loss at narrow viewports", async ({ page }) => {
  await page.setViewportSize({ height: 640, width: 320 });
  await page.goto(SHOWROOM_PATH);
  await expectInteractiveCanvas(page);

  for (const viewport of [
    { height: 640, width: 320 },
    { height: 844, width: 390 },
  ]) {
    await page.setViewportSize(viewport);

    const layout = await page.locator("html").evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));

    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    await expect(revueltoHeading(page)).toBeVisible();
  }
});

test("@a11y showroom has no automatically detectable violations", async ({ page }) => {
  test.slow();

  await page.goto(SHOWROOM_PATH);
  await waitForExperience(page);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("unknown public routes return a useful not-found page", async ({ page }) => {
  const response = await page.goto("/not-a-published-page");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "This page is out of frame." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
});
