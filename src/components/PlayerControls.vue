<template>
  <div @click="playerHandler" class="video_controls">
    <span :play="playerState" class="line"/>
    <span :play="playerState" class="line"/>
    <span :play="playerState" class="line"/>
    <span :play="playerState" class="line"/>
  </div>
</template>

<script>
export default {
  name: "player-controls",
  props: {
    player: {
      type: Object,
      required: true
    },
    isLoaderEnded: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      playerState: this.isLoaderEnded
    }
  },
  watch: {
    isLoaderEnded(value) {
      this.playerState = value;
    }
  },
  methods: {
    playerHandler() {
      if (this.playerState) {
        this.player.pauseVideo();
        this.playerState = false;
      } else {
        this.player.playVideo();
        this.playerState = true;
      }
    }
  }
}
</script>

<style scoped>
.video_controls {
  display: flex;
  cursor: pointer;
}

.line {
  height: 1rem;
  width: 1.7px;
  margin-inline: 0.1rem;
  background: white;
  animation: lineAnim 1s ease infinite;
}

.line[play="true"] {
  animation-play-state: running;
}

.line[play="false"] {
  animation-play-state: paused;
}

.video_controls span:nth-child(1) {
  animation-delay: 0.2s;
}

.video_controls span:nth-child(2) {
  animation-delay: 0.3s;
}

.video_controls span:nth-child(3) {
  animation-delay: 0.4s;
}

.video_controls span:nth-child(4) {
  animation-delay: 0.5s;
}


@keyframes lineAnim {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.3);
  }
  100% {
    transform: scaleY(1);
  }
}

</style>