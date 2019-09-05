<template>
  <div class="main">
    <Layout>
      <Header class="layout-top">
        <Menu class="head" mode="horizontal" :active-name="activeMenuName" @on-select="onSelectMenu">
          <div class="site-select">
            <SiteSelect width="160" :clearable="false" @on-site-change="onSiteChange"/>
          </div>
          <div class="head-nav">
            <menu-item name="member">会员管理</menu-item>
            <menu-item name="finance">财务管理</menu-item>
            <menu-item name="agency">代理管理</menu-item>
            <menu-item name="report">报表管理</menu-item>
            <menu-item name="lottery">彩票管理</menu-item>
            <menu-item name="system">系统配置</menu-item>
          </div>
          <div class="custom-content-con">
            <div class="custom-item">
              <Badge dot>
                <Icons type="daohanglanxinxi" size="32" color="#ccc"></Icons>
              </Badge>
            </div>
            <div class="custom-item">
              <Badge dot>
                <Icons type="daohanglangonggao" size="32" color="#ccc"></Icons>
              </Badge>
            </div>
            <Dropdown @on-click="dispatchUserAct">
              <a href="javascript:void(0)" style="font-size:26px">super_admin
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="password">变更密码</DropdownItem>
                <DropdownItem name="userInfo">个人信息</DropdownItem>
                <DropdownItem name="logout">安全退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout class="layout-bottom">
        <Sider
          class="side-menu"
          ref="sideMenu"
          hide-trigger
          collapsible
          :width="160"
          :collapsed-width="40"
          v-model="collapsed"
          :style="{background: '#fff'}"
        >
          <Menu v-if="allRoutes[activeMenuName]" :active-name="$route.name" width="auto" :class="menuitemClasses">
            <li class="nav-side">
              <span>{{subMenuTitle}}</span>
              <Icons @click.native="collapsedSider" :type="expandIcon"/>
            </li>
            <div v-for="i in allRoutes[activeMenuName].children" :key="i.name">
              <menu-item :name="i.name" v-if="!i.meta.hideInMenu">
                <router-link :to="{name:i.name}">
                  <Icons :type="i.meta.icon"/>
                  <span>{{i.meta.title}}</span>
                  <span class="collapse-hover" style="width:161px">
                    <a>
                      <Icons :type="i.meta.icon" color="#fff"/>
                      <span>{{i.meta.title}}</span>
                    </a>
                  </span>
                </router-link>
              </menu-item>
            </div>
          </Menu>
        </Sider>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <TagsNav
                :value="$route"
                @input="handleClick"
                :list="tagNavList"
                @on-close="handleCloseTag"
              />
            </div>
            <Content class="content-wrapper">
              <keep-alive :include="cacheList" :exclude="notCacheName">
                <router-view/>
              </keep-alive>
              <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import TagsNav from "@/components/tags-nav";
import SiteSelect from "@/components/site-select";
import ABackTop from "@/components/a-back-top";
import routers from "@/router/routers";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, getNextRoute, routeEqual } from "@/libs/util";
import allRoutes from "@/router/routes";
import "./main.less";
export default {
  components: {
    Icons,
    TagsNav,
    SiteSelect,
    ABackTop
  },
  data() {
    return {
      collapsed: false,
      allRoutes: allRoutes,
      activeMenuName: localStorage.activeMenuName || "member",
      subMenuTitle: "会员管理"
    };
  },
  computed: {
    expandIcon() {
      return this.collapsed ? "cebianlanzhankai" : "cebianlanshouqi";
    },
    menuitemClasses() {
      return ["expand-menu", this.collapsed ? "collapsed-menu" : ""];
    },
    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
    tagRouter() {
      return this.$store.state.app.tagRouter;
    },
    notCacheName () {
      return [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : '']
    },
    cacheList() {
      const list = [...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []];
      return list;
    },
    menuList() {
      return this.$store.getters.menuList;
    }
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta, path } = newRoute;
      this.addTag({
        route: { name, query, params, meta, path },
        type: "push"
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.setActiveRouteInLocal(newRoute);
    }
  },
  mounted() {
    /**
     * @description 初始化标签导航
     */
    this.setTagNavList();
    this.setHomeRoute(routers);
    this.addTag({
      route: this.$store.state.app.homeRoute
    });
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      });
    }
    window.addEventListener("resize", () => {
      if(document.documentElement.clientWidth <= 1470) this.collapsed = true;
    })
  },
  methods: {
    ...mapActions(['handleLogOut']),
    ...mapMutations(["setTagNavList", "addTag", "setHomeRoute", "closeTag"]),
    collapsedSider() {
      this.$refs.sideMenu.toggleCollapse();
    },
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    handleClick(item) {
      this.turnToPage(item);
      this.updateMenu(item.path);
    },
    handleCloseTag(res, type, route) {
      if (type !== "others") {
        if (type === "all") {
          this.turnToPage(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    onSiteChange(site) {
      localStorage.currentSite = JSON.stringify(site);
    },
    onSelectMenu(key) {
      this.subMenuTitle = allRoutes[key].meta.title;

      // 如果本地无数据，直接跳转对应路由第一个
      // 如果本地有数据，并且他的path包含此时的主菜单的name值，则跳转本地存储的路由
      let activeRoute = localStorage.activeRoute;
      if (!activeRoute || !JSON.parse(activeRoute)[key]) {
        this.$router.push({ name: allRoutes[key].name });
      } else {
        const { name } = JSON.parse(activeRoute)[key];
        this.$router.push({ name });
      }
    },
    updateMenu(path) {
      const { key, value } = this.testPath(path);
      this.subMenuTitle = value;
    },
    setActiveRouteInLocal(route) {
      const { name, query, params, meta, path } = route;
      const { key } = this.testPath(path);
      let dataInLocal = localStorage.activeRoute;
      let obj = dataInLocal ? JSON.parse(dataInLocal) : {};
      obj[key] = { name };
      if (!meta.hideInMenu) {
        localStorage.activeRoute = JSON.stringify(obj);
      }
    },
    testPath(path) {
      let key, value;
      if (/^\/member/i.test(path)) {
        key = "member";
        value = "会员管理";
      } else if (/^\/finance/i.test(path)) {
        key = "finance";
        value = "财务管理";
      } else if (/^\/agency/i.test(path)) {
        key = "agency";
        value = "代理管理";
      } else if (/^\/report/i.test(path)) {
        key = "report";
        value = "报表管理";
      } else if (/^\/lottery/i.test(path)) {
        key = "lottery";
        value = "彩票管理";
      } else if (/^\/system/i.test(path)) {
        key = "system";
        value = "系统配置";
      } else {
        key = "member";
        value = "会员管理";
      }
      this.activeMenuName = key;
      localStorage.activeMenuName = key ;
      return { key, value };
    },
    logout () {
      console.log(1111)
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    dispatchUserAct(name){
      if(name === 'password'){

      }else if(name === 'userInfo'){

      }else if(name === 'logout'){
        this.logout()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.router-link-exact-active,
.router-link-active {
  border-right: 4px solid #62b1fd;
  background: #ffffff;
  color: #62b1fd !important;
  padding-left: 5px;
}
</style>


