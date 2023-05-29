<template>
  <div class="page-container">
    <div class="container">
      <img
        alt="Welcome logo"
        class="logo"
        src="@/assets/images/welcome.jpg"
        width="200"
        height="200"
      />
      <h4 class="bold-text">
        Voorspelling: <span class="bold">XXX</span> klopt dit?
      </h4>
      <div class="content">
        <div class="button-container">
          <button class="btnCorrect" @click="navigateToCamera">Correct</button>
          <button class="btnIncorrect" @click="navigateToPredicionChange">
            Incorrect
          </button>
        </div>
        <a href="/camera">
          <img src="@/assets/images/cameraIcon.jpg" alt="cameraicon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  methods: {
    navigateToCamera() {
      this.$router.push("/camera");
    },
    navigateToPredicionChange() {
      this.$router.push("/predictionmodify");
    },
  },
  components: {
    WelcomeItem,
    HelloWorld,
  },
};
</script>

<style scoped>
.btnIncorrect {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 11px;
  color: white;
  background-color: rgba(255, 0, 0, 0.664);
  width: 100%;
  margin-left: 10px;
}
.btnCorrect {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 11px;
  color: white;
  background-color: rgb(43, 199, 43);
  width: 100%;
  margin-right: 10px;
}
.button-container {
  display: flex;
}

.button-container button {
  margin-bottom: 70px;
  flex: 1;
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

.content {
  margin-top: 2rem;
  text-align: center;
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
