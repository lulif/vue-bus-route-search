<template>
  <div>
    <Map :polylinePath="polylinePath" :center="center" :stationList="lineStationList" :isShowLine="true" :isShowCurrent="false"></Map>
    <div class="name-section">
      <div class="line-name">{{ lineName }}</div>
      <div class="line-section">{{ section }} 途经站点</div>
    </div>
    <div v-for="(station, index) in lineStationList" :key="'station' + index" class="list-content">
      <span class="station-name">🚍 {{ station.name }}</span>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
export default {
  name: 'LineDetail',
  components: {
    Map
  },
  data () {
    return {
      classifyId: '',
      polylinePath: [],
      section: '',
      stationName: '',
      lineName: '',
      center: { lat: 0, lng: 0 },
      lineStationList: []
    }
  },
  methods: {
    async getLineDetail () {
      const { data } = await this.$request.get('/station/get/by/line', { params: { classifyId: this.classifyId } })
      if (data.retCode === 200) {
        const lineStationList = data.retObj
        for (let i = 0; i < lineStationList.length; i++) {
          const station = lineStationList[i]
          const lineStation = {}
          const latLng = {}
          latLng.lat = station.lat
          latLng.lng = station.lng
          this.polylinePath.push(latLng)
          lineStation.latLng = latLng
          lineStation.name = station.name
          if (i === 0) {
            lineStation.name = '起点:' + station.name
          }
          if (i === lineStationList.length - 1) {
            lineStation.name = '终点:' + station.name
          }
          this.lineStationList.push(lineStation)
          if (station.name === this.stationName) {
            this.center = latLng
          }
        }
      }
    }
  },
  mounted () {
    this.getLineDetail()
  },
  created () {
    this.classifyId = this.$route.query.classifyId
    this.lineName = this.$route.query.lineName
    this.section = this.$route.query.section
    this.stationName = this.$route.query.stationName
  }
}
</script>

<style scoped>
.name-section {
  margin: 6px;
  padding: 10px;
}
.line-name {
  font-weight: 800;
  font-size: 20px;
}
.line-section {
  font-weight: 800;
  font-size: 15px;
  margin-top: 4px;
}
.list-content {
  border: 1px solid #cceff5;
  background: #fafcfd;
  margin: 6px;
  padding: 8px;
}
.station-name {
  font-size: 15px;
}
</style>
