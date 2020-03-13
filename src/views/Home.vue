<template>
  <section class="home">
    <div class="container">
      <div class="home__row">
        <h1 class="home__title">
          Great
          <span class="italic">Music</span> Production.
        </h1>
        <p class="slogan">Breath, Music, Repeat.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.home {
  background: url("../assets/img/home-bg.png") no-repeat center / cover;
  height: 100%;
  padding-top: 119px;
  &__row {
    margin-left: 16%;
  }
  &__title {
    text-transform: uppercase;
    margin-bottom: 48px;
  }
}

@media screen and (max-width: 768px) {
  .home {
    &__row {
      margin-left: 24px;
    }
  }
}

@media screen and (max-width: 550px) {
  .home {
    padding-top: 20%;
    &__title {
      font-size: 11vw;
      margin-bottom: 9%;
    }
  }
  .slogan {
    font-size: 2.79vw;
  }
}
</style>
