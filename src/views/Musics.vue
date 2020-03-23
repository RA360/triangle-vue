<template>
  <section class="section">
    <div class="container">
      <div class="music">
        <p v-if="!musicPost" class="loading">Loading...</p>
        <div class="music__img fill">
          <img :src="require(`@/assets/img/${musicPost.img}`)" class="full-width" alt />
        </div>
        <div class="music__content">
          <h2 class="music__title">{{musicPost.title}}</h2>
          <audio
            ref="musicAudio"
            class="music__audio"
            :src="require(`@/assets/audios/${musicPost.audio}.mp3`)"
            controls
          ></audio>
        </div>
      </div>
      <div class="musics">
        <p v-if="!musics" class="loading">Loading...</p>
        <div class="musics__card" v-for="(music,index) in musics" :key="index">
          <router-link :to="`/musics/${music.id}`" class="fill">
            <img :src="require(`@/assets/img/${music.imgSm}`)" class="full-width" alt />
          </router-link>
          <router-link :to="`/musics/${music.id}`" class="musics__title">{{music.title}}</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      musicsList: null,
      musics: null,
      musicPost: null
    };
  },
  created() {
    this.getMusics();
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    getMusics() {
      this.$axios.get("/db/musics.json").then(response => {
        this.musicPost = response.data.filter(
          e => e.id == (this.$route.params.id || 1)
        )[0];
        this.musicsList = response.data;
        this.musics = response.data
          .filter(e => e.id != (this.$route.params.id || 1))
          .slice(0, 10);
      });
    },
    onScroll() {
      const root = document.documentElement || document.body;
      if (
        root.scrollTop + window.innerHeight == root.offsetHeight &&
        this.musics.length + 1 < this.musicsList.length
      )
        this.musics.push(
          this.musicsList.slice(this.musics.length, this.musics.length + 3)[0]
        );
    }
  },
  watch: {
    $route: function() {
      this.getMusics();
      this.$refs.musicAudio.load();
    }
  }
};
</script>
<style lang="scss">
.music {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 70px;
  &__img {
    width: 25.52%;
  }
  &__content {
    width: calc(74.48% - 50px);
  }
  &__title {
    text-transform: uppercase;
    word-break: break-word;
  }
  &__audio {
    height: 45px;
    margin-top: 37px;
  }
}
.musics {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0 -12px;
  &__card {
    width: calc(100% / 7 - 24px);
    display: flex;
    flex-direction: column;
    margin: 0 12px 24px;
  }
  &__title {
    font: 19px/1.315 "PlayfairDisplay-Regular", sans-serif;
    letter-spacing: 0.0326em;
    word-break: break-word;
    margin-top: 26px;
  }
}
@media screen and (max-width: 1300px) {
  .music {
    margin-bottom: 63px;
  }
  .musics {
    &__card {
      width: calc(100% / 6 - 24px);
    }
  }
}

@media screen and (max-width: 1200px) {
  .music {
    margin-bottom: 56px;
  }
  .musics {
    &__card {
      width: calc(20% - 24px);
    }
  }
}

@media screen and (max-width: 992px) {
  .music {
    &__img {
      width: 30.52%;
    }
    &__content {
      width: calc(69.48% - 25px);
    }
    &__title {
      font-size: 55px;
    }
    &__audio {
      margin-top: 30px;
    }
  }
  .musics {
    &__card {
      width: calc(25% - 24px);
    }
  }
}

@media screen and (max-width: 768px) {
  .music {
    flex-direction: column;
    margin-bottom: 49px;
    &__img,
    &__content {
      width: 100%;
    }
    &__title {
      font-size: 48px;
      margin-top: 27px;
    }
  }
  .musics {
    &__card {
      width: calc(33.3333% - 24px);
    }
  }
}

@media screen and (max-width: 576px) {
  .musics {
    margin: 0 -18px;
    &__card {
      width: calc(50% - 36px);
      margin: 0 18px 36px;
    }
  }
}

@media screen and (max-width: 400px) {
  .music {
    &__title {
      font-size: 36px;
      margin-top: 20px;
    }
    &__audio {
      transform: scale(0.8);
      transform-origin: 0 0;
      margin-top: 26px;
    }
  }
  .musics {
    margin: 0 -12px;

    &__card {
      width: calc(50% - 24px);
      margin: 0 12px 24px;
    }
    &__title {
      margin-top: 22px;
    }
  }
}
</style>
