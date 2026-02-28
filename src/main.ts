import './assets/main.css'

import ui from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import iconify from './plugins/iconify'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ui)
app.use(iconify)
app.use(VueQueryPlugin)

app.mount('#app')
