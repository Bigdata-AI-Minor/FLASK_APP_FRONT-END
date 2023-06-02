<template>
  <div class="container">
    <nav class="custom-navbar">
      <a class="navbar-brand" href="#"> Profiel </a>
    </nav>
    <main class="form-signin">
      <div class="login-form">
        <figure class="logo-figure">
          <a href="home"><img3 class="mb-4 logo-login" /></a>
        </figure>
        <div class="space">
          <div class="box">
            <img src="@/assets/images/profilelogo.jpg"  alt="editprofile" class="profilelogo" />
            <label><label class="user">{{ username }}</label></label>
          </div>
          <div class="box">
            <img src="@/assets/images/passwordlogo.jpg" alt="edit password" class="profilelogo" />
             <label ><label class="user">{{ passwordLength  }}</label></label>
              <img src="@/assets/images/editlogo.jpg"  @click="showModal = true" alt="Exit modal" class="editlogo" />
          </div>
          <div class="box">
             <label ><label class="user">Upload History</label></label>
              <img src="@/assets/images/editlogo.jpg"  @click="showModal = true" alt="Exit modal" class="editlogo" />
          </div>
        </div>
      </div>
    </main>
    <img
      alt="photolibrary"
      class="logo"
      src="@/assets/images/profile/profile.jpg"
      width="200"
      height="200"
    />
    <button @click="logout()" class="btnLogin">Logout</button>
    <footer>
      <div class="row">
        <div class="col">
          <a href="/camera" class="footer-link">
            <img
              src="@/assets/images/photolibrary/camera.jpg"
              alt="Image 1"
              class="footer-image"
            />
          </a>
        </div>
        <div class="col">
          <a href="/library" class="footer-link">
            <img
              src="@/assets/images/photolibrary/fotos.jpg"
              alt="Image 2"
              class="footer-image"
            />
          </a>
        </div>
        <div class="col">
          <a href="/profile" class="footer-link">
            <img
              src="@/assets/images/photolibrary/profiel.jpg"
              alt="Image 3"
              class="footer-image"
            />
          </a>
        </div>
      </div>
    </footer>
    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
import axios from "../axios-auth";
import SavedModal from '../components/PasswordModal.vue'
export default {
  name: "Profile",
  data() {
    return {
      currentUser: Object,
      showModal: false,
      username: localStorage.getItem("username")
    };
  },
  methods: {
    getUser() {
      axios.get(`/users/${localStorage.getItem('id')}`, {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
        this.currentUser = res.data;
        })
        .catch((error) => console.log(error));
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error;
          console.log(error);
        });
    },
  },
  computed: {
    passwordLength(){ return localStorage.getItem("passwordLength");}
  },
  mounted() {
    this.getUser();
  },

  components: {
    WelcomeItem,
    HelloWorld,
    SavedModal
  },
  
  
};
</script>

<style scoped>
.profilelogo{
  margin-right: 10px;
}

.editlogo{
  margin-left: auto;
}
.form-signin{
  width: 100%;
}
.box {
  display: flex;
  align-items: center;
  border-bottom: 1px solid black; /* Add a border-bottom to the label */
  padding-bottom: 5px;
  padding: 10px;
}
.space {
  margin-top: 100px;
  justify-content: space-between;
}


.btnLogin {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  color: white;
  background-color: blue;
  width: 100%;
  color: white;
  margin-top: 20px;
}

.col {
  text-align: center;
}
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: blue;
  color: white;
  text-align: center;
  z-index: 1;
  padding: 10px;
}
.footer-navigation {
  display: flex;
  justify-content: center;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /* Adjust the height based on your needs */
  background-color: #f5f5f5; /* Adjust the background color based on your needs */
  padding: 10px;
}
h5 {
  font-size: 12px;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bold-text {
  font-size: 30px;
  color: black;
}
@media (max-width: 768px) {
  .bold-text {
    font-size: 24px;
  }
}
.bold {
  font-weight: bold;
}

.button-container {
  margin-top: 2rem;
}

button {
  color: red;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  max-width: 100%;
  max-height: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
    max-width: 100%;
    max-height: 100%;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>








