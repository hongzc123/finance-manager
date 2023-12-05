<template>
  <div id="echarts-map" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
// 加载插件
import "echarts-gl";
import { geoCoordMap, geoJson } from "@/conf/map";

function rodamData() {
  let name = "随机点" + Math.random().toFixed(5) * 100000;
  // let longitude = Math.random() * 62 + 73
  let longitude = 105.18;
  let longitude2 = Math.random() * 360 - 180;
  // let latitude = Math.random() * 50 + 3.52
  let latitude = 37.51;
  let latitude2 = Math.random() * 180 - 90;
  return {
    coords: [
      [longitude2, latitude2],
      [longitude, latitude]
    ],
    value: (Math.random() * 3000).toFixed(2)
  };
}

function convertData(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  // console.log(res)
  return res;
}

export default {
  // name: "telecom-areas-map",
  data() {
    return {};
  },
  mounted() {
    let el = document.querySelector("#echarts-map");
    this.myChart = echarts.init(el);
    this.getBaseTexture();
    this.drawEarth();
  },
  methods: {
    getBaseTexture() {
      echarts.registerMap("world", geoJson);
      let canvas = document.createElement("canvas");
      this.baseTexture = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      });
      this.baseTexture.setOption({
        backgroundColor: "#001213",
        series: [
          {
            type: "map",
            map: "world",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90],
              [180, -90]
            ],
            label: {
              show: false,
              textStyle: {
                color: "#fff",
                fontSize: 20
              }
            },
            itemStyle: {
              areaColor: "#004444",
              borderColor: "#00cccc",
              borderWidth: 2
            }
          }
        ]
      });
    },
    drawEarth() {
      let option = {
        tooltip: {
          show: true
        },
        globe: {
          silent: true,
          shading: "color",
          environment: "#000",
          baseTexture: this.baseTexture
        },
        series: [
          //柱状图
          {
            //name: 'bar3D',
            type: "bar3D",
            coordinateSystem: "globe",
            barSize: 0.5, //柱子粗细
            shading: "lambert",
            opacity: 1,
            bevelSize: 0.2,
            itemStyle: {
              color: "#EBE806"
            },
            label: {
              show: false,
              formatter: "{b}"
            },
            data: convertData(
              Object.keys(geoCoordMap).map(cityStr => {
                return {
                  name: cityStr,
                  value: (Math.random() * 300).toFixed(2)
                };
              })
            )
          },
          {
            name: "lines3D",
            type: "lines3D",
            coordinateSystem: "globe",
            effect: {
              show: true,
              period: 2,
              trailWidth: 3,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#0087f4"
            },
            blendMode: "lighter",
            lineStyle: {
              // width: 2
              width: 1,
              color: "#0087f4",
              opacity: 0
            },
            data: [],
            silent: false
          }
        ]
      };
      console.log(option);
      for (let i = 0; i < 50; i++) {
        option.series[1].data = option.series[1].data.concat(rodamData());
      }

      this.myChart.clear();
      this.myChart.setOption(option, true);
    }
  }
};
</script>

<style>
</style>