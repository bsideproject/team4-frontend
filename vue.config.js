const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '*': path.join(__dirname, '/'),
        '@': path.join(__dirname, 'src/'),
        '@styles': path.join(__dirname, 'src/assets/styles'),
        '@images': path.join(__dirname, 'src/assets/images'),
        '@utils': path.join(__dirname, 'src/utils'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@components': path.join(__dirname, 'src/components'),
        '@constants': path.join(__dirname, 'src/constants'),
        '@api': path.join(__dirname, 'src/api')
      }
    }
  },  
  css: {
    loaderOptions: {
      sass: {

      }
    }
  },
  devServer: {
    port: process.env.VUE_APP_BASE_PORT,
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    // 파일 경로 대소문자 플러그인 제거
    config.plugins.delete('case-sensitive-paths')
  }
})

/**
 * webpack 설정 확인
 *  - vue inspect > output.js
 */
