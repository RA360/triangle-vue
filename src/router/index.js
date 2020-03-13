import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Home" },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/news",
    name: "News",
    meta: { title: "News" },
    component: () => import("../views/News.vue")
  },
  {
    path: "/news/:id",
    name: "News-Post",
    meta: { title: "News" },
    component: () => import("../views/NewsPost.vue")
  },
  {
    path: "/media",
    name: "Media",
    meta: { title: "Media" },
    component: () => import("../views/Media.vue")
  },
  {
    path: "/musics/:id?",
    name: "Musics",
    meta: { title: "Musics" },
    component: () => import("../views/Musics.vue")
  },
  {
    path: "*",
    name: "404",
    meta: { title: "404" },
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} — Triangle`;
  next();
});

export default router;
