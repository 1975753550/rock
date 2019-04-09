# 磐石
简洁、高效的前端基础项目

## 整体架构
vue + element + webpack

## 进度

- [x] 多环境编译
- [x] 支持国际化
- [x] 页面单元组件化
- [x] 输出多个页面
- [x] ~自动打包图片~ 使用Base64打包到CSS中
- [x] 支持上传
- [x] 自动压缩文件(js/css/html)
- [x] meta优化
- [x] 简单的单元测试
- [x] 代码检测
- [x] 分离静态资源(css)
- [x] 异步加载资源
- [x] 状态管理
- [ ] 自动化分发

- 使用Chrome支持跨域访问: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir=~/ChromeUserData/`

## Build Setup

``` bash
# vue官方配置插件
npm install -g vue-cli
# 代码审查
npm install -g eslint
# 全局安装webpack
npm install -g webpack

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 统一规则

- 统一开发环境，使用`Visual Studio`
- 统一使用一种编码风格
- 固定开源库的版本号，防止升级导致出现问题
- 前后端使用JSON数据通信？
- http请求头部中增加`x-session-id`？


## 目录结构

- `main.js` 程序入口
- `router.js` vue-router，常用页面一般嵌套3层：
 - layout 页面整体布局，统一的导航栏
- `vendor.js` 第三方组件
- `assets` 需要webpack处理的静态资源
- `static` 静态资源
- `components` 组件
- `filters` 格式化时间和数字
- `store` 储存需要持久化的数据
- `utils`
 - `fetch` 配置网络请求
 - `validate` 表单中常用的校验方法
- `styles` 通用的样式
- `pages` 具体的界面
- `.eslintrc.js` 开发时遵守的代码规范


## 开源控件：

- "axios" Promise形式的AJAX库
- "element-ui" 饿了吗开源组件库
- "js-cookie" cookie组件
- "normalize.css" 通用的页面格式化组件
- "vue-router" 官方路由
- "rimraf" 简单的执行`rm -rf`
- "NProgress" 常用的进度提示条
