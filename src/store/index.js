import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let localFavoriteItems = null
try {
  localFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems'))
} catch (e) {
}

export default new Vuex.Store({
  state: {
    favoriteItems: localFavoriteItems || []
  },
  mutations: {
    addOrDeleteFavorite (state, { videoInfo, id, isAdded }) {
      // eslint-disable-next-line semi-spacing
      for (let i = 0;i < state.favoriteItems.length;i++) {
        const item = state.favoriteItems[i]
        if (item.id === videoInfo.id) {
          state.favoriteItems.splice(i, 1)
          localStorage.setItem('favoriteItems', JSON.stringify(state.favoriteItems))
          return
        }
      }

      state.favoriteItems.push({
        videoInfo: JSON.parse(JSON.stringify(videoInfo)),
        id,
        isAdded
      })
      localStorage.setItem('favoriteItems', JSON.stringify(state.favoriteItems))
    }
  },
  actions: {
  },
  modules: {
  }
})
