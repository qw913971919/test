/**
 * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式
 */
import { asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'
import route from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

const state = () => ({
  routes: [],
  partialRoutes: [],
  menus: []
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
  menus: (state) => state.menus
}
const mutations = {
  setRoutes (state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes (state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  // 写死的menus菜单
  setMenus (state, url) {
    console.log(url, 'url')
    let menuRoute = null

    // 检查是否是工作站相关路径（包括子路径）
    if (url === '/workstation' || url.startsWith('/workstation/')) {
      menuRoute = [
        {
          path: '/workstation/create',
          name: 'create',
          meta: {
            title: '新建审批',
          },
        },
        {
          path: '/workstation/online',
          name: 'online',
          meta: {
            title: '上线审批',
          },
        },
        {
          path: '/workstation/offline',
          name: 'offline',
          meta: {
            title: '下线审批',
          },
        },
      ]
    } else if (url === '/seeting' || url.startsWith('/seeting/')) {
      menuRoute = [
        {
          path: '/seeting/permissionOrg',
          name: 'PermissionOrg',
          meta: {
            title: '权限与组织管理',
          },
          children: [
            {
              path: '/seeting/permissionOrg/userManage',
              name: 'UserManage',
              meta: {
                title: '用户管理',
              },
            },
            {
              path: '/seeting/permissionOrg/roleManage',
              name: 'RoleManage',
              meta: {
                title: '角色管理',
              },
            },
            {
              path: '/seeting/permissionOrg/deptManage',
              name: 'DeptManage',
              meta: {
                title: '部门管理',
              },
            },
            {
              path: '/seeting/permissionOrg/territorialManagement',
              name: 'PermissionManage',
              meta: {
                title: '属地管理单位管理',
              },
            },
          ],
        },
        {
          path: '/seeting/processConfig',
          name: 'ProcessConfig',
          meta: {
            title: '流程配置',
          },
          children: [
            {
              path: '/seeting/processConfig/newApprovalProcess',
              name: 'NewApprovalProcess',
              meta: {
                title: '新建审批流程',
              },
            },
            {
              path: '/seeting/processConfig/onlineApprovalProcess',
              name: 'OnlineApprovalProcess',
              meta: {
                title: '上线审批流程',
              },
            },
            {
              path: '/seeting/processConfig/offlineApprovalProcess',
              name: 'OfflineApprovalProcess',
              meta: {
                title: '下线审批流程',
              },
            },
          ],
        },
      ]
    } else if (url === '/resource' || url.startsWith('/resource/')) {
      menuRoute = []
    }
    state.menus = menuRoute
  }
}
const actions = {
  setMenus ({ commit }, url) {
    console.log('1111111')
    commit('setMenus', url)
  },
  // 初始化菜单，根据当前路由设置菜单
  initMenus ({ commit }, currentPath) {
    console.log('初始化菜单，当前路径:', currentPath)
    commit('setMenus', currentPath)
  },
  /**
   * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
   * @description intelligence模式设置路由
   * @param {*} { commit }
   * @param {*} permissions
   * @returns
   */
  async setRoutes ({ commit }, permissions) {
    //根据permissions做路由筛选
    let accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
    commit('setRoutes', accessedRoutes)
    return accessedRoutes
  },
  /**
   * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
   * @description all模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setAllRoutes ({ commit }) {
    try {
      let { data } = await getRouterList()
      if (!data || !Array.isArray(data)) {
        console.error('后端返回的路由数据格式不正确', data)
        data = []
      }

      const accessedRoutes = convertRouter(data)
      commit('setAllRoutes', accessedRoutes)
      return accessedRoutes
    } catch (error) {
      console.error('获取路由列表失败', error)
      commit('setAllRoutes', [])
      return []
    }
  },
}
export default { state, getters, mutations, actions }
