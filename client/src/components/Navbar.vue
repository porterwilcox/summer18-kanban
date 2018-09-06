<template>
    <div class="navbar">
   <router-link :to="{name: 'boards', path: '/'}">Home</router-link>
   <div>
       <h3 v-if="!this.description">WELCOME TO TRILLO!!!</h3>
       <h3 v-else>{{this.description}}</h3>
   </div>
   <button @click="logout">Sign Out</button>
    </div>
</template>

<script>
export default {
  name: "navbar",
  props: ['description'],
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 10vh;
  background-color: #afcfdf;
  width: 100%;
}
</style>


