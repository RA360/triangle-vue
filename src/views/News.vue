<template>
  <section class="news">
    <div class="container">
      <ul class="news__list">
        <p v-if="!news" class="loading">Loading...</p>
        <li class="news__card" v-for="(post,index) in news" :key="index">
          <router-link :to="`/news/${post.id}`" class="news__head fill">
            <img :src="require(`@/assets/img/${post.imgSm}`)" class="full-width" alt />
          </router-link>
          <router-link class="news__card-title news__title" :to="`/news/${post.id}`">{{post.title}}</router-link>
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
      news: null
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
        this.newsList = response.data;
        this.news = response.data.slice(0, 10);
      });
    },
    onScroll() {
      const root = document.documentElement || document.body;
      if (
        root.scrollTop + window.innerHeight == root.offsetHeight &&
        this.news.length + 1 < this.newsList.length
      )
        this.news.push(
          this.newsList.slice(this.news.length, this.news.length + 3)[0]
        );
    }
  }
};
</script>
