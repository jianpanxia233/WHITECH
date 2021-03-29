import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import('../views/Activity.vue')
    },
    {
        path: '/myacts',
        name: 'myacts',
        component: () => import('../views/Myactivities.vue')
    },
    {
        path: '/chats',
        name: 'chats',
        component: () => import('../views/Chats.vue')
    },
    {
        path: '/room',
        name: 'room',
        component: () => import('../views/activityRoom.vue')
    },
    {
        path: '/activitydetail',
        name: 'activitydetail',
        component: () => import('../views/activityDetail.vue')
    },
    {
        path: '/dashbord',
        name: 'dashbord',
        component: () => import('../views/Dashbord.vue'),
        children: [
            {
              path: '',
              name: 'adminInfo',
              component: () => import('../views/admin/adminInfo.vue')
            },
            {
              path: 'follow',
              name: 'follow',
              component: () => import('../views/admin/follow.vue')
            },
            {
              path: 'password',
              name: 'password',
              component: () => import('../views/admin/password.vue')
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;