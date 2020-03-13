<template>
  <section class="empty">
    <div class="container">
      <div class="empty__content">
        <h2 class="empty__title">404</h2>
        <p class="empty__txt">Whoops! Nothing here pal.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.empty {
  position: relative;
  height: 100%;
  text-align: center;
  overflow: hidden;
  &__content {
    position: absolute;
    top: calc(50% - 170px);
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__title {
    // font-family: "Karla", sans-serif;
    font-size: 438px;
    line-height: normal;
    // margin-top: -180px;
  }
  &__txt {
    font-size: 33px;
    margin-top: 10px;
  }
}
@media screen and (max-width: 992px) {
  .empty {
    &__content {
      top: calc(50% - 150px);
    }
    &__title {
      font-size: 380px;
    }
    &__txt {
      font-size: 28px;
    }
  }
}
@media screen and (max-width: 768px) {
  .empty {
    &__content {
      top: calc(50% - 130px);
    }
    &__title {
      font-size: 280px;
    }
    &__txt {
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 576px) {
  .empty {
    &__content {
      top: calc(50% - 100px);
    }
    &__title {
      font-size: 50vw;
    }
    &__txt {
      font-size: 3.77vw;
    }
  }
}
</style>