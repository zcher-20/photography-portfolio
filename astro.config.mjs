import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";


// https://astro.build/config
export default defineConfig({
  site: "https://personal-website-kappa-one-82.vercel.app",
  integrations: [react(), tailwind(), icon({ iconDir: "src/icons" }), sitemap()],
  output: "server",
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});