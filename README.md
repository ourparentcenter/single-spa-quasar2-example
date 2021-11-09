# single-spa-quasar2-example
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

### Still to do:
- Fix routing betwenn apps