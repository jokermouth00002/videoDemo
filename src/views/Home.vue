<template lang='pug'>
  div.home
    div.row(v-if='!showVideoPlayer')
      div.container(v-for='(videoInfo,i) in showItems',:key='i')
        div.videoBox
          div.icon.far.fa-heart(@click='addFavoriteList(videoInfo)',:class='{red:checkAdded(videoInfo)}')
          img.videoPic(@click='playVideo(videoInfo)',:src='videoInfo.snippet.thumbnails.medium.url')
        div.videoTime {{videoInfo.contentDetails.duration | convertToTime}}
        div.videoTtitle(@click='playVideo(videoInfo)') {{videoInfo.snippet.title}}
    div.pagination(v-if='!showVideoPlayer')
        div(@click ='prevPage') prev
        div(v-for='(page,i) in totalPage',:key='i')
          div(@click='currentChange(i+1)') {{i+1}}
        div(@click ='nextPage') next
</template>

<script>
export default {
  data() {
    return {
      videosInfos: [],
      showItems: [],
      nextPageToken: 'pageToken=',
      currentPage: 1,
      pageSize: 12,
      totalPage: 1,
      showVideoPlayer: false,
      listItems: []
    }
  },
  created() {
    window.home = this
    this.$api
      .get('')
      .then(res => {
        this.videosInfos = res.data.items
        this.nextPageToken += res.data.nextPageToken
      })
      .then(() => {
        this.$api
          .get(
            'https://www.googleapis.com/youtube/v3/videos?&key=AIzaSyBYy1mf-uEUyT5Qb1iGbboMPBLO21UqVFY&part=snippet,contentDetails&chart=mostPopular&maxResults=50&' +
              this.nextPageToken
          )
          .then(res => {
            const addVideosInfos = this.videosInfos.concat(res.data.items)
            this.videosInfos = addVideosInfos
            this.videosInfosHandler.getShowItems()
            this.totalPage = Math.ceil(this.videosInfos.length / this.pageSize)
          })
        this.listItems = this.$store.state.favoriteItems || []
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    currentChange(currentPage) {
      this.currentPage = currentPage
      this.videosInfosHandler.getShowItems()
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
        this.videosInfosHandler.getShowItems()
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++
        this.videosInfosHandler.getShowItems()
      }
    },
    playVideo(videoInfo) {
      this.$router.push({
        name: 'Video'
      })
      this.$store.state.nowSeletedItem = JSON.parse(JSON.stringify(videoInfo))
    },
    addFavoriteList(videoInfo) {
      this.$store.commit('addOrDeleteFavorite', {
        videoInfo: videoInfo,
        id: videoInfo.id,
        isAdded: true
      })
    },
    checkAdded(videoInfo) {
      if (this.listItems.length > 0) {
        const array = this.listItems.map(e => {
          return e.id
        })
        const added = array.indexOf(videoInfo.id)
        if (added >= 0) {
          return true
        }
      } else {
        return false
      }
    }
  },
  computed: {
    videosInfosHandler() {
      return {
        getShowItems: () => {
          const items = this.videosInfos.slice(
            (this.currentPage - 1) * this.pageSize,
            (this.currentPage - 1) * this.pageSize + this.pageSize
          )
          this.showItems = items
          return this.showItems
        }
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.home {
  font-size: 30px;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .row {
    display: flex;
    flex-wrap: wrap;
    min-height: 80vh;
    justify-content: center;
    .container {
      min-width: 50%;
      max-width: 50%;
      .videoBox {
        position: relative;
        .icon {
          position: absolute;
          cursor: pointer;
        }
        .red {
          color: red;
        }
        img {
          cursor: pointer;
        }
      }
      .videoTtitle {
        font-size: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        cursor: pointer;
      }
      .videoTime {
        color: black;
        font-size: 10px;
        position: relative;
      }
    }
  }
  .pagination {
    padding-top: 30px;
    display: flex;
    justify-content: space-around;
    width: 50%;
    div {
      cursor: pointer;
    }
  }
  .backButton {
    cursor: pointer;
    margin-top: 30px;
    width: 100px;
    height: 40px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    &:hover {
      background-color: black;
      border-style: none;
      color: white;
    }
  }
  @media (max-width: 767px) {
    .row {
      .container {
        max-width: 100%;
      }
    }
  }
}
</style>
