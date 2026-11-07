import type { NextConfig } from "next";

/**
 * Equastore v2 — Next.js config
 *
 * GitHub Pages deployment:
 * - output: 'export' generates a fully static site in /out
 * - basePath: '/equastore-v2' — GitHub Pages serves the site at this subpath
 * - assetPrefix: same as basePath, ensures JS/CSS chunks load from the right URL
 * - images: unoptimized — GitHub Pages has no image optimization backend
 * - trailingSlash: true — GitHub Pages serves /path/ as /path/index.html
 *
 * To build for GitHub Pages:
 *   npm run build:gh
 * The output goes to ./out/ — push it to gh-pages branch and GitHub Pages serves it.
 */

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'equastore-v2';
const basePath = isGithubPages ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  // Disable cacheComponents for static export (it requires server runtime)
  cacheComponents: false,
  // partialPrefetching also requires cacheComponents — disable for GH Pages
  ...(isGithubPages ? {} : { partialPrefetching: true }),
  // Static export for GitHub Pages
  ...(isGithubPages && {
    output: 'export',
    basePath,
    assetPrefix: basePath,
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
