import { afterEach, describe, expect, it } from "vitest";

import { getSiteOrigin } from "./site-origin";

const originalSiteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN;

afterEach(() => {
  if (originalSiteOrigin === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_ORIGIN;
  } else {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = originalSiteOrigin;
  }
});

describe("getSiteOrigin", () => {
  it("returns no value when deployment configuration is absent", () => {
    delete process.env.NEXT_PUBLIC_SITE_ORIGIN;

    expect(getSiteOrigin()).toBeUndefined();
  });

  it("accepts a valid web origin", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "https://example.com";

    expect(getSiteOrigin()?.origin).toBe("https://example.com");
  });

  it("accepts a local HTTP origin outside production", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "http://127.0.0.1:3000";

    expect(getSiteOrigin()?.origin).toBe("http://127.0.0.1:3000");
  });

  it("rejects an insecure remote origin", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "http://example.com";

    expect(getSiteOrigin()).toBeUndefined();
  });

  it("rejects a URL containing a path, query, or fragment", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "https://example.com/site?preview=1#top";

    expect(getSiteOrigin()).toBeUndefined();
  });

  it("rejects non-web protocols", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "file:///temporary/site";

    expect(getSiteOrigin()).toBeUndefined();
  });
});
