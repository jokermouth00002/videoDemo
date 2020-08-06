<template lang='pug'>
  div
    div.favoriteVedioContainer
      div.title Your favorite video list
      div.videoInfo(v-for='(item,i) in items',:key='i')
        div(@click='deleteVideo(item)').icon.far.fa-heart
        img(:src='item.videoInfo.snippet.thumbnails.medium.url')
        div.videoTitle {{item.videoInfo.snippet.title}}
        div.videoDuration {{item.videoInfo.contentDetails.duration | convertToTime}}
</template>
<script>
export default {
  data() {
    return {
      isAdded: true
    }
  },
  computed: {
    items() {
      return this.$store.state.favoriteItems
    }
  },
  created() {
    window.favorite = this
  },
  methods: {
    deleteVideo(videoInfo) {
      this.$store.commit('addOrDeleteFavorite', {
        videoInfo: videoInfo,
        id: videoInfo.id,
        isAdded: true
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.favoriteVedioContainer {
  padding-top: 100px;
  .title {
    font-size: 25px;
  }
  .videoInfo {
    position: relative;
    .icon {
      color: red;
      cursor: pointer;
      position: absolute;
      font-size: 30px;
    }
    .videoTitle {
      font-size: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .videoDuration {
      font-size: 20px;
    }
  }
}
</style>
