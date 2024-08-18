/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*`, // Proxy para o servidor externo
      },
    ];
  },
};

export default nextConfig;
