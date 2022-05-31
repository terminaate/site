<template>
  <YoutubeVue3
      ref="youtube"
      class="background_video"
      width="100%"
      height="100%"
      :videoid="videoId"
      :controls="0"
      :autoplay="0"
      :modestbranding="0"
  />
</template>

<script>
import {YoutubeVue3} from "youtube-vue3";

export default {
  name: "background-player",
  components: {YoutubeVue3},
  data() {
    return {
      routes: [
        {
          path: "/",
          video: "QKgm7TNDbPk"
        },
        {
          path: "/repos",
          video: "yydZbVoCbn0"
        }
      ]
    }
  },
  computed: {
    videoId() {
      return this.routes[this.routes.findIndex(obj => obj.path === this.$route.path)].video
    }
  },
  mounted() {
    this.$emit("ready", this.$refs.youtube.player);
    this.$refs.youtube.player.setVolume(10);
  }
}
</script>

<style scoped>
iframe {
  display: none;
}
</style>