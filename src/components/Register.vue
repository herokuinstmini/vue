<template>
  <v-card class="mt-5">
    <span v-for="alert in alerts" :key="alert.value"
      ><v-alert type="error">
        {{ alert }}
      </v-alert></span
    ><v-container>
      <v-card-title class="headline justify-center"
        >Register a new account!</v-card-title
      ></v-container
    >
    <v-form class="mb-footer"
      ><v-row justify="center"
        ><v-col cols="10">
          <v-text-field
            v-model="username"
            label="Username"
            placeholder="username"
            :rules="[rules.required]"
          >
          </v-text-field></v-col
        ><v-col cols="10">
          <v-text-field
            v-model="email"
            label="E-mail"
            placeholder="username@mail.com"
            :rules="[rules.required, rules.email]"
          >
          </v-text-field
        ></v-col>
        <v-col cols="10">
          <v-text-field
            v-model="password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show_password ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show_password = !show_password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn large outlined class="mb-5 accent--text" @click="tryRegister"
          >Register!</v-btn
        ></v-row
      >
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "Register",
  data: () => ({
    alerts: Object,
    show_password: false,
    username: "",
    password: "",
    email: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  mounted() {},
  methods: {
    tryRegister() {
      // console.log(this.username);
      // console.log(this.password);
      // console.log(this.email);
      this.axios
        .post(this.hostname + "auth/users/", {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            window.location = "/account/login";
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          this.alerts = error.response.data;
        });
    },
  },
};
</script>