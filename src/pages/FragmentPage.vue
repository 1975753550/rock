<template>
  <div class="fragment">
      <div class="cloud"></div>
      <div class="trash"></div>
      <div class="key"></div>
      <div class="lock"></div>
      <div class="search"></div>
  </div>
</template>

<script>
export default {
  name: 'FragmentPage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.fragment div {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.cloud {
  background-image: url(../assets/fragment/if_cloud.png);
}
.trash {
  background-image: url(../assets/fragment/if_trash.png);
}
.key {
  background-image: url(../assets/fragment/if_key.png);
}
.lock {
  background-image: url(../assets/fragment/if_lock.png);
}
.search {
  background-image: url(../assets/fragment/if_search.png);
}
</style>
