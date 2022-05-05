import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import jquery from 'jquery';
import moment from 'moment'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App)
window.jQuery = jquery

app.use(moment);
app.use(router);
app.use(store);
app.use(VueLoading);
app.mount('#app')
