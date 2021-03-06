<template>
  <div>
    <Map :polylinePath="polylinePath" :center="center" :stationList="lineStationList" :isShowLine="true" :isShowCurrent="false"></Map>
    <div class="name-price">
      <span class="line-name">{{ line.name }}</span>
      <span class="line-price">票价:{{ line.price }}元</span>
    </div>
    <div class="line-desc">
      <div v-for="(classify, index) in line.classifyList" :key="'classify' + index">
        <span class="classify-section">® {{ classify.section }}</span>
        <span class="classify-station-num">共{{ classify.stationNum }}站</span>
      </div>
      <div>运行时间:</div>
      <div class="run-time-desc">{{ line.runTimeDesc }}</div>
      <div>班次信息:</div>
      <div class="frequency-desc">{{ line.frequencyDesc }}</div>
    </div>
    <div class="line-station">
      <div class="station-section">
        <span class="section-desc">{{ currentSectionName }}</span>
        <mt-button v-if="multiLineStation.length > 1" type="primary" class="change-section" @click="changeSection()">换向</mt-button>
      </div>
      <div v-for="(station, index) in lineStationList" :key="'station' + index" class="list-content">
        <span class="station-name">🚍 {{ station.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
export default {
  name: 'SearchLineDetail',
  components: {
    Map
  },
  data () {
    return {
      polylinePath: [],
      line: {},
      center: { lat: 0, lng: 0 },
      multiLineStation: [],
      multiLineSectionName: [],
      lineStationList: [],
      currentSectionIndex: 0,
      currentSectionName: ''
    }
  },
  methods: {
    async getSearchLineDetail () {
      const { data } = await this.$request.get('/search/line/detail', { params: { lineName: this.lineName } })
      if (data.retCode === 200) {
        const res = data.retObj
        this.line.name = res.name
        this.line.price = res.price
        this.line.runTimeDesc = res.runTimeDesc
        this.line.frequencyDesc = res.frequencyDesc
        const classifyList = []
        const resClassifyList = res.classifyDTOList
        for (let i = 0; i < resClassifyList.length; i++) {
          const item = resClassifyList[i]
          const lineClassify = {}
          lineClassify.stationNum = item.stationNum
          lineClassify.section = item.section
          classifyList.push(lineClassify)
          const resStationList = resClassifyList[i].stationList
          const lineStationS = []
          for (let j = 0; j < resStationList.length; j++) {
            const station = resStationList[j]
            const lineStation = {}
            const latLng = {}
            latLng.lat = station.lat
            latLng.lng = station.lng
            lineStation.latLng = latLng
            lineStation.name = station.name
            lineStationS.push(lineStation)
            if (i === 0) {
              this.polylinePath.push(latLng)
              this.currentSectionIndex = i
              if (j === Math.floor(resStationList.length / 2)) {
                this.center = latLng
              }
            }
          }
          this.multiLineSectionName.push(item.section)
          this.multiLineStation.push(lineStationS)
        }
        this.lineStationList = this.multiLineStation[0]
        this.currentSectionName = this.multiLineSectionName[0]
        this.line.classifyList = classifyList
      }
    },
    changeSection () {
      if (this.currentSectionIndex === 0) {
        this.lineStationList = this.multiLineStation[1]
        this.currentSectionIndex = 1
        this.currentSectionName = this.multiLineSectionName[1]
      } else {
        this.lineStationList = this.multiLineStation[0]
        this.currentSectionIndex = 0
        this.currentSectionName = this.multiLineSectionName[0]
      }
      this.polylinePath = []
      for (let i = 0; i < this.lineStationList.length; i++) {
        const latLng = this.lineStationList[i].latLng
        this.polylinePath.push(latLng)
        if (i === Math.floor(this.lineStationList.length / 2)) {
          this.center = latLng
        }
      }
    }
  },
  mounted () {
    this.getSearchLineDetail()
  },
  created () {
    this.lineName = this.$route.query.lineName
  }
}
</script>

<style scoped>
.name-price {
  margin: 5px;
  padding: 5px;
}
.line-name {
  font-weight: 800;
  font-size: 20px;
}
.line-price {
  font-weight: 800;
  font-size: 15px;
  margin-left: 40px;
}
.line-desc {
  border: 1px solid #cceff5;
  background: #fafcfd;
  margin: 6px;
  padding: 8px;
}
.classify-section {
  font-weight: 800;
  font-size: 13px;
}
.classify-station-num {
  font-weight: 600;
  font-size: 13px;
  margin-left: 30px;
}
.station-section {
  margin: 10px;
}
.section-desc {
  font-weight: 800;
  font-size: 15px;
}
.change-section {
  width: 50px;
  height: 25px;
  float: right;
  font-size: 10px;
}
.list-content {
  border: 1px solid #cceff5;
  background: #fafcfd;
  margin: 6px;
  padding: 8px;
}
</style>
