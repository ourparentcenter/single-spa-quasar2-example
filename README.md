# Updated demo example
I have a better demo using 3 quasar apps [here](https://github.com/ourparentcenter/micro-quasar/tree/v2) on the v2 branch. It has Pinia, boot files, browser module import, etc and is a complete rewrite of this demo.

## single-spa-quasar2-example
Example repo for single-spa and quasar2

## To run
- yarn / npm install in hello world, portal & test folders
- open url to localhost:9000

## Quick explanation
This example uses single-spa-vue to mount App.vue. The following is in single-spa-entry.js:
```js
import { h, createApp } from 'vue';
import qcreateApp from '../.quasar/app.js'
import singleSpaVue from 'single-spa-vue';
import { Quasar } from 'quasar'
import quasarUserOptions from '../.quasar/quasar-user-options'
import App from './App.vue';

let routerInstance;
void qcreateApp(createApp, quasarUserOptions).then(({ router }) => {
  routerInstance = router;
})

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
  handleInstance(app) {
    app.use(Quasar, quasarUserOptions);
    app.use(routerInstance);
  },
  // replaceMode: false
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

To get the router, we use .quasar/app.js to partially create the app with quasar and grab the router instance. We then use the router instance in the vue createApp to have proper routing.

The webpack config in quasar.conf.js:
```js
chainWebpack (chain) {
  chain.entry('app').add(resolve('src', 'single-spa-entry.js')) // This is the magic to make quasar work with single-spa
},
extendWebpack (cfg) {
  cfg.output = { // As per single-spa documentation
    // library: `${name}-[name]`,
    libraryTarget: 'system',
    chunkLoadingGlobal: `webpackJsonp_${name}`,
    publicPath: ''
  }
  cfg.externals = [ // [OPTIONAL] Dependencies that will be provided by the container
    'single-spa',
    'quasar',
    // '@quasar/extras',
    // 'vue',
    // 'vue-router',
    // 'core-js',
    // 'axios',
    // 'single-spa-vue'
  ]
  cfg.optimization = false
  cfg.devtool = 'source-map'
  cfg.plugins.push(new SystemJSPublicPathWebpackPlugin({ systemjsModuleName: name }))
  cfg.module.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: { formatter: require('eslint').CLIEngine.getFormatter('stylish') }
  })
  cfg.module.rules.push(
    {
      test: /\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'start(app, boot)',
        replace: '//start(app, boot)',
      }
  })
}
```

Webpack string-replace-loader is used to comment our the start(app, boot) method in .quasar/client-entry.js so that single-spa is the framework that mounts the app. Without this, 2 instances of quasar would be created with one failing due to missing q-app div to mount to.
### Still to do:
- Fix routing betwenn apps
