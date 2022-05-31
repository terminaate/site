<template>
  <div class="home_view">
    <div class="center_text">
      <span class="logo_text">Termina<span>a</span>te</span>
      <span class="desc_text">what are you doing here?</span>
<!--      <span @click="aboutMeCard = true" class="aboutme_link">about me</span>-->
    </div>
    <div class="social_links">
      <a href="https://github.com/terminaate" rel="noreferrer" target="_blank" class="github_link">
        <img src="../assets/icons/github.svg" alt=""/>
      </a>
      <div @click="copyDiscordLink" class="discord_link">
        <img src="../assets/icons/discord.svg" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    async copyDiscordLink() {
      navigator.clipboard.writeText("Terminaate#9274")
          .then(() =>alert("Discord tag has been copied!"))
          .catch(e => {
            alert("I couldn't copy the Discord tag.")
            console.log(e)
          })
    }
  }
}
</script>

<style scoped>
.home_view {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.center_text {
  width: max-content;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 1s;
}

.logo_text {
  font-family: var(--font-logo);
  font-size: 65px;
  user-select: none;
}

.logo_text span {
  text-decoration: line-through;
}

.desc_text {
  font-size: 14px;
  font-family: var(--font-secondary);
}

.aboutme_link {
  font-family: var(--font-secondary);
  font-size: 14px;
  margin-top: 20px;
  user-select: none;
  cursor: pointer;
  text-decoration: underline;
}

.social_links {
  margin-top: 30px;
  display: flex;
  align-items: center;
}

.discord_link,
.github_link {
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin-inline: 5px;
  transition: 0.2s transform;
}

.discord_link:hover,
.github_link:hover {
  transform: translateY(-16%);
}
</style>