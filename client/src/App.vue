<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
button {
  cursor: pointer;
}
:root {
  --fresh: #4abdac;
  --vermillion: #fc4a1a;
  --sunshine: #f7b733;
  --clean: #dfdce3;
}
body {
  background-color: var(--fresh)
}
</style>
