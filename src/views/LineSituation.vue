<template>
  <div>
    <Map :zoom="19" :center="center" :centerContent="stationName"></Map>
    <div class="station-name">{{ stationName }} 途经线路</div>
    <div v-for="(situation, index) in lineSituationList" :key="'situation' + index" class="list-content">
      <div class="line-name-price">
        <span class="line-name">{{ situation.name }}</span>
        <span class="line-price">票价:{{ situation.price }}元</span>
      </div>
      <div v-for="(classify, index) in situation.classifyDTOList" :key="'classify' + index" class="line-classify" @click="linkToLineDetail(classify, situation.name)">
        <span class="classify-section">®{{ classify.section }}</span>
        <span class="classify-station-num">共{{ classify.stationNum }}站</span>
      </div>
      <div class="line-desc">
        <div>运行时间:</div>
        <div class="run-time-desc">{{ situation.runTimeDesc }}</div>
        <div>班次信息:</div>
        <div class="frequency-desc">{{ situation.frequencyDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
export default {
  name: 'LineSituation',
  components: {
    Map
  },
  data () {
    return {
      center: { lng: 0, lat: 0 },
      stationName: '',
      lineSituationList: []
    }
  },
  methods: {
    async getLineSituation () {
      const { data } = await this.$request.get('/line/get/by/station', { params: { stationName: this.stationName } })
      if (data.retCode === 200) {
        this.lineSituationList = data.retObj
      }
    },
    linkToLineDetail (classify, lineName) {
      this.$router.push({ name: 'LineDetail', query: { classifyId: classify.id, section: classify.section, stationName: this.stationName, lineName } })
    }
  },
  mounted () {
    this.getLineSituation()
  },
  created () {
    this.stationName = this.$route.query.stationName
    const latLng = this.$route.query.latLng
    this.center.lat = latLng.lat
    this.center.lng = latLng.lng
  }
}
</script>

<style scoped>
.station-name {
  font-weight: 800;
  font-size: 20px;
  margin: 6px;
  padding: 10px;
}
.list-content {
  margin: 6px;
  padding: 10px;
  border: 2px solid #cceff5;
  background: #fafcfd;
}
.line-name {
  font-weight: 800;
  font-size: 20px;
}
.line-price {
  font-weight: 600;
  font-size: 13px;
  margin-left: 30px;
}
.line-desc {
  font-size: 15px;
}
.line-classify {
  margin: 5px 0px 5px 0px;
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
</style>
