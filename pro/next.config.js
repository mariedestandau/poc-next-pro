/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/connexion',
        destination: '/',
      },
      {
        source: '/validation',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
