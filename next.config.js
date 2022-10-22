/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'beta-api.buyphone.com.br',
      'api.buyphone.com.br',
      'pedidos.buyphone.com.br',
      'buyphone-files.s3.us-east-2.amazonaws.com',
    ],
  },
}
