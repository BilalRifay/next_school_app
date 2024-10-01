/** @type {import('next').NextConfig} */

const nextConfig = {
    distDir: 'dist',
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',       
            }
        ]
    }
};

export default nextConfig;
