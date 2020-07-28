<template>
  <div class="list">
    <location-item v-for="(item,index) in $store.state.location" :key="index" :item="item"></location-item>
  </div>
</template>

<script>
import LocationItem from "./LocationItem";

export default {
  name: "LocationList",
  components: {
    LocationItem
  }
}
</script>

<style scoped>
</style>