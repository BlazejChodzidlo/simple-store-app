/** @type {import('next').NextConfig} */

const images = {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'avatar.iran.liara.run',
            port: '',
            pathname: '/username',
        },
  ],}

const nextConfig = {images: images, reactStrictMode: false};

export default nextConfig;