const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
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
