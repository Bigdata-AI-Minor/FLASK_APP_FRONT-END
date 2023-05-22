<template>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
    <RouterView />
</html>
</template>

<script>
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

export default {
  methods: {
    navigateToLogin() {
      this.$router.push('/login');
    }
  },
  components: {
    RouterView,
    HelloWorld
  }
};
</script>
