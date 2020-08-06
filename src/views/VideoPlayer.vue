<template lang='pug'>
  div
    div.videoBox
      iframe#video(width='100%',height='100%',:src='"https://www.youtube.com/embed/"+videoInfo.id+"?rel=0&amp&autoplay=1&controls=1&showinfo=0"',
      frameborder=0,allow='autoplay; encrypted-media' allowfullscreen)
    div.videoTitle
      div {{videoInfo.snippet.title}}
    div.commentRow
      div(@click='addFavoriteList(videoInfo)',:class='{red:isAdded}').far.fa-heart
    div.videoDescription
      pre {{videoInfo.snippet.description}}
</template>

<script>
export default {
  data() {
    return {
      items: [],
      isAdded: false,
      videoInfo: this.$store.state.nowSeletedItem
    }
  },
  methods: {
    addFavoriteList(videoInfo) {
      this.$store.commit('addOrDeleteFavorite', {
        videoInfo: videoInfo,
        id: videoInfo.id,
        isAdded: true
      })
      this.isAdded = !this.isAdded
    },
    checkAdded(videoInfo) {
      const array = this.items.map(e => {
        return e.id
      })
      const added = array.indexOf(videoInfo.id)
      if (added >= 0) {
        this.isAdded = true
      }
    }
  },
  created() {
    window.player = this
    this.items = this.$store.state.favoriteItems
    this.checkAdded(this.videoInfo)
    if (!this.videoInfo) {
      this.videoInfo = this.$store.state.nowSeletedItem
    }
  }
}
</script>

<style scoped lang='scss'>
.videoBox {
  width: 100%;
  height: 50vh;
}
.videoTitle {
  padding-top: 30px;
}
.commentRow {
  .red {
    color: red;
  }
  div {
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    font-size: 25px;
  }
}
.videoDescription {
  font-size: 20px;
  pre {
    white-space: pre-line;
  }
}
@media (max-width: 767px) {
  pre {
    white-space: inherit;
    font-size: 5px;
  }
}
</style>
