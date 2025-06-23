import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";
import Home from "../pages/Home.vue";
const lazyLoad = (view) => import(`../pages/${view}.vue`);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },

     {
        path: "/lang/frances",
        name: "Frances",
        component: lazyLoad("Frances"),
     },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;