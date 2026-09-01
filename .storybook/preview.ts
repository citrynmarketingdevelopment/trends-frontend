import type { Preview } from "@storybook/nextjs-vite";

import "../src/styles/globals.css";

const preview = {
  parameters: {
    a11y: {
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Preview;

export default preview;
