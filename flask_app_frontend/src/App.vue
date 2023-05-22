<template>
    <RouterView />
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
