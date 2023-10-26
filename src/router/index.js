import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'

const router = createRouter({
    history: createWebHistory('/Shiff_Recipe/'),
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                key: () => 'default',
            }
        },
        {
            path: '/recipe',
            component: Recipe,
            meta: {
                key:(route) => route.fullpath,
            }
        },
    ],
})

export default router