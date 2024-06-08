/** @type {import('next').NextConfig} */
export const images = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'utfs.io',
      port: '',
      pathname: '/**',
    },
  ],
};
