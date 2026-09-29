/**
 * Permanent redirects from every earlier version of the site to the homepage,
 * which now carries the whole offer. Sections are reached by anchor.
 */
const L = ':locale(fr|de|en)';

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      { source: `/${L}/saas`, destination: '/:locale#metier', permanent: true },
      { source: `/${L}/development`, destination: '/:locale#sur-mesure', permanent: true },
      { source: `/${L}/design`, destination: '/:locale#design', permanent: true },
      ...['solutions', 'services', 'products'].map((section) => ({
        source: `/${L}/${section}/:path*`,
        destination: '/:locale#metier',
        permanent: true,
      })),
    ];
  },
};
