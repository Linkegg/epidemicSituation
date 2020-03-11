<template>
  <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>
    <div class="container">
      <div class="title">
        <h3>疫情地图</h3>
      </div>
      <el-container>
        <el-aside width="300px">
          <left-content></left-content>
        </el-aside>
        <el-main>
          <my-map></my-map>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>

<script>
import MyHeader from "./header/index";
import MyMap from "./main/map";
import LeftContent from "./main/leftContent";
export default {
  components: {
    MyHeader,
    MyMap,
    LeftContent
  },
  data() {
    return {};
  }
};
</script>

<style>
.title {
  background: #fff;
  /* border-left: 3px solid #328dff; */
  padding: 12px 20px 12px 0;
}

.title h3 {
  border-left: 3px solid #328dff;
  font-size: 24px;
  padding-left: 20px;
  color: #2f3c4b;
}

.el-header {
  /* background-color: #B3C0D1; */
  border-bottom: 1px solid #e5e8eb;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.container {
  /* width: 80%;
    margin: 0 auto; */
  padding: 0 10%;
  background: #e5e8eb;
}

</style>