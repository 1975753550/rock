import Router from 'vue-router'
import Container from '@/components/Container'
import HomePage from '@/pages/HomePage'
import UploadPage from '@/pages/UploadPage'
import FragmentPage from '@/pages/FragmentPage'
import AjaxPage from '@/pages/AjaxPage'
import ProfilePage from '@/pages/ProfilePage'
const AsyncPage = () => import('@/pages/AsyncPage')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',
      component: Container,
      children: [{
        path: '/',
        component: HomePage
      }, {
        path: '/upload',
        component: UploadPage
      }, {
        path: '/fragment',
        component: FragmentPage
      }, {
        path: '/async',
        component: AsyncPage
      }, {
        path: '/ajax',
        component: AjaxPage
      }, {
        path: '/profile',
        component: ProfilePage
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
