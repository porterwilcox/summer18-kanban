<template>
    <div class="navbar">
   <router-link :to="{name: 'boards', path: '/'}">Home</router-link>
   <div>
       <h3 v-if="!this.description">WELCOME TO TRILLO!!!</h3>
       <h3 v-else>{{this.description}}</h3>
   </div>
   <button class="btn-secondary" @click="logout">Sign Out</button>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  opacity: .9;
  background-color: rgba(0, 0, 0, 0.253);
}
a {
  font-size: 3rem;
  color: #3b3b3b;
}
a:hover {
  text-decoration: none;
  color: #3b3b3b; 
}
</style>


