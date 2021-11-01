import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue'

import RectangularWaveguide from './components/RectangularWaveguide.vue';
import MicrostripLine from './components/MicrostripLine.vue';
import VswrCalculation from './components/VswrCalculation.vue';
import LoadImpedance from './components/LoadImpedance.vue';
import LSectionMatchingNetwork from './components/LSectionMatchingNetwork.vue'
import MenuView from './components/MenuView.vue';
import ImpedanceTransformation from './components/ImpedanceTransformation.vue'
import SingleStub from './components/SingleStub.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {path: '/', component: MenuView},
      {path: '/rectangularwaveguide', component: RectangularWaveguide },
      {path: '/microstripline', component: MicrostripLine },
      {path: '/vswrcalculation', component: VswrCalculation },
      {path: '/loadimpedance', component: LoadImpedance },
      {path: '/lsection', component: LSectionMatchingNetwork},
      {path: '/impedancetransformation', component: ImpedanceTransformation},
      {path: '/singlestub', component: SingleStub},
      
    ]
  });

const app = createApp(App)

app.use(router);

app.mount('#app');

