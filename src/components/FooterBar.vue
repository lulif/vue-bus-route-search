<template>
  <div id="tab-bar">
    <mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">
      <mt-tab-item id="route">
        <img :src="img1" slot="icon" />
        路线
      </mt-tab-item>
      <mt-tab-item id="search">
        <img :src="img2" slot="icon" />
        搜索
      </mt-tab-item>
      <mt-tab-item id="nearby">
        <img :src="img3" slot="icon" />
        附近
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'route',
      img1: require('../static/img/route_selected.png'),
      img2: require('../static/img/search.png'),
      img3: require('../static/img/nearby.png')
    }
  },
  computed: {
    isShow: function () {
      return true
    }
  },
  watch: {
    selected: {
      handler () {
        if (this.selected === 'route') {
          this.$router.push('/')
          this.img1 = require('../static/img/route_selected.png')
        } else {
          this.img1 = require('../static/img/route.png')
        }
        if (this.selected === 'search') {
          this.$router.push('/search')
          this.img2 = require('../static/img/search_selected.png')
        } else {
          this.img2 = require('../static/img/search.png')
        }
        if (this.selected === 'nearby') {
          this.$router.push('/nearby')
          this.img3 = require('../static/img/nearby_selected.png')
        } else {
          this.img3 = require('../static/img/nearby.png')
        }
      }
    }
  }
}
</script>

<style></style>
