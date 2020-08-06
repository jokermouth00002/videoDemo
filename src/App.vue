<template lang='pug'>
  div#app
    div.header
      router-link(to='/').title youtubeDemo
      div.iconBox
        router-link.heartIcon(to='/favorite')
        .favorite-count {{ $store.state.favoriteItems.length }}
    <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 1rem;
  .header {
    padding-right: 5rem;
    padding-left: 5rem;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 40px;
    }
    .iconBox {
      display: flex;
      a {
        color: black;
      }
      div {
        cursor: pointer;
      }
      .homeIcon a {
        color: black;
      }
      .heartIcon {
        position: relative;
        width: 50px;
        height: 45px;
      }
      .heartIcon:before,
      .heartIcon:after {
        position: absolute;
        content: '';
        left: 20px;
        top: 0;
        width: 20px;
        height: 40px;
        background: red;
        -moz-border-radius: 50px 50px 0 0;
        border-radius: 50px 50px 0 0;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-transform-origin: 0 100%;
        -moz-transform-origin: 0 100%;
        -ms-transform-origin: 0 100%;
        -o-transform-origin: 0 100%;
        transform-origin: 0 100%;
      }
      .heartIcon:after {
        left: 0;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-transform-origin: 100% 100%;
        -moz-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
        -o-transform-origin: 100% 100%;
        transform-origin: 100% 100%;
      }
      .homeIcon {
        font-size: 45px;
      }
    }
  }
  @media (max-width: 767px) {
    .header {
      padding-right: 0;
      padding-left: 0;
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
