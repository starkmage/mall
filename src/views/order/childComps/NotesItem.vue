<template>

  <div class="item">
    <div class="left"><slot name="left"></slot></div>
    <div class="right"><slot name="right"></slot><i class="arrow-right" v-show="dynamic"></i></div>
    
  </div>
  

</template>

<script>
export default {
  name: "NotesItem",
  props: {
    dynamic: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.item {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  justify-content: space-between;
}

.left {
  margin-left: 5px;
  font-size: 15px;
}

.right {
  font-size: 12px;
  color: #666;
  margin-right: 5px;
  display: flex;
}

i {
  margin-left: 15px;
  position: relative;
  top: 15px;
  right: 5px;
}
</style>