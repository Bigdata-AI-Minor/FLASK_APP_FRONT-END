<template>
  <div>
    <nav class="custom-navbar">
      <a class="navbar-brand" href="#"> Jouw foto's </a>
    </nav>
    <div class="container">
      <div class="container">
        <img alt="photolibrary" class="logo" src="@/assets/images/photolibrary.jpg" width="200" height="200"/>
       <h3>Nog geen foto's</h3>
       <h5>Je hebt nog geen foto's toegevoegd. klik op de camera om een foto te maken</h5>
      </div>
    </div>
    <footer>
      <div class="footer-navigation">
    <a href="/camera" class="footer-link">
      <img src="@/assets/images/photolibrary/camera.jpg" alt="Image 1" class="footer-image">
    </a>
    <a href="#" class="footer-link">
      <img src="@/assets/images/photolibrary/fotos.jpg" alt="Image 2" class="footer-image">
    </a>
    <a href="#" class="footer-link">
      <img src="@/assets/images/photolibrary/profiel.jpg" alt="Image 3" class="footer-image">
    </a>
  </div>
    </footer>
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    WelcomeItem,
    HelloWorld,
  },
};
</script>

<style scoped>

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
h5{
  font-size: 12px;
  text-align: center;
}
.custom-navbar {
  background-color: blue;
  width: 100%;
  padding: 10px;
  color: white;
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

.btnLogin {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  color: white;
  background-color: black;
  width: 100%;
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
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>








