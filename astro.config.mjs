// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Keeps the local-only admin page (src/pages/admin.astro) out of the published site.
// It still works with `npm run dev`.
const excludeAdminFromBuild = {
  name: 'exclude-admin-from-build',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const out = fileURLToPath(dir);
      await rm(`${out}admin`, { recursive: true, force: true });
      await rm(`${out}admin.html`, { force: true });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://Ed-Lam-11111010010.github.io',
  base: '/portfolio/',
  integrations: [excludeAdminFromBuild],
});
