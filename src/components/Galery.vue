<template>
  <v-container>
    <v-row>
      <v-col
        v-for="post in posts"
        :key="post.id"
        class="d-flex child-flex"
        :cols="cols"
      >
        <v-card>
          <v-card-title
            ><router-link
              class="accent--text headline title-link"
              :to="'?author=' + post.author_name"
              >{{ post.author_name }}</router-link
            ></v-card-title
          >
          <v-img :src="post.image" aspect-ratio="1" class="grey lighten-1">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="primary--text body-1">
            <span v-for="tag in post.tag_names" :key="tag"
              ><router-link class="tag-link" :to="'?tag=' + tag">
                {{ tag }}</router-link
              >
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Galery",

  data: () => ({
    posts: Object,
    path: "posts",
    cols: 4,
  }),

  mounted() {
    this.getCols();
    this.getContext();
  },
  watch: {
    $route() {
      this.getContext();
    },
  },
  methods: {
    getCols() {
      this.cols = 4;
      if (window.innerWidth < 1000) {
        this.cols = 6;
      }
      if (window.innerWidth < 600) {
        this.cols = 12;
      }
    },
    getContext() {
      console.log(this.$route);
      if (this.$route.query.author != null) {
        this.axios
          .get(this.hostname + "users/" + this.$route.query.author)
          .then((response) => {
            console.log(response.data);
            this.posts = response.data;
            console.log(this.posts);
          });
      } else {
        this.axios
          .get(this.hostname + this.path + this.$route.fullPath.slice(1))
          .then((response) => {
            console.log(
              this.hostname + this.path + this.$route.fullPath.slice(1)
            );
            console.log(response.data);
            this.posts = response.data;
            console.log(this.posts);
          });
      }
    },
  },
};
</script>
<style>
.title-link {
  text-decoration: none;
}
.tag-link {
  text-decoration: none;
}
.tag-link:hover {
  color: #ec407a;
}
</style>