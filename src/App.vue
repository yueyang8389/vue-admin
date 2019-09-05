<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="less">
*{list-style: none;}
html,
body {
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Arial", "PingFang SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #808080;
}
</style>
