<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多<i class="arrow-right"></i></div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span class="user-name">{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p class="content">{{commentInfo.content}}</p>
      <span class="time">{{showDate}}</span>
      <span class="detail-style">{{commentInfo.style}}</span>
    </div>
    <div v-if="commentInfo.hasOwnProperty('images')" class="info-img">
      <img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showDate() {
      const date = new Date(this.commentInfo.created * 1000)
      let str = date.toLocaleString('zh', { year: 'numeric',  month: '2-digit',  day: '2-digit'})
      return str.split('/').join('-')
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 6px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.header-title {
  font-size: 15px;
}

.header-more {
  font-size: 13px;
}

.info-user {
  padding: 10px 0 5px;
  display: flex;
  align-items: center;
}

.info-user img {
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
}

.user-name {
  font-size: 14px;
  margin-left: 10px;
}

.content {
  margin-top: 5px;
  font-size: 13px;
  color: #777;
  line-height: 25px;
}

.time {
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}

.detail-style {
  font-size: 12px;
  margin-top: 10px;
  color: #999;
  margin-left: 20px;
}

.info-img {
  margin-top: 10px;
}

.info-img img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>