import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {configure} from "vee-validate";
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia();
configure({
  validateOnInput: true,
})
app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
