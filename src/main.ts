import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {configure} from "vee-validate";

const app = createApp(App)

configure({
  validateOnInput: true,
})

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
