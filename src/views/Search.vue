<template>
  <div>
    <mt-search class="search" v-model="value" placeholder="输入站名/线路名进行搜索" @keyup.enter.native="getSearch()"></mt-search>
    <div v-if="!isSearch">
      <div class="title">
        <span>历史搜索记录</span>
        <mt-button type="primary" class="clean-history" @click="cleanSearchHistory()">清空</mt-button>
      </div>
      <div class="list-content" v-if="historyKeywordList.length > 0">
        <div class="history-keyword" v-for="(keyword, index) in historyKeywordList" :key="'keyword' + index" @click="checkKeyword(keyword)">
          <span>{{ keyword }}</span>
        </div>
      </div>
    </div>
    <div v-if="isSearch">
      <div class="title">相关站点</div>
      <div v-for="(station, index) in searchStation" :key="'station' + index" class="list-content" @click="linkToSituation(station)">
        <span class="station-name">{{ station.name }}</span>
      </div>
      <div v-if="searchStation.length === 0" class="list-content"><span>未获取到相关站点信息</span></div>
      <div class="title">相关线路</div>
      <div v-for="(lineName, index) in searchLine" :key="'line' + index" class="list-content" @click="linkToSearchLineDetail(lineName)">
        <span class="line-name">{{ lineName }}</span>
      </div>
      <div v-if="searchLine.length === 0" class="list-content"><span>未获取到相关线路信息</span></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Search',
  data () {
    return {
      isSearch: false,
      value: '',
      searchStation: [],
      searchLine: [],
      historyKeywordList: []
    }
  },
  watch: {
    value () {
      if (this.value.trim() === '') {
        this.isSearch = false
      }
    }
  },
  methods: {
    async getSearch () {
      if (this.value.trim() !== '') {
        const { data } = await this.$request.get('/station/line/search', { params: { keyword: this.value } })
        if (data.retCode === 200) {
          this.isSearch = true
          const searchRes = data.retObj
          this.searchLine = searchRes.lineList
          this.searchStation = searchRes.stationList
        }
      }
    },
    async getHistoryKeyword () {
      const { data } = await this.$request.get('/search/history/get', { params: {} })
      if (data.retCode === 200) {
        this.historyKeywordList = data.retObj
      }
    },
    async cleanSearchHistory () {
      const { data } = await this.$request.post('/search/history/clean', { params: {} })
      if (data.retCode === 200) {
        Toast('清除成功')
        this.historyKeywordList = []
      }
    },
    checkKeyword (keyword) {
      this.value = keyword
      this.getSearch()
    },
    linkToSituation (station) {
      const stationName = station.name
      const latLng = {}
      latLng.lat = station.lat
      latLng.lng = station.lng
      this.$router.push({ name: 'LineSituation', query: { stationName, latLng } })
    },
    linkToSearchLineDetail (lineName) {
      console.log(123)
      this.$router.push({ name: 'SearchLineDetail', query: { lineName } })
    }
  },
  mounted () {
    console.log()

    this.getHistoryKeyword()
  }
}
</script>

<style scoped>
.search {
  height: 50px;
}
.title {
  margin: 5px;
  padding: 5px;
  font-weight: 800;
  font-size: 15px;
}
.list-content {
  border: 1px solid #cceff5;
  background: #fafcfd;
  margin: 6px;
  padding: 8px;
}
.history-keyword {
  display: inline-block;
  border: 1px solid #aaaa7f;
  margin: 5px 15px 0px 0px;
  padding: 3px;
}
.clean-history {
  width: 50px;
  height: 25px;
  float: right;
  font-size: 10px;
}
</style>
