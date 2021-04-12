const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    publicPath: './',
    lintOnSave: false,
    devServer: {
      port: 3000,
      hot: true
    },  
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: process.env.VUE_APP_FLAG,
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    // assetsDir: "assets",
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                prependData: `
                  @import "@/assets/styles/_variables.scss";
                `,
              },
          }
    },
    productionSourceMap: false,
}