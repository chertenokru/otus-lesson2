import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {localize} from "@vee-validate/i18n";
import ru from '@vee-validate/i18n/dist/locale/ru.json'
import {configure} from "vee-validate";
import {defineRule} from 'vee-validate';
import {
  required,
  email,
  min,
  max,
  numeric, digits,
} from '@vee-validate/rules';


const app = createApp(App)
localize({ru})

configure({
  generateMessage: localize('ru'),
  validateOnInput: true,
})


defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('numeric', numeric);
defineRule('digits', digits);
defineRule('gt0', (v:number) => Number(v) > 0 || 'Число должно быть больше 0'
);

defineRule('accepted', (value: boolean) => {
  if (value) return true;
  return 'Вы должны принять условия';
});

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
