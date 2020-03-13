<template>
  <section class="section">
    <div class="container">
      <div class="media">
        <p v-if="!galleries && !videos" class="loading">Loading...</p>
        <div class="media__box">
          <ul class="galleries">
            <li class="gallery fill" v-for="(gallery,index) in galleries" :key="index">
              <img class="full-width" :src="require(`@/assets/img/${gallery.img}`)" alt />
            </li>
          </ul>
          <ul>
            <li class="video fill" v-for="(video,index) in videos" :key="index">
              <img class="full-width" :src="require(`@/assets/img/${video.img}`)" alt />
              <button @click="insertVideo" class="play" :data-video="`${video.video}`"></button>
            </li>
          </ul>
        </div>
        <ul class="socials">
          <li class="socials__item">
            <p class="socials__title">Our</p>
          </li>
          <li class="socials__item">
            <a class="social" href="https://t.me/RAIbrahim360" target="_blank">Telegram</a>
          </li>
          <li class="socials__item">
            <a
              class="social"
              href="https://www.instagram.com/raibrahim360/"
              target="_blank"
            >Instagram</a>
          </li>
          <li class="socials__item">
            <a class="social" href="https://wa.me/994517833377" target="_blank">Whatsapp</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      galleries: null,
      videos: null
    };
  },
  created() {
    this.getGalleries();
    this.getVideos();
  },
  methods: {
    getGalleries() {
      this.$axios
        .get("/db/galleries.json")
        .then(response => (this.galleries = response.data));
    },
    getVideos() {
      this.$axios
        .get("/db/videos.json")
        .then(response => (this.videos = response.data));
    },
    insertVideo(event) {
      event.target.parentNode.innerHTML = `<video src="${require(`@/assets/videos/${event.target.dataset.video}`)}" autoplay controls></video>`;
    }
  }
};
</script>

<style lang="scss">
.media {
  display: flex;
  justify-content: space-between;
  position: relative;

  &__box {
    display: flex;
    margin-left: 62px;
  }
}

.galleries {
  columns: auto 2;
  column-gap: 27px;
  margin-right: 27px;
}

.gallery {
  width: 258px;
  display: flex;
  align-items: flex-start;
}

.video {
  width: 449px;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
}

.gallery:not(:last-child),
.video:not(:last-child) {
  margin-bottom: 27px;
}

.play {
  position: absolute;
  background-color: #090909;
  background-image: url("../assets/img/play.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 27.94% 35.3%;
  width: 15.15%;
  height: 26.93%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
}

.socials {
  display: flex;
  flex-direction: column;
  text-align: right;
  position: fixed;
  width: 1254px;
  top: calc(50vh - 88px);
  left: 50%;
  transform: translateX(-50%);
  // right: 28px;
  // margin-top: 200px;
  &__item {
    margin: 12px 0;
  }
  &__title {
    color: #4d4d4d;
    opacity: 1;
  }
}

.social {
  font-size: 16px;
  position: relative;
  &::after {
    content: "";
    width: 0;
    height: 1px;
    background: #fff;
    position: absolute;
    right: 0;
    bottom: -1px;
    transition: all 0.3s ease;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
}

@media screen and (max-width: 1300px) {
  .media {
    &__box {
      margin: 0 140px 0 0;
    }
  }
  .galleries {
    column-gap: 20px;
    margin-right: 20px;
  }
  .gallery:not(:last-child),
  .video:not(:last-child) {
    margin-bottom: 20px;
  }
  .gallery,
  .video {
    width: 100%;
  }
  .socials {
    width: 1060px;
    &__title {
      font-size: 16px;
    }
    &__item {
      margin: 11px 0;
    }
  }
  .social {
    font-size: 15px;
  }
}

@media screen and (max-width: 1200px) {
  .galleries {
    column-gap: 15px;
    margin-right: 15px;
  }
  .gallery:not(:last-child),
  .video:not(:last-child) {
    margin-bottom: 15px;
  }
  .media {
    &__box {
      margin-right: 130px;
    }
  }
  .socials {
    width: 960px;
    &__item {
      margin: 9px 0;
    }
    &__title {
      font-size: 15px;
    }
  }
  .social {
    font-size: 14px;
  }
}

@media screen and (max-width: 992px) {
  .media {
    &__box {
      margin-right: 115px;
    }
  }
  .galleries {
    columns: auto;
    margin-right: 10px;
  }
  .gallery:not(:last-child),
  .video:not(:last-child) {
    margin-bottom: 10px;
  }
  .socials {
    width: 720px;
    &__item {
      margin: 8px 0;
    }
    &__title {
      font-size: 14px;
    }
  }
  .social {
    font-size: 13px;
  }
}

@media screen and (max-width: 768px) {
  .media {
    flex-direction: column-reverse;
    &__box {
      margin: 0;
    }
  }
  .socials {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    position: static;
    transform: none;
    &__item {
      margin: 0 9px;
      display: flex;
    }
    &__title {
      font-size: 15px;
    }
  }
  .social {
    font-size: 14px;
  }
}

@media screen and (max-width: 576px) {
  .media {
    &__box {
      flex-direction: column-reverse;
    }
  }
  .galleries {
    margin: 10px 0 0;
  }
}

@media screen and (max-width: 400px) {
  .socials {
    margin-bottom: 31px;
    &__title {
      font-size: 13px;
    }
    &__item {
      margin: 0 7px;
    }
  }
  .social {
    font-size: 12px;
  }
}
</style>