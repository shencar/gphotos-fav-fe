import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import cors from 'cors'
import GoogleSignInPlugin from "vue3-google-signin"
import vue3GoogleLogin from 'vue3-google-login'

const clientId = '32946259605-23sie7jnrgiqmg3sfp1cj79uiea7h4r7.apps.googleusercontent.com';
const scopes = [
    'https://www.googleapis.com/auth/photoslibrary.readonly',
    'https://www.googleapis.com/auth/photoslibrary.appendonly',
    'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
    'https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata',
    'https://www.googleapis.com/auth/photoslibrary.sharing',
    'https://www.googleapis.com/auth/photoslibrary'
];


const app = createApp(App)
app.use(router)
app.use(cors)
app.use(vue3GoogleLogin, {
    clientId: clientId,
    scope: scopes.join(' '),
  });
app.mount('#app')
