<template>
    <div class="navbar">
   <router-link :to="{name: 'boards', path: '/'}">Home</router-link>
    </div>
</template>

<script>
export default {
    name: "navbar",

}
</script>

<style scoped>
.navbar{
    
    
    height: 10vh;
    background-color: aqua;
    width: 100vw;
    

}
</style>


