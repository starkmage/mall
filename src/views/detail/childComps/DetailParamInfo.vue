<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table,index) in paramInfo.sizes" :key="index" class="info-size">
      <tr v-for="(tr,index) in table" :key="index">
        <td v-for="(td,index) in tr" :key="index" :class="{'first-col': index === 0}">{{td}}</td>
      </tr>
    </table>
    <table class="info-style">
      <tr v-for="(item,index) in paramInfo.infos" :key="index">
        <td class="param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
    <div class="info-image" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.param-info table tr {
  height: 42px;
  border-bottom: 1px solid rgba(1,1,1,0.1);
}

.first-col {
  width: 25%;
}

.info-style {
  border-top: 2px solid rgba(100,100,100,0.1);
}

.param-key {
  width: 25%;
}

.param-value {
  color: #eb4868;
}

.info-image img {
  width: 100%;
}
</style>