<template>
  <div :visible="visible" @click="hideLoaderScreen" class="loader__screen">
    <particles/>
  </div>
</template>

<script>
import Particles from "./Particles.vue";

export default {
  name: "LoaderComponent",
  components: {Particles},
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: ""
    }
  },
  methods: {
    hideLoaderScreen() {
      if (this.player ? true : false) {
        this.visible = "hidden";
        setTimeout(() => {
          this.visible = "none"
        }, 900)
        this.player.playVideo();
        this.$emit("ended")
      }
    }
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      this.visible = "body-loaded"
    })
  }
}
</script>

<style scoped>
.loader__screen {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: var(--background-primary);
  transition: 1s;
}

.loader__screen[visible="body-loaded"] {
  background-color: var(--background-secondary);
  cursor: pointer;
}

.loader__screen[visible="none"] {
  display: none;
}

.loader__screen[visible="hidden"] {
  opacity: 0;
  pointer-events: none;
  cursor: default;
}
</style>