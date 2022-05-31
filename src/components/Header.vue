<template>
  <header>
    <a @click="homeLinkHandler" class="home_link">Termina<span>a</span>te</a>
    <Transition>
      <div active="true" ref="routeMenu" v-if="routesMenu" class="routes_menu">
        <a :key="route" :active="$route.path === route.path" v-for="route in routes" @click="$router.push(route.path)">
          {{ route.meta ? route.meta.label : "" }}
        </a>
      </div>
    </Transition>
    <div class="left_content">
      <div @click="$emit('menu-trigger', !routesMenu)" :active="routesMenu" class="menu_button">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Transition>
        <PlayerControls v-if="Boolean(routes[routes.findIndex(obj => obj.path === $route.path)])" :is-loader-ended="Boolean(routes[routes.findIndex(obj => obj.path === $route.path)]) && isLoaderEnded" :player="player"/>
      </Transition>
    </div>
  </header>
</template>

<script>
import PlayerControls from "./PlayerControls";
import {routes} from "../router";

export default {
  name: "header-component",
  components: {PlayerControls},
  data() {
    return {
      routes
    }
  },
  props: {
    player: {
      type: Object,
      required: true
    },
    isLoaderEnded: {
      type: Boolean,
      required: true
    },
    routesMenu: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    homeLinkHandler() {
      if (this.$route.path !== "/") {
        return this.$router.push("/")
      }
      this.$emit("menu-trigger", !this.routesMenu)
    }
  },
  mounted() {
    window.onload = () => {
      let currentScrollY = 0
      let lastKnownScrollY = 0

      document.addEventListener("scroll", () => {
        currentScrollY = window.pageYOffset

        if (currentScrollY < 17) {
          this.$refs.routeMenu.setAttribute("active", "true")
        } else if (currentScrollY > lastKnownScrollY) {
          this.$refs.routeMenu.setAttribute("active", "false")
        }

        lastKnownScrollY = currentScrollY
      }, false)
    }
  }
}
</script>

<style scoped>
header {
  position: fixed;
  z-index: 20;
  top: 0;
  height: 57px;
  width: 100%;
  padding-top: 2rem;
  padding-inline: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left_content {
  display: flex;
  align-items: center;
}

.home_link {
  cursor: pointer;
  font-family: var(--font-logo);
  font-size: 13px;
  user-select: none;
  text-decoration: none;
  color: var(--text-primary)
}

.home_link span {
  text-decoration: line-through;
}

.menu_button {
  cursor: pointer;
  display: flex;
  /*align-items: center;*/
  flex-direction: column;
  margin-right: 20px;
}

.menu_button span {
  height: 1.6px;
  width: 1rem;
  margin-block: 0.1rem;
  background: white;
  transition: 0.3s;
}

.menu_button span:nth-child(1) {
  width: 0.33rem;
}

.menu_button span:nth-child(2) {
  width: 0.66rem;
}

.menu_button:hover span {
  width: 1rem;
}

.menu_button[active="true"] span {
  width: 1rem;
}

.routes_menu {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
}

.routes_menu[active="false"] {
  transform: translateY(-350%);
}

.routes_menu a {
  cursor: pointer;
  margin-inline: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: border-color .3s ease-in;
}

.routes_menu a[active="true"] {
  border-color: var(--text-primary);
}
</style>