<template>
  <div class="rock_footer">
    copyright@{{ $t("app.name") }}
  </div>
</template>

<script>
export default {
  name: 'RockFooter'
};
</script>

<style scoped>
.rock_footer{
  font-size: 14px;
  text-align: center;
  color: lightslategray;
  line-height: 30px;
  clear: both;
  cursor: default;
}
</style>


