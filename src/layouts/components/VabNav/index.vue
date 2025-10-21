<template>
  <div class="nav-container">
    <el-row type="flex" justify="space-between">
      <el-col>
        <div class="left-panel">
          <vab-icon :icon="['fas', collapse ? 'indent' : 'outdent']" class="fold-unfold" @click="handleCollapse" />
          <vab-breadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col class="col-nav">
        <div @click="navigatorTo('/resource')">电子资源库</div>
        <div @click="navigatorTo('/workstation')">审批工作台</div>
        <div @click="navigatorTo('/seeting')">系统配置</div>
      </el-col>
      <el-col>
        <div class="right-panel">
          <vab-error-log />
          <vab-full-screen @refresh="refreshRoute" />
          <vab-theme class="hidden-xs-only" />
          <vab-icon :icon="['fas', 'sync-alt']" :pulse="pulse" title="重载所有路由" @click="refreshRoute" />
          <vab-avatar />
          <!--  <vab-icon
            title="退出系统"
            :icon="['fas', 'sign-out-alt']"
            @click="logout"
          />-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'VabNav',
  data() {
    return {
      pulse: false,
      timeOutID: null,
      isNavigating: false,
    }
  },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        visitedRoutes: 'tabsBar/visitedRoutes',
        device: 'settings/device',
        routes: 'routes/routes',
      }),
    },
    methods: {
      ...mapActions({
        changeCollapse: 'settings/changeCollapse',
        setMenus: 'routes/setMenus',
      }),
      handleCollapse() {
        this.changeCollapse()
      },
      async refreshRoute() {
        this.$baseEventBus.$emit('reload-router-view')
        this.pulse = true
        this.timeOutID = setTimeout(() => {
          this.pulse = false
        }, 1000)
      },
      async navigatorTo(url) {
        // 防止重复点击
        if (this.isNavigating) {
          return
        }
        
        // 如果当前已经在目标路由，不进行跳转
        if (this.$route.path === url) {
          return
        }
        
        this.isNavigating = true
        
        try {
          await this.setMenus(url)
          await this.$router.push(url)
        } catch (error) {
          console.error('路由跳转失败:', error)
        } finally {
          // 延迟重置状态，防止快速连续点击
          setTimeout(() => {
            this.isNavigating = false
          }, 300)
        }
      },
    },

    beforeDestroy() {
      clearTimeout(this.timeOutID)
    },
  }
</script>

<style lang="scss" scoped>
  .nav-container {
    position: fixed;
    height: $base-nav-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6);
    top: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    box-sizing: border-box;
    z-index: 999;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%);
      pointer-events: none;
    }

    .left-panel {
      position: relative;
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-bar-height;
    }

    ::v-deep {
      .fold-unfold {
        margin-right: 12px;
      }
      svg {
        width: 1em;
        height: 1em;
        padding: 9px;
        color: rgba(0, 0, 0, 0.7);
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        &:hover {
          color: rgba(0, 0, 0, 0.9);
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
        }

        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
        }
      }

      button {
        svg {
          margin-right: 0;
          color: rgba(255, 255, 255, 0.95);
          background: linear-gradient(135deg, rgba(77, 138, 240, 0.9) 0%, rgba(52, 120, 246, 0.95) 100%);
          border-color: rgba(77, 138, 240, 0.8);
          cursor: pointer;
          fill: rgba(255, 255, 255, 0.95);

          &:hover {
            background: linear-gradient(135deg, rgba(77, 138, 240, 1) 0%, rgba(52, 120, 246, 1) 100%);
            border-color: rgba(77, 138, 240, 1);
            box-shadow: 0 4px 12px rgba(77, 138, 240, 0.3), 0 2px 4px rgba(77, 138, 240, 0.2);
          }
        }
      }

      .el-badge {
        margin-right: 0;

        .el-button {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(0, 0, 0, 0.15);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
          }
        }
      }

      .user-name {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
      }

      .user-avatar {
        border: 2px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }
      }
    }

    .right-panel {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: $base-nav-bar-height;
      gap: 12px;
    }
    .col-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:hover {
        color: #007bff;
      }
    }
  }
</style>
