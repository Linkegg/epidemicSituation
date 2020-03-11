<template>
  <div class="block">
    <!-- 左侧疫情信息 -->
    <ul class="text">
        <li class="item"><i class="iconfont icon-bingdu"></i> 病毒: 新型冠状病毒 2019-nCoV</li>
        <li class="item"><i class="iconfont icon-chuanranke"></i> 传染源: 新型冠状病毒感染的肺炎患者</li>
        <li class="item"><i class="iconfont icon-yiyuan"></i> 确诊人数: {{overallData.confirmedCount}}</li>
        <li class="item"><i class="iconfont icon-yiyuan"></i> 疑似人数: {{overallData.suspectedCount}}</li>
        <li class="item"><i class="iconfont icon-yiyuan"></i> 治愈人数: {{overallData.curedCount}}</li>
        <li class="item"><i class="iconfont icon-yiyuan"></i> 死亡人数: {{overallData.deadCount}}</li>
        <li class="item"><i class="iconfont icon-shijian"></i> 更新时间: {{getTime(overallData.updateTime)}}</li>
    </ul>
    <!-- 左侧时间线 -->
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in newsData"
        :key="index"
        :timestamp="getTime(activity.pubDate)+ ' '+ activity.infoSource"
      ><el-link type="primary" :underline='false' :href="activity.sourceUrl" _black>{{activity.title}}</el-link></el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import axios from '../../axios';
export default {
  data() {
    return {
      // 时间线的排序方向
      reverse: false,
    //   信息数据
      overallData: {},
      //  新闻数据
      newsData: []
    };
  },
  methods:{
    //  最后更新时间
      getTime(time){
          var t = new Date(time);
          var mon  = t.getMonth() + 1;
          var hour = t.getHours();
          var min = t.getMinutes();
          var day = t.getDate();
          var sec = t.getSeconds();
          var newTime = this.eTime(mon) + '-' + this.eTime(day) + '  ' + this.eTime(hour) + ':' + this.eTime(min) + ":" + this.eTime(sec);
          return newTime;
      },
    //  帮助小于10的时间位前添上0
      eTime(t){
          if(t < 10){
              return '0' + t
          }
          return t;
      }
  },
   created(){
    // var self = this;
    // 发送请求获取疫情概况数据
    axios.get("/nCoV/api/overall?latest=1").then(res => {
        this.overallData = res.data.results[0];
    })

    // 获得新闻数据
    axios.get('/nCoV/api/news').then(
      res => {
        var data = res.data.results;
        if(data.length > 7){
          this.newsData = data.slice(0, 7);
        }else{
          this.newsData = data;
        }
      }
    )
  }
};
</script>

<style>
.block {
    padding: 0 15px;
}
.text {
    list-style: none;
    font-size: 14px;
    text-align: left;
}

.item {
    margin: 5px 0;
    font-size: 14px;
}

.box-card {
  width: 480px;
}

.el-timeline {
  text-align: left;
  margin-top: 30px;
}
</style>