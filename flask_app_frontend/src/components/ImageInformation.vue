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
      <!-- hier een table inzetten -->
      <div class="content">
        <table>
          <tr>
            <td>Naam</td>
            <td>xxxx</td>
          </tr>
          <tr>
            <td>Locatie</td>
            <td>xxxxxxxxx</td>
          </tr>
          <tr>
            <td>Locatie</td>
            <td>xxxxxxxx</td>
          </tr>
          <tr>
            <td>Tijd</td>
            <td>xxxxxxx</td>
          </tr>
          <tr>
            <td>Classificatie</td>
            <td>xxxxxxxx</td>
          </tr>
        </table>
      </div>
      <div class="camera">
        <a href="/library">
          <img src="@/assets/images/return.jpg" alt="cameraicon" />
        </a>
        <a href="/camera">
          <img src="@/assets/images/delete.jpg" alt="cameraicon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: null,
    };
  },
  methods: {
    navigateToCamera() {
      this.$router.push("/camera");
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
  },
  components: {
    WelcomeItem,
    HelloWorld,
  },
};
</script>

<style scoped>
.camera {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 110px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  padding-right: 50px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.image-container {
  position: relative;
  margin-bottom: 0;
  transition: margin-bottom 0.3s ease;
}

.image-container.expanded {
  margin-bottom: 2rem;
}

.logo {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 0;
  transition: top 0.3s ease, transform 0.3s ease;
}

.image-container.expanded .logo {
  top: 2rem;
  transform: translateY(-50%);
}
.dropdown {
  margin-bottom: 150px;
  position: relative;
}
.dropdown-toggle {
  background-color: #eee;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  border-radius: 10px;
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 200px;
  position: absolute;
  z-index: 1;
}

.dropdown-menu.open {
  display: block;
}

.dropdown-menu li {
  border-radius: 10px;
  padding: 5px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu li:hover {
  background-color: #ddd;
}
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
  /* display: flex; */
  margin-bottom: 10px;
  padding: 10px;
  background-color: #0179ff;
}

.button-container button {
  border-radius: 10px;
  flex: 1;
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
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
  text-align: center;
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
