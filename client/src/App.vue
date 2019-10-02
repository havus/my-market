<template>
  <v-app id="body" app>
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.commit('SET_TOKEN', token);
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/login') {
        document.getElementById('body').classList.add('login');
      } else {
        document.getElementById('body').classList.remove('login');
      }
    },
  }
};
</script>

<style>
  * {
    font-family: 'Livvic', sans-serif;
  }

  #body.login {
    background-image: linear-gradient(to top left,
      rgba(110, 110, 110, 0.9),
      rgba(209, 209, 209, 0.8)),
      url(./assets/bg-berlin.jpg);
    background-size: cover;
  }
</style>
