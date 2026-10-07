const localHosts = new Set(["127.0.0.1", "[::1]", "localhost"]);

export function getSiteOrigin(): URL | undefined {
  // Vercel previews also run production builds and load .env.production.
  if (process.env.VERCEL_ENV === "preview") {
    return undefined;
  }

  // Hosting environment variables override .env.production, including blank values.
  // Keep the approved public domain available for production builds in that case.
  const candidate =
    process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim() ||
    (process.env.NODE_ENV === "production" ? "https://trendsautocollision.com" : undefined);

  if (!candidate) {
    return undefined;
  }

  try {
    const origin = new URL(candidate);

    const isBareOrigin =
      origin.pathname === "/" &&
      origin.search === "" &&
      origin.hash === "" &&
      origin.username === "" &&
      origin.password === "";
    const isSecure = origin.protocol === "https:";
    const isLocalDevelopmentOrigin =
      process.env.NODE_ENV !== "production" &&
      origin.protocol === "http:" &&
      localHosts.has(origin.hostname);

    if (!isBareOrigin || (!isSecure && !isLocalDevelopmentOrigin)) {
      return undefined;
    }

    return origin;
  } catch {
    return undefined;
  }
}
