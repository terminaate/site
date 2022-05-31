import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../views/Home.vue'
import ReposPage from "../views/Repos";

export const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: {
            label: "Home",
        }
    },
    {
        path: '/repos',
        name: 'RepositoriesPage',
        component: ReposPage,
        meta: {
            label: "Repositories",
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
