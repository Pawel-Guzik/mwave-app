import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue'

import RectangularWaveguide from './components/RectangularWaveguide.vue';
import MicrostripLine from './components/MicrostripLine.vue';
import VswrCalculation from './components/VswrCalculation.vue';
import LoadImpedance from './components/LoadImpedance.vue';
import MenuView from './components/MenuView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: MenuView},
      { path: '/rectangularwaveguide', component: RectangularWaveguide },
      { path: '/microstripline', component: MicrostripLine },
      { path: '/vswrcalculation', component: VswrCalculation },
      { path: '/loadimpedance', component: LoadImpedance },
    ]
  });

const app = createApp(App)

app.use(router);

app.mount('#app');

