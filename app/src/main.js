import { createApp } from 'vue';

import { store } from './store';

import Toaster from '@meforma/vue-toaster';
import vSelect from 'vue-select';

import App from './App.vue';

import 'vue-select/dist/vue-select.css';

const app = createApp(App);
app.component('v-select', vSelect);
app.use(store);
app.use(Toaster);
app.mount('#app');
