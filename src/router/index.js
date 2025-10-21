/**
 * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    redirect: '/resource',
  },

  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/personnelManagement/userManagement/index'),
        meta: { title: '用户管理' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/personnelManagement/roleManagement/index'),
        meta: { title: '角色管理' },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/personnelManagement/menuManagement/index'),
        meta: { title: '菜单管理', badge: 'New' },
      },
    ],
  },
  {
    path: '/resource',
    component: Layout,
    name: 'resource',
    alwaysShow: true,
    children: [
      {
        path: '',
        name: 'Resource',
        component: () => import('@/views/resource/index'),
        meta: { title: '电子资源库' },
      },
    ],
  },
  {
    path: '/workstation',
    component: Layout,
    name: 'workstation',
    alwaysShow: true,
    redirect: '/workstation/create',
    children: [
      {
        path: '/workstation/create',
        name: 'create',
        component: () => import('@/views/workstation/create/index'),
        meta: { title: '新建审批' },
      },
      {
        path: '/workstation/online',
        name: 'online',
        component: () => import('@/views/workstation/online/index'),
        meta: { title: '上线审批' },
      },
      {
        path: '/workstation/offline',
        name: 'offline',
        component: () => import('@/views/workstation/offline/index'),
        meta: { title: '下线审批' },
      },
    ],
  },
  {
    path: '/seeting',
    component: Layout,
    name: 'seeting',
    alwaysShow: true,
    redirect: '/seeting/permissionOrg/userManage',
    meta: { title: '系统配置', icon: 'cog' },
    children: [
      {
        path: 'permissionOrg',
        name: 'PermissionOrg',
        component: EmptyLayout,
        redirect: '/seeting/permissionOrg/userManage',
        meta: { title: '权限与组织管理' },
        children: [
          {
            path: 'userManage',
            name: 'UserManage',
            component: () => import('@/views/seeting/permissionOrg/userManage/index'),
            meta: { title: '用户管理' },
          },
          {
            path: 'roleManage',
            name: 'RoleManage',
            component: () => import('@/views/seeting/permissionOrg/roleManage/index'),
            meta: { title: '角色管理' },
          },
          {
            path: 'deptManage',
            name: 'DeptManage',
            component: () => import('@/views/seeting/permissionOrg/deptManage/index'),
            meta: { title: '部门管理' },
          },
          {
            path: 'territorialManagement',
            name: 'territorialManagement',
            component: () => import('@/views/seeting/permissionOrg/territorialManagement/index'),
            meta: { title: '属地管理单位管理' },
          },
        ],
      },
      {
        path: 'processConfig',
        name: 'ProcessConfig',
        component: EmptyLayout,
        redirect: '/seeting/processConfig/newApprovalProcess',
        meta: { title: '流程配置' },
        children: [
          {
            path: 'newApprovalProcess',
            name: 'NewApprovalProcess',
            component: () => import('@/views/seeting/processConfig/newApprovalProcess/index'),
            meta: { title: '新建审批流程' },
          },
          {
            path: 'onlineApprovalProcess',
            name: 'OnlineApprovalProcess',
            component: () => import('@/views/seeting/processConfig/onlineApprovalProcess/index'),
            meta: { title: '上线审批流程' },
          },
          {
            path: 'offlineApprovalProcess',
            name: 'OfflineApprovalProcess',
            component: () => import('@/views/seeting/processConfig/offlineApprovalProcess/index'),
            meta: { title: '下线审批流程' },
          },
        ],
      },
    ],
  },
  {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: () => import('@/views/401'),
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: { title: '404' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter () {
  location.reload()
}

export default router
