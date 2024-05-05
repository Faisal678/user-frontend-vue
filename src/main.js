import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import store from './store/index'
import Toast from "vue-toastification";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toastification/dist/index.css";
import './assets/main.css'

createApp(App).use(router).use(store).use(Toast).mount('#app')
