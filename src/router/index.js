import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../views/Home.vue'
import ReposPage from "../views/Repos.vue";
import ErrorPage from "../views/Error.vue";

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
    },
    {
        path: '/:catchAll(.*)',
        name: 'ErrorPage',
        component: ErrorPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
