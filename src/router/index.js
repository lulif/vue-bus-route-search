import Vue from 'vue'
import VueRouter from 'vue-router'
import Route from '@/views/Route.vue'
import Search from '@/views/Search.vue'
import NearBy from '@/views/NearBy.vue'
import LineSituation from '@/views/LineSituation.vue'
import LineDetail from '@/views/LineDetail.vue'
import SearchLineDetail from '@/views/SearchLineDetail.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Route',
    component: Route
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/nearby',
    name: 'NearBy',
    component: NearBy
  },
  {
    path: '/lineSituation',
    name: 'LineSituation',
    component: LineSituation
  },
  {
    path: '/lineDetail',
    name: 'LineDetail',
    component: LineDetail
  },
  {
    path: '/searchLineDetail',
    name: 'SearchLineDetail',
    component: SearchLineDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
