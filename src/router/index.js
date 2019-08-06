import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login',
  //   name: 'login',
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard/dashboard'
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: '登录艾思欧',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  //首页
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: 'shouye'
    },
    grade: '1',
    children: [
      // 广告消息管理功能
      {
        path: '/dashboard',
        component: Layout,
        meta: {
          title: 'dashboard',
          icon: 'dashboard'
        },
        children: [{
          path: 'dashboard',
          name: 'dashboard',
          id: '1', //菜单ID
          hidden: true,
          component: () => import('@/views/dashboard/dashboard'),
          meta: {
            title: 'dashboard',
            icon: 'dashboard'
          }
        }, {
          path: 'advertisement',
          name: 'advertisement',
          id: '1', //菜单ID
          component: () => import('@/views/advertisement/advertisement'),
          meta: {
            title: 'advertisement',
            icon: 'sanjiao',
          }
        }, {
          path: 'addadvertisement',
          name: 'addadvertisement',
          id: '1', //菜单ID
          hidden: true,
          component: () => import('@/views/advertisement/addadvertisement'),
          meta: {
            title: 'addadvertisement',
            icon: 'sanjiao'
          }
        }, {
          path: 'notice',
          name: 'notice',
          id: '',
          component: () => import('@/views/advertisement/notice'),
          meta: {
            title: 'notice',
            icon: 'dashboard',
          }
        }, {
          path: 'addnotice',
          name: 'addnotice',
          id: '',
          hidden: true,
          component: () => import('@/views/advertisement/addnotice'),
          meta: {
            title: 'addnotice',
            icon: 'dashboard',
          }
        }, {
          path: 'shownotice',
          name: 'shownotice',
          id: '',
          hidden: true,
          component: () => import('@/views/advertisement/shownotice'),
          meta: {
            title: 'shownotice',
            icon: 'dashboard',
          }
        }]
      }
    ]
  },
  //体系管理
  {
    path: '/system',
    component: Layout,
    name: 'system',
    grade: '2',
    meta: {
      title: 'guanli'
    },
    children: [
      // 体系模块
      {
        path: '/system',
        component: Layout,
        name: 'system',
        meta: {
          title: 'system'
        },
        children: [{
            path: 'systemtype',
            name: 'systemtype',
            component: () => import('@/views/system/systemtype'),
            meta: {
              title: 'systemtype',
            }
          },
          {
            path: 'SystemInformation',
            name: 'SystemInformation',
            component: () => import('@/views/system/SystemInformation'),
            meta: {
              title: 'SystemInformation',
            }
          }
        ]
      },
      {
        path: '/product',
        component: Layout,
        redirect: '/product/productType',
        name: 'product',
        meta: {
          title: 'product',
          icon: 'form'
        },
        children: [{
            path: 'productType',
            name: 'productType',
            component: () => import('@/views/product/productType'),
            meta: {
              title: 'productType',
            }
          },
          {
            path: 'productPrice',
            name: 'productPrice',
            component: () => import('@/views/product/productPrice'),
            meta: {
              title: 'productPrice',
            }
          },
          {
            path: 'productPriceInfo',
            name: 'productPriceInfo',
            component: () => import('@/views/product/productPriceInfo'),
            meta: {
              title: 'productPriceInfo',
            }
          }
        ]
      }
    ]
  },
  //OA办公
  {
    path: '/enterprise',
    component: Layout,
    name: 'enterprise',
    grade: '3',
    meta: {
      title: 'bangong',
      icon: 'table'
    },
    children: [
      // 行业机构管理
      {
        path: '/enterprise',
        component: Layout,
        name: 'enterprise',
        meta: {
          title: 'enterprise',
          icon: 'table'
        },
        children: [{
            path: 'industry',
            name: 'industry',
            component: () => import('@/views/enterprise/industry'),
            meta: {
              title: 'industry',
            }
          },
          {
            path: 'mechanism',
            name: 'mechanism',
            component: () => import('@/views/enterprise/mechanism'),
            meta: {
              title: 'mechanism',
            }
          },
          {
            path: 'addmechanism',
            name: 'addmechanism',
            hidden: true,
            component: () => import('@/views/enterprise/addmechanism'),
            meta: {
              title: 'addmechanism',
            }
          }
        ]
      }
    ]
  }


]

export default new Router({
  //mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [{
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'page401',
        meta: {
          title: 'page401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'page404',
        meta: {
          title: 'page404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
