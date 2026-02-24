import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import ui from '@nuxt/ui/vue-plugin'
import iconify from './plugins/iconify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ui)
app.use(iconify)
app.use(VueQueryPlugin)

app.mount('#app')
