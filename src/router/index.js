import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from '../views/Dashboard.vue'
import Admin from '@/views/Admin.vue'
import AdminRooms from '@/views/AdminRooms.vue'
import AdminCards from '@/views/AdminCards.vue'
import AdminVisitors from '@/views/AdminVisitors.vue'
import Preregister from '@/views/Preregister.vue'
import Room from '@/views/Room.vue'
import RoomHome from '@/views/RoomHome.vue'
import RoomSettings from '@/views/RoomSettings.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: Dashboard,
  // },
  {
    path: '/',
    redirect: { name: 'Cards' },
  },
  {
    path: '/preregister',
    name: 'preregister',
    component: Preregister,
  },
  {
    path: '/admin',
    component: Admin,
    redirect: { name: 'Cards' },
    children: [
      {
        path: 'rooms',
        name: 'Rooms',
        component: AdminRooms,
      },
      {
        path: 'cards',
        name: 'Cards',
        component: AdminCards,
      },
      {
        path: 'visitors',
        name: 'Visitors',
        component: AdminVisitors,
      },
    ],
  },
  {
    path: '/room/:id',
    component: Room,
    children: [
      {
        path: '',
        name: 'room-home',
        component: RoomHome,
      },
      {
        path: 'settings',
        name: 'room-settings',
        component: RoomSettings,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
