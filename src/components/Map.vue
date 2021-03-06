<template>
  <div>
    <baidu-map :center="center" :zoom="zoom" @ready="handlerMap">
      <bm-geolocation
        v-if="isShowGeo"
        anchor="BMAP_ANCHOR_TOP_LEFT"
        :showAddressBar="true"
        :autoLocation="true"
        @locationSuccess="locationSuccess"
        @locationError="locationError"
      ></bm-geolocation>
      <bm-view class="map"></bm-view>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-panorama anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-panorama>
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" type="BMAP_NAVIGATION_CONTROL_LARGE"></bm-navigation>
      <bm-marker v-if="isShowCurrent" :position="center" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label :content="centerContent" :labelStyle="labelStyle" :offset="labelOffset" />
      </bm-marker>
      <div class="multiMarker" v-if="isShowMultiMarker">
        <bm-marker v-for="(station, index) in stationList" :key="'latLng' + index" animation="BMAP_ANIMATION_DROP" :position="station.latLng">
          <bm-label :content="station.name" :labelStyle="labelStyle" :offset="labelOffset" />
        </bm-marker>
      </div>
      <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="1" :stroke-weight="2"></bm-polyline>
    </baidu-map>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Map',
  props: {
    zoom: {
      type: Number,
      default: 15
    },
    center: {
      type: Object,
      default: function () {
        return { lng: 120.497252, lat: 30.26169 }
      }
    },
    centerContent: {
      type: String,
      default: function () {
        return '当前位置'
      }
    },
    isShowGeo: {
      type: Boolean,
      default: false
    },

    isShowCurrent: {
      type: Boolean,
      default: true
    },
    labelStyle: {
      type: Object,
      default: function () {
        return { color: 'red', fontSize: '6px' }
      }
    },
    labelOffset: {
      type: Object,
      default: function () {
        return { width: -8, height: 14 }
      }
    },
    isShowMultiMarker: {
      type: Boolean,
      default: true
    },
    stationList: {
      type: Array,
      default: function () {
        return []
      }
    },
    isShowLine: {
      type: Boolean,
      default: false
    },
    polylinePath: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    handlerMap ({ BMap, map }) {},
    locationSuccess ({ point, AddressComponent, marker }) {
      const latLng = { lat: point.lat, lng: point.lng }
      this.$emit('changeGeo', latLng)
    },
    locationError ({ StatusCode }) {
      Toast('定位失败')
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
