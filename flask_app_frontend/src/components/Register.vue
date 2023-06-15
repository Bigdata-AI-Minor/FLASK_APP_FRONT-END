<template>
  <section>
    <div class="page-container">
      <div class="container">
        <HelloWorld msg="Register" />
        <main class="form-signin">
          <div class="login-form">
            <figure class="logo-figure">
              <a href="home"><img3 class="mb-4 logo-login" /></a>
            </figure>
            <label for="Username">Username</label>
            <div class="form-floating">
              <input
                type="Username"
                class="form-control"
                id="Username"
                v-model="this.Username"
              />
            </div>
            <label for="password">Password</label>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="Password"
                v-model="this.Password"
              />
            </div>
            <div class="error-box mb-3">
              <label :class="{ success: isSuccess, error: !isSuccess }">{{
                message
              }}</label>
            </div>
            <button type="button" @click="register()" class="btnLogin">
              Register
            </button>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
import axios from "../axios-auth";
export default {
  name: "Register",
  components: {
    HelloWorld,
  },
  data() {
    return {
      Username: "",
      Password: "",
      message: "",
      isSuccess: null,
    };
  },
  // create users in the database with a post request
  methods: {
    register() {
      axios
        .post(
          `/users/`,
          {
            Username: this.Username,
            Password: this.Password,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          this.currentUser = res.data;
          this.message = res.data.message;
          this.isSuccess = true;
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch((error) => {
          this.message = error.response.data.message;
          this.isSuccess = false;
        });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green; 
}
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bold-text {
  font-size: 30px;
  color: black;
}

.bold {
  font-weight: bold;
}

.button-container {
  margin-top: 2rem;
}

.btnLogin {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  color: white;
  background-color: blue;
  width: 100%;
  color: white;
}

.form-floating input.form-control {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
}

.form-control.input {
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  padding: 5px;
  font-size: 14px;
  color: #333;
}

label {
  display: block;
  margin-top: 1rem;
  font: 0.9rem "Fira Sans", sans-serif;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
