import './assets/main.css'
import vuetify from './core/plugins/vuetify'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { givePremission } from './core/stores/premissions'

givePremission()



const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
