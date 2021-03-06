<template>
  <div id="app">
    <div class="content-div">
      <mt-header title="公交查询系统" class="header">
        <router-link to="/" slot="left"><mt-button icon="back" @click="this.$router.back(-1)">返回</mt-button></router-link>
        <mt-button slot="right" @click="popupShow()"><img :src="img" class="avatar" slot="icon" /></mt-button>
      </mt-header>
      <router-view />
      <footer-bar class="footer"></footer-bar>
    </div>
    <mt-popup class="popup" v-model="popupVisible" position="right">
      <div class="popup-up"></div>
      <div class="popup-down"></div>
    </mt-popup>
  </div>
</template>
<script>
import Footer from '@/components/FooterBar'
export default {
  name: 'app',
  components: {
    'footer-bar': Footer
  },
  data () {
    return {
      img: require('./static/img/me.png'),
      popupVisible: false
    }
  },
  methods: {
    popupShow () {
      this.popupVisible = true
    }
  }
}
</script>

<style scoped>
.content-div {
  width: 100%;
}
.popup {
  height: 100%;
  width: 60%;
}
.popup-up {
  height: 30%;
  background-color: #42b983;
}
.popup-down {
  height: 70%;
  background-color: blue;
}
.footer {
  height: 50px;
}
.avatar {
  width: 25px;
  height: 25px;
}
</style>
