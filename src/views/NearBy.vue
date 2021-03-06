<template>
  <div>
    <Map :stationList="stationList" :isShowGeo="true" @changeGeo="getNearbyData"></Map>
    <div v-for="(station, index) in stationList" :key="'content' + index" class="list-content" @click="linkToSituation(station.name, station.latLng)">
      <div class="content-station">
        <span class="station-name">{{ station.name }}</span>
        <span class="station-distance">距离:{{ station.distance }}公里</span>
      </div>
      <div v-for="(lineName, index) in station.lineNameList" :key="'line' + index" class="content-line">{{ lineName }}</div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
export default {
  name: 'NearBy',
  components: {
    Map
  },
  data () {
    return {
      stationList: []
    }
  },
  methods: {
    async getNearbyData (latLng) {
      this.stationList = []
      if (!latLng) {
        latLng = { currentLat: '30.26169', currentLng: '120.497252' }
      } else {
        latLng = { currentLat: latLng.lat, currentLng: latLng.lng }
      }
      const { data } = await this.$request.get('/nearby/station/line/get', { params: latLng })
      if (data.retCode === 200) {
        const stationList = data.retObj
        stationList.map(item => {
          const station = {}
          const latLng = {}
          latLng.lat = item.lat
          latLng.lng = item.lng
          station.latLng = latLng
          station.name = item.name
          station.distance = item.distance
          station.lineNameList = item.lineNameList
          this.stationList.push(station)
        })
      }
    },
    linkToSituation (stationName, latLng) {
      this.$router.push({ name: 'LineSituation', query: { stationName, latLng } })
    }
  },
  mounted () {
    this.getNearbyData()
  }
}
</script>

<style scoped>
.list-content {
  margin: 6px;
  border: 2px solid #cceff5;
  background: #fafcfd;
  padding: 10px;
}
.station-name {
  font-weight: 800;
  font-size: 20px;
}
.station-distance {
  font-weight: 600;
  font-size: 13px;
  margin-left: 30px;
}
.content-line {
  display: inline-block;
  border: 1px solid #aaaa7f;
  margin: 5px 5px 0px 0px;
  padding: 3px;
}
</style>
