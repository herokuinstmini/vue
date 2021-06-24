<template>
  <div>
    <v-card class="mt-5">
      <v-container v-if="mytoken != null"
        ><v-card-title class="headline justify-center"
          >My account info</v-card-title
        >
      </v-container>

      <v-form v-if="mytoken != null"
        ><v-row justify="center"
          ><v-col cols="10">
            <v-text-field
              readonly
              v-model="username"
              label="Username"
              placeholder="username"
              :rules="[rules.required]"
            >
              HELLOMELLO
            </v-text-field></v-col
          >
          <v-col cols="10">
            <v-text-field
              v-model="email"
              label="E-mail"
              placeholder="mymail@mail.com"
              :rules="[rules.required]"
            >
              HELLOMELLO
            </v-text-field></v-col
          >
        </v-row>
        <v-row justify="center">
          <v-btn
            large
            outlined
            class="my-5 mr-5 accent--text"
            @click="saveAccount"
            >Save changes!</v-btn
          ><v-btn large outlined class="my-5 accent--text" @click="logout"
            >Log out!</v-btn
          ></v-row
        >
      </v-form></v-card
    >
    <!--  -->
    <v-card class="mt-10" v-if="mytoken != null">
      <v-container
        ><v-card-title class="headline justify-center mb-5"
          >Add new photo!</v-card-title
        >
      </v-container>
      <v-form
        ><v-row justify="center"
          ><v-col cols="10">
            <v-autocomplete
              v-model="tags"
              :items="all_tags"
              item-value="id"
              item-text="name"
              outlined
              dense
              chips
              small-chips
              label="Tags"
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="tag"
              label="Add new tag"
              placeholder="kitten"
              :append-outer-icon="'mdi-plus'"
              @click:append-outer="saveTag"
            >
            </v-text-field>
          </v-col>

          <v-col cols="10">
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn large outlined class="my-5 accent--text" @click="savePost"
            >Post!</v-btn
          ></v-row
        >
      </v-form></v-card
    >
    <!-- lalala -->

    <v-card>
      <v-container v-if="mytoken == null"
        ><v-card-title class="headline justify-center"
          >Hello, dear guest!</v-card-title
        >
        <v-row justify="center">
          <v-col cols="10">
            <v-card-text
              >Now you are not authenticated, to post ur fav picks you need to
              choose an action:</v-card-text
            ></v-col
          ></v-row
        >
        <v-row justify="space-around"
          ><v-col cols="6">
            <v-img
              src="https://instmini.herokuapp.com/image/1"
              min-height="200"
              max-height="400"
              aspect-ratio="1"
            ></v-img
          ></v-col> </v-row
        ><v-row justify="center">
          <v-btn
            large
            outlined
            to="/account/register"
            class="accent--text my-5 mr-5"
            >Register!</v-btn
          >
          <v-btn large outlined to="/account/login" class="my-5 accent--text"
            >Login!</v-btn
          ></v-row
        >
      </v-container>
    </v-card>
    <!--  -->
    <v-container class="mt-10"
      ><v-row>
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
      </v-row></v-container
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    posts: Object,
    path: "posts",
    cols: 4,
    mytoken: null,
    username: "",
    author: "",
    email: "",
    id: "",
    tag: "",
    all_tags: [],
    tags: [],
    image: "",
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  beforeMount() {
    this.mytoken = sessionStorage.getItem("auth_token");
    if (this.mytoken != null) {
      console.log("Token " + this.mytoken);
      this.axios
        .get(this.hostname + "auth/users/me/", {
          headers: {
            Authorization: "Token " + this.mytoken,
          },
        })
        .then((response) => {
          console.log(response);
          this.username = response.data.username;
          this.author = response.data.username;
          this.email = response.data.email;
          this.id = response.data.id;
          this.getContext();
        })
        .catch((error) => {
          console.log("token is not valid");
          console.log(error);
          sessionStorage.removeItem("auth_token");
        });
    }
  },
  mounted() {
    this.getTags();
    this.getCols();
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
      console.log("********");
      console.log(this.author);
      this.axios
        .get(this.hostname + "users/" + this.author)
        .then((response) => {
          console.log(response.data);
          this.posts = response.data;
          console.log(this.posts);
        });
    },
    handleFileUpload() {
      this.image = this.$refs.file.files[0];
    },
    getTags() {
      this.axios.get(this.hostname + "tags").then((response) => {
        response.data.forEach((element) => {
          this.all_tags[element.id] = element;
        });
        this.all_tags = response.data;
        console.log(this.all_tags);
      });
    },
    saveTag() {
      if (this.tag != null) {
        this.axios
          .post(this.hostname + "tags", {
            name: this.tag,
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              this.getTags();
              this.tag = null;
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            this.alerts = error.response.data;
          });
      }
    },
    savePost() {
      console.log(this.tags.slice);
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("author", this.id);
      this.tags.forEach((tag) => {
        formData.append("tags", tag);
      });
      // formData.append("tags", JSON.stringify(this.tags));
      this.axios
        .post(
          this.hostname + "posts/new",
          formData
          // {
          //   tags: this.tags,
          //   author: this.id,
          //   image: this.image,
          // }
          // {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            this.getContext();
            this.tags = [];
            alert("success!!!");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          this.alerts = error.response.data;
        });
      console.log("**************");
      console.log(formData);
    },
    logout() {
      console.log(this.mytoken);
      sessionStorage.removeItem("auth_token");
      this.mytoken = null;
      console.log(this.mytoken);
      window.location = "/account";
    },
    saveAccount() {
      console.log("save changes");
      this.axios
        .patch(
          this.hostname + "auth/users/me/",
          { email: this.email },
          {
            headers: {
              Authorization: "Token " + this.mytoken,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            alert("success!");
          }
        });
    },
  },
};
</script>