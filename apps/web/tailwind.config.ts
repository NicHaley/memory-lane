// tailwind config is required for editor support
import sharedConfig from "@repo/ui/tailwind.config.ts";

import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  presets: [sharedConfig],
  content: ["./app/**/*.tsx", "../../packages/ui/**/*.{ts,tsx}"],
};

export default config;
