import type { StorybookConfig } from "@storybook/nextjs-vite";

const config = {
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
} satisfies StorybookConfig;

export default config;
