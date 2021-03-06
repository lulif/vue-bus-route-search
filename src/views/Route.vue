<template>
  <div>
    <div class="container">
      <mt-field class="container-field" label="起点:" placeholder="请输入出发地" v-model="origin" @input="changeInput(1)" @blur.native.capture="blurInput(1)"></mt-field>
      <div class="auto-complete" v-show="isShowOriginSupport === true">
        <mt-cell v-for="(item, index) in originSupport" :key="'origin' + index" :title="item" @click.native="selectItem(1, item)"></mt-cell>
      </div>

      <mt-field class="container-field" label="终点:" placeholder="请输入目的地" v-model="terminal" @input="changeInput(2)" @blur.native.capture="blurInput(2)"></mt-field>
      <div class="auto-complete" v-show="isShowTerminalSupport">
        <mt-cell v-for="(item, index) in terminalSupport" :key="'terminal' + index" :title="item" @click.native="selectItem(2, item)"></mt-cell>
      </div>

      <div class="container-btn"><mt-button class="btn-search" type="primary">搜索</mt-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Route',

  data () {
    return {
      origin: '',
      originSupport: [],
      isShowOriginSupport: false,
      terminal: '',
      terminalSupport: [],
      isShowTerminalSupport: false
    }
  },
  methods: {
    async changeInput (type) {
      let val = ''
      if (type === 1) {
        val = this.origin
        this.originSupport = []
      }
      if (type === 2) {
        val = this.terminal
        this.terminalSupport = []
      }
      if (val.trim() !== '') {
        const { data } = await this.$request.get('/route/station/auto/complete', { params: { stationName: val } })
        if (data.retCode === 200) {
          const nameList = data.retObj
          if (nameList.length === 0) {
            nameList.push('未搜索到相关站点')
          }
          if (type === 1 && this.origin.trim() !== '') {
            this.originSupport = nameList
            this.isShowOriginSupport = true
          }
          if (type === 2 && this.terminal.trim() !== '') {
            this.terminalSupport = nameList
            this.isShowTerminalSupport = true
          }
        }
      }
    },
    selectItem (type, item) {
      if (type === 1) {
        this.origin = item
        this.isShowOriginSupport = false
      }
      if (type === 2) {
        this.terminal = item
        this.isShowTerminalSupport = false
      }
    },
    blurInput (type) {
      if (type === 1) {
        setTimeout(() => {
          console.log(123)
          this.isShowOriginSupport = false
        }, 500)
      }
      if (type === 2) {
        this.isShowTerminalSupport = false
      }
    }
  },
  watch: {
    origin () {
      if (this.origin.trim() === '') {
        this.isShowOriginSupport = false
      }
    },
    terminal () {
      if (this.terminal.trim() === '') {
        this.isShowTerminalSupport = false
      }
    }
  },
  mounted () {}
}
</script>

<style scoped>
.container {
  margin: 5px;
  padding: 6px;
}
.container-field {
  margin: 10px;
}
.container-btn {
  margin-top: 10px;
  text-align: center;
}
.auto-complete {
  width: 70%;
  float: right;
  border: 2px solid #cceff5;
  height: 150px;
  overflow: scroll;
}
.btn-search {
  width: 60%;
}
</style>
