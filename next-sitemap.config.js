/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://arinitsolutions.com",
  generateRobotsTxt: true,
  exclude: ["/api/*", "/pricing"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
  transform: async (_config, path) => {
    // Homepage gets highest priority
    if (path === "/") {
      return { loc: path, changefreq: "weekly", priority: 1.0, lastmod: new Date().toISOString() };
    }
    // Services and work pages — important for conversions
    if (path.startsWith("/services") || path.startsWith("/work")) {
      return { loc: path, changefreq: "monthly", priority: 0.8, lastmod: new Date().toISOString() };
    }
    // Insights — updated periodically
    if (path.startsWith("/insights")) {
      return { loc: path, changefreq: "monthly", priority: 0.7, lastmod: new Date().toISOString() };
    }
    // About, approach, contact
    if (["/about", "/approach", "/contact"].includes(path)) {
      return { loc: path, changefreq: "monthly", priority: 0.6, lastmod: new Date().toISOString() };
    }
    // Legal pages — low priority
    if (path.startsWith("/legal")) {
      return { loc: path, changefreq: "yearly", priority: 0.3, lastmod: new Date().toISOString() };
    }
    // Default
    return { loc: path, changefreq: "monthly", priority: 0.5, lastmod: new Date().toISOString() };
  },
};
