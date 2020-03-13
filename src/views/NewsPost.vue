<template>
  <section class="news">
    <div class="container">
      <ul class="news__post">
        <p v-if="!newsPost" class="loading">Loading...</p>
        <li class="news__post-part fill">
          <img :src="require(`@/assets/img/${newsPost.img}`)" class="full-width" alt />
        </li>
        <li class="news__post-part">
          <h2 class="news__title">{{newsPost.title}}</h2>
          <p class="news__desc news__txt">{{newsPost.desc}}</p>
        </li>
      </ul>
      <ul class="news__list">
        <p v-if="!news" class="loading">Loading...</p>
        <li class="news__card" v-for="(post,index) in news" :key="index">
          <router-link :to="`/news/${post.id}`" class="news__head fill">
            <img :src="require(`@/assets/img/${post.imgSm}`)" class="full-width" alt />
          </router-link>
          <router-link :to="`/news/${post.id}`" class="news__card-title news__title">{{post.title}}</router-link>
          <p class="news__txt">{{post.date}}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newsList: null,
      news: null,
      newsPost: null
    };
  },
  created() {
    this.getNews();
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    getNews() {
      this.$axios.get("/db/news.json").then(response => {
        this.newsPost = response.data.filter(
          e => e.id == this.$route.params.id
        )[0];
        this.newsList = response.data;
        this.news = response.data
          .filter(e => e.id != this.$route.params.id)
          .slice(0, 10);
      });
    },
    onScroll() {
      const root = document.documentElement || document.body;
      if (
        root.scrollTop + window.innerHeight == root.offsetHeight &&
        this.news.length + 1 < this.newsList.length
      )
        this.news.push(
          ...this.newsList.slice(this.news.length, this.news.length + 3)
        );
    }
  },
  watch: {
    $route: "getNews"
  }
};
</script>

<style lang="scss">
// .news {
//   &__post {
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     margin-bottom: 70px;
//     &-part {
//       width: calc(50% - 30px);
//     }
//   }
//   &__desc {
//     line-height: 1.96;
//   }
// }
//
</style>