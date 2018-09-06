<template>
    <div class="navbar">
        <router-link :to="{name: 'boards', path: '/'}">Home</router-link>
        <button @click="logout">Sign Out</button>
    </div>
</template>

<script>
export default {
    name: "navbar",
    methods: {
    logout(){
        
    this.$store.dispatch("logout")
    },
    },
}
</script>

<style scoped>
.navbar{
    height: 10vh;
    background-color: #afcfdf;
    width: 100%;
}
</style>


