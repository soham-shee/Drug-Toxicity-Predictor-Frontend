import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://drug-toxicity-predictor-backend.onrender.com/:path*', // Backend URL
      },
    ]
  },
}

export default nextConfig