/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
