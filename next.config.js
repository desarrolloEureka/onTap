/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    // domains: ['firebasestorage.googleapis.com'],
    // formats: ['image/avif', 'image/webp'],
  },
  env: {
    apiKey: 'AIzaSyAThTZvE3UaSio6WOSoYYegWjgXoTPSaaE',
    authDomain: 'onetap-f8d4f.firebaseapp.com',
    projectId: 'onetap-f8d4f',
    storageBucket: 'onetap-f8d4f.appspot.com',
    messagingSenderId: '442493372856',
    appId: '1:442493372856:web:3fc787fb060e5f516e674d',
    measurementId: 'G-6YM5SM23YD',
  },
};

module.exports = nextConfig;
