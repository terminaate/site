<template>
  <div class="repositories_page">
    <div class="container">
      <input v-model="searchInput" class="search_input" placeholder="Search repositories" type="text">
      <TransitionGroup name="repos" class="repos" tag="ul">
          <ul class="repo" v-for="repo in getPosts" :key="repo.id">
            <div class="repo_header">
              <div>
                <a class="repo_avatar" href="https://github.com/terminaate.xyz" target="_blank">
                  <img :src="repo.ownerAvatar" alt="">
                </a>
                <a class="repo_name" :href="repo.url" target="_blank"> {{ repo.name }}</a>
              </div>
              <img class="repo_lang" :src="getIconByLanguage(repo.language)" alt="">
            </div>
            <div class="repo_main">
              <span class="repo_description"> {{ repo.description }} </span>
              <div class="repo_updated-at">
                <i class="uil uil-clock"></i>
                <!--            <img src="" alt="">-->
                <span>{{ `${repo.updated_at.day} ${repo.updated_at.month} ${repo.updated_at.year}` }}</span>
              </div>
            </div>
          </ul>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepositoriesPage",
  data() {
    return {
      repos: [],
      searchInput: ""
    }
  },
  methods: {
    getIconByLanguage(lang) {
      lang = String(lang).toLowerCase()

      switch (lang) {
        case "html":
          lang = lang + 5
          break

        case "vue":
          lang = lang + ".js"
          break

        case "css":
          lang = lang + 3
          break
      }

      return `https://shields.io/badge/-000.svg?logo=${lang}&style=flat-square`
    }
  },
  computed: {
    getPosts() {
      if (this.searchInput) {
        return this.repos.filter(obj => obj.name.split("/")[1].includes(this.searchInput.toLowerCase()));
      } else {
        return this.repos
      }
    }
  },
  async mounted() {
    const repos = await fetch("https://api.github.com/users/terminaate/repos", {
      headers: {
        "Content-Type": "application.json"
      }
    }).then(r => r.json())

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    repos.forEach(repo => {
      const repoUpdatedAt = new Date(repo.updated_at)

      this.repos.push({
        id: repo.id,
        name: repo.full_name,
        description: repo.description,
        ownerAvatar: repo.owner.avatar_url,
        language: repo.language,
        updated_at: {
          year: repoUpdatedAt.getFullYear(),
          month: months[repoUpdatedAt.getMonth()],
          day: repoUpdatedAt.getDay(),
        },
        url: repo.html_url
      })
    })
  }
}
</script>

<style scoped>
.repositories_page {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container {
  z-index: 15;
  height: calc(100% - 100px);
  padding-inline: 16px;
  /*min-width: 55%;*/
  min-width: 55%;
  font-family: var(--font-secondary);
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.search_input {
  width: 100%;
  padding: 15px;
  background: none;
  border: 1px solid var(--text-primary);
  font-family: var(--font-secondary);
  color: var(--text-primary);
}

.repos {
  margin-top: 30px;
  height: 70%;
  width: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

@media screen and (max-width: 744px) {
  .repos {
    grid-template-columns: 1fr;
  }
}

.repos-enter-active,
.repos-leave-active {
  transition: all 0.5s ease;
}

.repos-enter-from,
.repos-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.repo {
  background: none;
  cursor: default;
  /*background-color: var(--background-thirty);*/
  /*border-radius: 5px;*/
  border: 1px solid var(--text-primary);
  padding: 17px;
  transition: .2s;
  min-height: 150px;
  width: 400px;
}

@media screen and (max-width: 826px) {
  .repo {
    width: auto;
  }
}

.repo_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.repo_header div {
  display: flex;
  align-items: center;
}

.repo_avatar img {
  height: 30px;
  border-radius: 50%;
}

.repo_name {
  font-size: 14px;
  text-decoration: none;
  color: var(--text-primary);
  margin-left: 10px;
}

.repo_name:hover {
  text-decoration: underline;
}

.repo_updated-at {
  margin-top: 10px;
}

.repo_main {
  margin-top: 10px;
}

.repo_description {
  font-size: 13px;
}

.repo_updated-at {
  font-size: 12px
}
</style>