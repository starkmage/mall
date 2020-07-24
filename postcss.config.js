module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 812,  //视窗的高度，对应的是我们设计稿的高度
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议用vw
      minPixelValue: 1, //小于等于'1px'不转换成视窗单位
      mediaQuery: false,  //允许在媒体查询中转换`px`
      // exclude: [/TabBar/] //必须使用正则匹配文件
    }
  }
}