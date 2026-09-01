import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { BrandLogo } from "./brand-logo";

const meta = {
  component: BrandLogo,
  parameters: {
    layout: "centered",
  },
  title: "Brand/BrandLogo",
} satisfies Meta<typeof BrandLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    preload: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Trends logo" })).toBeVisible();
  },
};
