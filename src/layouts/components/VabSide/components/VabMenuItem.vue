<template>
  <el-menu-item :index="handlePath(routeChildren.path)" @click="handleLink">
    <vab-icon
      v-if="routeChildren.meta.icon"
      :icon="['fas', routeChildren.meta.icon]"
      class="vab-fas-icon"
    />
    <span>{{ routeChildren.meta.title }}</span>
    <el-tag
      v-if="routeChildren.meta && routeChildren.meta.badge"
      effect="dark"
      type="danger"
    >
      {{ routeChildren.meta.badge }}
    </el-tag>
  </el-menu-item>
</template>

<script>
  import { isExternal } from '@/utils/validate'
  import path from 'path'

  export default {
    name: 'VabMenuItem',
    props: {
      routeChildren: {
        type: Object,
        default() {
          return null
        },
      },
      item: {
        type: Object,
        default() {
          return null
        },
      },
      fullPath: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isNavigating: false,
      }
    },
    methods: {
      handlePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.fullPath)) {
          return this.fullPath
        }
        return path.resolve(this.fullPath, routePath)
      },
      async handleLink() {
        // 防止重复点击
        if (this.isNavigating) {
          return
        }

        const routePath = this.routeChildren.path
        const target = this.routeChildren.meta.target
        const targetPath = path.resolve(this.fullPath, routePath)

        // 如果当前已经在目标路由，不进行跳转
        if (this.$route.path === targetPath) {
          return
        }

        this.isNavigating = true

        try {
          if (target === '_blank') {
            if (isExternal(routePath)) {
              window.open(routePath)
            } else if (isExternal(this.fullPath)) {
              window.open(this.fullPath)
            } else {
              let routeData = this.$router.resolve(targetPath)
              window.open(routeData.href)
            }
          } else {
            if (isExternal(routePath)) {
              window.location.href = routePath
            } else if (isExternal(this.fullPath)) {
              window.location.href = this.fullPath
            } else {
              await this.$router.push(targetPath)
            }
          }
        } catch (error) {
          console.error('侧边栏路由跳转失败:', error)
        } finally {
          // 延迟重置状态，防止快速连续点击
          setTimeout(() => {
            this.isNavigating = false
          }, 300)
        }
      },
    },
  }
</script>
