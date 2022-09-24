import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import '@/router/api'

library.add(fas)
import router from '@/router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"
import "jszip";
import "pdfmake";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-buttons/js/buttons.flash";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import ref from 'vue-ref'
import VueCountdown from '@chenfengyuan/vue-countdown';

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'


createApp(App)
.component(VueCountdown.name, VueCountdown)
.use(ref)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
    newestOnTop: true
  })
.use(VueSweetalert2)
.use(VueChartkick)

.mount('#app')


