<template>
  <div class="chinaMap">
    <div ref="MapMountNode" style="width:800px;height:700px;"></div>
  </div>
</template>
<script>
import axios from '../../axios'
export default {
  data() {
    return {
      areaData: []
    };
  },
  methods: {
    resize() {
      this.MapMountNode.resize();
    },
    getData(newData){
      this.$nextTick(() => {
      var data = newData;

      var yData = [];

      data.sort(function(o1, o2) {
        if (isNaN(o1.value) || o1.value == null) return -1;
        if (isNaN(o2.value) || o2.value == null) return 1;
        return o1.value - o2.value;
      });

      for (var i = 0; i < data.length; i++) {
        yData.push(data[i].name);
      }
      let option = {
        title: {
          text: "全国疫情情况",
          textStyle: {
            fontSize: 20
          },
          x: "center"
        },
        tooltip: {
          show: true,
          formatter: function(params) {
            // return params.name + "：确诊 " +  + params.data["value"] + ' 人';
            return '确诊人数\r\n' + params.name + ': ' + params.data["value"] + ' 人';
          }
        },
        visualMap: {
          type: "piecewise",
          text: ["", ""],
          showLabel: true,
          seriesIndex: [0],
          inRange: {
            color: ["#faebd2", "#e39383", "#d36865", "#eb3223", "#6a211d"]
          },
          pieces: [{
              min: 10000
          },{
              min: 1000,
              max: 9999
          },{
              min: 500,
              max: 999
          },{
              min: 100,
              max: 499
          },{
              min: 10,
              max: 99
          },{
              min: 1,
              max: 9
          }],
          textStyle: {
            color: "#000"
          },
          bottom: 30,
          left: "left"
        },
        grid: {
          right: 10,
          top: 80,
          bottom: 30,
          width: "20%"
        },
        xAxis: {
          type: "value",
          scale: true,
          position: "top",
          splitNumber: 1,
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: "#aaa"
            }
          }
        },
        yAxis: {
          type: "category",
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#999"
            }
          },
          data: yData
        },
        geo: {
          roam: true,
          map: "china",
          left: "left",
          right: "300",
          layoutSize: "80%",
          label: {
            normal: {
                show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              areaColor: "#fff464"
            }
          },
          regions: [
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }
          ]
        },
        series: [
          {
            name: "mapSer",
            type: "map",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            itemStyle: {
                normal: {
                color: 'rgba(255,255,0,1)',
                shadowBlur: 10,
                shadowColor: '#333'
            }
            },
            zlevel: 1,
            data: data
          },
          {
            name: "barSer",
            type: "bar",
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                color: "#c5473d"
              },
              emphasis: {
                color: "#c5473d"
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [0, 0]
              },
              emphasis: {
                show: false,
                position: "right",
                offset: [10, 0]
              }
            },
            data: data
          }
        ],
        scaleLimit: {
            min: 1,
            max: 1
        }
      };
      this.MapMountNode = this.$echarts.init(this.$refs.MapMountNode);
      this.MapMountNode.setOption(option);
    //   on(window, 'resize', this.resize)
    });
  }
  },
  created() {
    //
  },
  mounted() {
    axios.get("/nCoV/api/area").then(
      res => {
        var data = res.data.results;
        data = data.filter( it => {
            return it.country == '中国' && it.provinceShortName !== '待明确地区'
        })
        data = data.map( it => {
            return {name: it.provinceShortName, value: it.confirmedCount}
        })
        this.getData(data);
      },
      err => {
        console.log("数据请求失败");
      }
    );
  },
  beforeDestroy() {
    // off(window, "resize", this.resize);
  },
  
};
</script>
