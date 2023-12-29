/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '/account123/**',
            },
            {
                hostname: 'm.media-amazon.com'
            },
            {
                hostname: 'cdn.pixabay.com'
            }
        ]
    }
}

module.exports = nextConfig
