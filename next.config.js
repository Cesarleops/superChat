/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{
        protocol: 'https',
        pathname: '/**',
        port:'',
        hostname: 'res.cloudinary.com'
      }]
    },
    
}

module.exports = nextConfig
