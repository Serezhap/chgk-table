import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Настройки',
      component: require('@/components/Settings').default
    },
    {
      path: '/table',
      name: 'Таблица',
      component: require('@/components/Table').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
