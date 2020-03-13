<template>
  <!-- params: {title: news.title.toLowerCase().replace(/\s+/g, '-')} -->
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
<style lang="scss">
// .news {
//   position: relative;
//   padding-top: 70px;
//   &__list {
//     display: flex;
//     flex-wrap: wrap;
//   }
//   &__title {
//     font: 42px/1.388 "PlayfairDisplay-Regular", sans-serif;
//     word-break: break-word;
//   }
//   &__card {
//     display: flex;
//     flex-direction: column;
//     width: calc(33.3333% - 66px);
//     margin: 0 33px 66px;
//     &-title {
//       flex-grow: 1;
//       margin-top: 39px;
//     }
//   }
//   &__head {
//     &::before,
//     &::after {
//       transition: all 0.2s linear;
//     }
//     &::after {
//       opacity: 0;
//       content: "Read More";
//       font-size: 22px;
//       letter-spacing: 0.032em;
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//     }
//     &:hover {
//       &::before {
//         opacity: 0.9;
//       }
//       &::after {
//         opacity: 1;
//       }
//     }
//   }
//   &__txt {
//     flex-grow: 0;
//     margin-top: 33px;
//   }
// }
//
</style>