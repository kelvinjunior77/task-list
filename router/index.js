import { createRouter, createWebHistory, createWebHashHistory} from "vue-router";
import Home from "../pages/Home.vue";
//const lazyLoad = (view) => import(`../pages/${view}.vue`);
import Frances from "../pages/Frances.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },

     {
        path: "/frances",
        name: "Frances",
        //component: lazyLoad("Frances"),
        component: Frances
     },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;