<template>
  <div
    :class="{ 'full-height': $route.name == 'Home' || $route.name == '404' || openDropdown }"
    id="app"
  >
    <header class="header">
      <div class="container">
        <div class="header__row">
          <router-link to="/">
            <img src="@/assets/img/logo.svg" alt="Triangle" />
          </router-link>
          <nav class="menu hidden">
            <li class="menu__item">
              <router-link to="/" class="menu__link" active-class="active" exact>Home</router-link>
            </li>
            <li class="menu__item">
              <router-link to="/news" class="menu__link" active-class="active">News</router-link>
            </li>
            <li class="menu__item">
              <router-link to="/musics" class="menu__link" active-class="active">Musics</router-link>
            </li>
            <li class="menu__item">
              <router-link to="/media" class="menu__link" active-class="active">Media</router-link>
            </li>
          </nav>
          <div class="spectrs" :class="{active: animSpectrs}" @click="setAudioState">
            <div class="spectr"></div>
            <div class="spectr spectr2"></div>
            <div class="spectr spectr3"></div>
            <div class="spectr spectr4"></div>
            <div class="spectr spectr5"></div>
          </div>
          <audio ref="bgAudio" class="bg-audio" autoplay muted loop>
            <source src="@/assets/audios/bg.mp3" type="audio/mpeg" />
            <source src="@/assets/audios/bg.mp3" type="audio/ogg" />
          </audio>
          <button
            class="hamburger"
            @click="openDropdown=!openDropdown"
            :style="{background: `url(${require(`@/assets/img/${openDropdown ? 'cross' : 'hamburger'}.svg`)}) no-repeat center`}"
          ></button>
        </div>
      </div>
    </header>
    <transition name="fade">
      <div class="dropdown" v-if="openDropdown">
        <nav class="menu">
          <li class="menu__item" @click="openDropdown = false">
            <router-link to="/" class="menu__link" active-class="active" exact>Home</router-link>
          </li>
          <li class="menu__item" @click="openDropdown = false">
            <router-link to="/news" class="menu__link" active-class="active">News</router-link>
          </li>
          <li class="menu__item" @click="openDropdown = false">
            <router-link to="/musics" class="menu__link" active-class="active">Musics</router-link>
          </li>
          <li class="menu__item" @click="openDropdown = false">
            <router-link to="/media" class="menu__link" active-class="active">Media</router-link>
          </li>
        </nav>
      </div>
    </transition>
    <router-view />
    <transition name="fade">
      <button v-if="showScrollBtn" @click="scrollToTop" class="scroll"></button>
    </transition>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      animSpectrs: true,
      openDropdown: false,
      userStopBgAudio: false,
      showScrollBtn: false
    };
  },
  mounted() {
    this.$refs.bgAudio.volume = 0.1;
    document.addEventListener("playing", this.stopBgAudio, true);
    document.addEventListener("pause", this.playBgAudio, true);
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    setAudioState() {
      if (this.animSpectrs) {
        this.animSpectrs = false;
        this.$refs.bgAudio.pause();
        this.userStopBgAudio = true;
      } else {
        this.animSpectrs = true;
        this.$refs.bgAudio.play();
        this.userStopBgAudio = false;
      }
    },
    playBgAudio(e) {
      if (e.target != this.$refs.bgAudio && !this.userStopBgAudio) {
        this.animSpectrs = true;
        this.$refs.bgAudio.play();
      }
    },
    stopBgAudio(e) {
      if (e.target != this.$refs.bgAudio && !this.userStopBgAudio) {
        this.animSpectrs = false;
        this.$refs.bgAudio.pause();
      }
    },
    onScroll() {
      this.showScrollBtn =
        document.body.scrollTop || document.documentElement.scrollTop > 0;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
};
</script>
<style lang="scss">
@font-face {
  font-family: "Karla";
  src: url("assets/fonts/Karla-Regular/Karla-Regular.eot");
  src: url("assets/fonts/Karla-Regular/Karla-Regular.woff") format("woff"),
    url("assets/fonts/Karla-Regular/Karla-Regular.ttf") format("truetype"),
    url("assets/fonts/Karla-Regular/Karla-Regular.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "PlayfairDisplay-Regular";
  src: url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.eot");
  src: url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.woff")
      format("woff"),
    url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf")
      format("truetype"),
    url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.svg")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "PlayfairDisplay-Italic";
  src: url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Italic.eot");
  src: url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Italic.woff")
      format("woff"),
    url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Italic.ttf")
      format("truetype"),
    url("assets/fonts/PlayfairDisplay/PlayfairDisplay-Italic.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

body {
  font: 400 17px "Karla", sans-serif;
  color: #fff;
  background: #0d0d0d;
  letter-spacing: 0.031em;
  position: relative;
  overflow-x: hidden;
  margin: 0;
}

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font: 67px/0.995 "PlayfairDisplay-Regular", sans-serif;
  letter-spacing: 0.0316em;
  margin: 0;
}

p {
  opacity: 0.1;
  margin: 0;
}

a,
button {
  outline: none;
}

a {
  color: #fff;
  text-decoration: none;
}

button {
  font-family: "PlayfairDisplay-Regular", sans-serif;
  border: none;
  display: block;
  background: none;
  padding: 0;
  cursor: pointer;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

img,
video {
  object-fit: cover;
}

video,
audio {
  outline: none;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.container {
  width: 1254px;
  margin: 0 auto;
}

.italic {
  font-family: "PlayfairDisplay-Italic", sans-serif;
  display: block;
}

.scroll {
  position: fixed;
  right: 40px;
  bottom: 54px;
  width: 20px;
  height: 27px;
  background: url("assets/img/scroll.svg");
  z-index: 99;
}

.header {
  padding: 44px 0;
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.menu {
  display: flex;
  &__item {
    margin: 0 17px;
  }
  &__link {
    color: #4d4d4d;
    text-transform: uppercase;
    transition: all 0.3s ease;
    &:hover {
      color: #fff;
    }
    &.active {
      color: #fff;
    }
  }
}

.dropdown {
  background: #0d0d0d;
  width: 100%;
  height: calc(100vh - 80px);
  border-top: 1px solid #323232;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
}

.loading {
  color: #fff;
  opacity: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.spectrs {
  opacity: 0.7;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s linear;
  &.active {
    opacity: 1;
    .spectr {
      animation-iteration-count: infinite;
    }
  }
}

.spectr {
  width: 1px;
  height: 7px;
  background: #fff;
  animation: 1.5s animSpectr;
  margin: 0 1px;
  &2 {
    animation-duration: 1.8s;
  }
  &3 {
    animation-duration: 1.9s;
  }
  &4 {
    animation-duration: 1.7s;
  }
  &5 {
    animation-duration: 1.6s;
  }
}

@keyframes animSpectr {
  0% {
    transform: scaleY(1);
  }
  20% {
    transform: scaleY(2);
  }
  to {
    transform: scaleY(1);
  }
}

.hamburger {
  display: none;
  min-width: 28px;
  height: 24px;
}

.full-width {
  width: 100%;
}

.full-height {
  overflow: hidden;
  height: 100vh;
}

.fill {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #121212;
    opacity: 0.5;
  }
}

.section {
  padding-top: 40px;
}

// News
.news {
  padding-top: 70px;
  &__list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  &__post {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    margin-bottom: 70px;
    &-part {
      width: calc(50% - 30px);
    }
  }
  &__title {
    font: 42px/1.388 "PlayfairDisplay-Regular", sans-serif;
    word-break: break-word;
  }
  &__desc {
    line-height: 1.96;
  }
  &__card {
    display: flex;
    flex-direction: column;
    width: calc(33.3333% - 66px);
    margin: 0 33px 66px;
    &-title {
      flex-grow: 1;
      margin-top: 39px;
    }
  }
  &__head {
    &::before,
    &::after {
      transition: all 0.2s linear;
    }
    &::after {
      opacity: 0;
      content: "Read More";
      font-size: 22px;
      letter-spacing: 0.032em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover {
      &::before {
        opacity: 0.9;
      }
      &::after {
        opacity: 1;
      }
    }
  }
  &__txt {
    flex-grow: 0;
    margin-top: 33px;
  }
}

@media screen and (max-width: 1300px) {
  .container {
    width: 1060px;
  }
  .news {
    padding-top: 63px;
    &__post {
      margin-bottom: 63px;
      &-part {
        width: calc(50% - 27px);
      }
    }
    &__list {
      margin: 0 -29px;
    }
    &__card {
      width: calc(33.3333% - 58px);
      margin: 0 29px 58px;
      &-title {
        margin-top: 35px;
      }
    }
    &__head {
      &::after {
        font-size: 20px;
      }
    }
    &__title {
      font-size: 38px;
    }
    &__txt {
      font-size: 16px;
      margin-top: 30px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .container {
    width: 960px;
  }
  .news {
    padding-top: 56px;
    &__post {
      margin-bottom: 56px;
      &-part {
        width: calc(50% - 24px);
      }
    }
    &__list {
      margin: 0 -25px;
    }
    &__card {
      width: calc(33.3333% - 50px);
      margin: 0 25px 50px;
      &-title {
        margin-top: 31px;
      }
    }
    &__head {
      &::after {
        font-size: 19px;
      }
    }
    &__title {
      font-size: 34px;
    }
    &__txt {
      font-size: 15px;
      margin-top: 27px;
    }
  }
}

@media screen and (max-width: 992px) {
  .container {
    width: 720px;
  }
  .news {
    &__post {
      flex-direction: column;
      &-part {
        width: 100%;
        &:first-child {
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
        }
      }
    }
    &__list {
      justify-content: space-between;
      margin: 0;
    }
    &__card {
      width: calc(50% - 25px);
      margin: 0 0 50px;
    }
    &__title {
      font-size: 30px;
      margin-top: 31px;
    }
    &__txt {
      font-size: 13px;
      margin-top: 21px;
    }
  }
}

@media screen and (max-width: 768px) {
  .container {
    width: 540px;
  }
  .section {
    padding-top: 14px;
  }
}

@media screen and (max-width: 576px) {
  .container {
    width: 100%;
    padding: 0 15px;
  }
  .header {
    padding: 26px 0;
  }
  .menu {
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.hidden {
      display: none;
    }
    &__item {
      margin: 17px 0;
    }
  }
  .hamburger {
    display: block;
  }
  .scroll {
    right: 19px;
    bottom: 26px;
  }
}

@media screen and (max-width: 500px) {
  .news {
    &__card {
      width: 100%;
    }
    &__head {
      height: 0;
      padding-bottom: 56.25%;
      overflow: hidden;
      &::after {
        font-size: 18px;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .news {
    &__title {
      font-size: 26px;
      margin-top: 23px;
    }
    &__txt {
      font-size: 13px;
      margin-top: 21px;
    }
  }
}
</style>
