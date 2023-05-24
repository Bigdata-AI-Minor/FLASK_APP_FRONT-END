<template>
  <div class="container">
    <nav class="custom-navbar">
      <a class="navbar-brand" href="#"> Jouw foto's </a>
    </nav>
      <div class="container">
        <img
          alt="photolibrary"
          class="logo"
          src="@/assets/images/photolibrary.jpg"
          width="200"
          height="200"
        />
        <h3>Nog geen foto's</h3>
        <h5>
          Je hebt nog geen foto's toegevoegd. klik op de camera om een foto te
          maken
        </h5>
    </div>
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
            <a href="#" class="footer-link">
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
  margin-top: 30px;
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
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>








