import * as Vue from 'vue'

import { clickOutside } from '@/directives/clickOutside';

import App from './App.vue'

Vue.createApp(App)
    .directive('click-outside', clickOutside)
    .mount('#app')