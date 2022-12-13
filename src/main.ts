import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

window.$addStorage = function (key: string, value: any) {
  var newStorageEvent = document.createEvent('StorageEvent')
  const storage = {
    setItem: function (k: string, v: any) {
      localStorage.setItem(k, v)
      newStorageEvent.initStorageEvent('setItem', false, false, k, null, v, undefined, null)
      window.dispatchEvent(newStorageEvent)
    }
  }
  return storage.setItem(key, value)
}


app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
