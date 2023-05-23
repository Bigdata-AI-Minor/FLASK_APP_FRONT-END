<template>
  <section>
    <div class="container">
    <HelloWorld msg="Stadsjutters" />
      <main class="form-signin">
        <div class="login-form">
          <figure class="logo-figure">
            <a href="home"
              ><img3
                class="mb-4 logo-login"
            /></a>
          </figure>

          <div class="form-floating">
            <label for="Username">Username</label>
            <input
              type="Username"
              class="form-control"
              id="Username"
              v-model="this.Username"
            />
          </div>
          <div class="form-floating">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="Password"
              v-model="this.Password"
            />
           
          </div>

          <div class="error-box mb-3">
            <label class="error_msg"> </label>
          </div>
          <button
            type="button"
            @click="login()"
            class="btnLogin"
          >
            login
          </button>
          <label class="register"
            ><a href="register">Register</a></label
          >
        </div>
      </main>
    </div>
  </section>
  
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  name: "login",
   components: {
    HelloWorld
  },
  data() {
    return {
      Username: "",
      Password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          Username: this.Username,
          Password: this.Password
        })
        .then(() => {
          this.$router.push("/library");
        })
        .catch((error) => {
          this.errorMessage = error;
          console.log(error);
        });
    },
  },
  
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
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
    font: 0.9rem 'Fira Sans', sans-serif;
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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
