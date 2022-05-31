import {createApp} from 'vue'
import router from './router'

// Components
import App from './App.vue'

// CSS
import "./assets/css/root.css"
import Particles from "particles.vue3";


const app = createApp(App)

app.use(router)
app.use(Particles)

app.config.errorHandler = (err) => {
    console.log(err);
}

app.mount('#app')
