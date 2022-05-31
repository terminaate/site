<template>
  <router-view v-slot="{ Component }">
    <LoaderComponent :player="player" @ended="isLoaderEnded = true"/>
    <HeaderComponent :routes-menu="routesMenu" @menu-trigger="routesMenu = $event" :is-loader-ended="isLoaderEnded"
                     :player="player"/>
    <div class="basic_page">
      <Transition>
        <component :is="Component"/>
      </Transition>
    </div>
    <div :path="$route.path" class="background_dark"/>
    <div class="background">
      <BackgroundPlayer @ready="player = $event"/>
    </div>
  </router-view>
</template>

<script>
import LoaderComponent from "./components/Loader";
import BackgroundPlayer from "./components/BackgroundPlayer";
import HeaderComponent from "./components/Header";

export default {
  name: "app",
  components: {HeaderComponent, BackgroundPlayer, LoaderComponent},
  data() {
    return {
      player: null,
      isLoaderEnded: false,
      routesMenu: true,
    }
  }
}
</script>

<style scoped>

.basic_page {
  position: absolute;
  height: 100%;
  bottom: 0;
  width: 100%;
  z-index: 10;
  transition: transform .2s;
}

.background_dark {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5;
  background-color: var(--background-secondary);
  transition: .3s;
}

.background_dark[path="/repos"] {
  background-color: var(--background-primary);
}

.background {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -99;
  background-attachment: fixed;
}
</style>