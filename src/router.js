import Router from 'vue-router'
import Container from '@/components/Container'
import usergroup from '@/pages/usergroup'
import usergrouplist from '@/pages/usergrouplist'
import usergroupdetail from '@/pages/usergroupdetail'
import login from '@/pages/LoginPage.vue'
import permissionList from '@/pages/permissionList'
import createPermission from '@/pages/createPermission'
import editArea from '@/pages/components/editArea'
import permissionDetail from '@/pages/permissionDetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',
      component: Container,
      children: [{
        path: '/createusergroup',
        component: usergroup
      }, {
        path: '/usergrouplist',
        component: usergrouplist
      }, {
        path: '/usergroupdetail',
        component: usergroupdetail
      }, {
        path: '/login',
        component: login
      }, {
        path: '/permission',
        component: permissionList
      }, {
        path: '/createPermission',
        component: createPermission
      }, {
        path: '/editArea',
        component: editArea
      }, {
        path: '/permissionDetail',
        name: 'permissionDetail',
        component: permissionDetail
      }]
    },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
