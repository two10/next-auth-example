const path = require('path')

module.exports = {

  async rewrites() {
    return [
      {
        source: '/server/:slug',
        destination: process.env.NEXT_PUBLIC_SERVER_URL+'/api/:slug',
      },
    ]
  } ,





  reactStrictMode: false,
  experimental: {
    esmExternals: true,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}

