<template>
	<div class="slider">
		<el-row>
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="2" class="ctrl">
				<img src="../../static/image/info/crtl_l.png" height="64" width="64" @click="ctrlleft">
			</el-col>
			<el-col :span="16" class="factor-box">
			<div class="factor-wrap" id="imgs">
				<div class="factor">
					<img src="../../static/image/info/01.png">
					<span class="factor-desc">监测因子1</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/02.png">
					<span class="factor-desc">监测因子2</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/03.png">
					<span class="factor-desc">监测因子3</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/04.png">
					<span class="factor-desc">监测因子4</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/05.png">
					<span class="factor-desc">监测因子5</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/06.png">
					<span class="factor-desc">监测因子6</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/07.png">
					<span class="factor-desc">监测因子7</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/08.png">
					<span class="factor-desc">监测因子8</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/09.png">
					<span class="factor-desc">监测因子9</span>
				</div>
				<div class="factor">
					<img src="../../static/image/info/10.png">
					<span class="factor-desc">监测因子10</span>
				</div>
				</div>
			</el-col>
			<el-col :span="2" class="ctrl">
				<img src="../../static/image/info/ctrl_r.png" height="64" width="64" @click="ctrlright">
			</el-col>
			<el-col :span="2">&nbsp;</el-col>
		</el-row>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        the_index: 0
      }
    },
    methods: {
      ctrlleft: function () {
        if (this.the_index === 0) {
          return
        }
        let imgs = document.getElementById('imgs')
        // console.log(imgs.style)
        this.the_index += 1
        imgs.style.marginLeft = 120 * this.the_index + 'px'
      },
      ctrlright: function () {
        let imgs = document.getElementById('imgs')
        let imgLength = imgs.getElementsByTagName('div').length
        // console.log(this.the_index, imgLength)
        // console.log(imgs.style.marginLeft)
        if (this.the_index === -(imgLength - 7)) {
          return
        }
        this.the_index -= 1
        imgs.style.marginLeft = 120 * this.the_index + 'px'
        // imgs.style.marginLeft = -100 + 'px'
      }
    }
  }
</script>

<style scoped>
.slider {
  margin-top: -20px;
  height: 100px;
  /*background-color: red;	*/
}
.ctrl {
  margin-top: 18px;	
  /*top: 15px;*/
}
.ctrl img {
  cursor: pointer;
  opacity: .5;
}
.ctrl img:hover {
  opacity: 1;
}
.factor-box {
  /*width: 100%;*/
  /*max-width: 800px;*/
  height: 100px;
  text-align: center;
  overflow: hidden;
  /*margin-left: -100px;*/
  /*margin-right: auto;	*/
  /*background-color: yellow; */
  /*float: left;*/
  /*position: relative;*/
  /*left: 50%;	*/
}
.factor-wrap {
  /*margin-left: 0;	*/
}
.factor {
  margin-top: 12px;
  width: 100px;
  display: inline-block;
}
.factor img{
  height: 50px;
  width: 50px;
  padding: 3px;
  border-radius: 5px;
  box-shadow: 0px 0px 1px #aaa;	
}
.factor img:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #aaa;
}
.factor-desc {
  display: inline-block;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
/*.info-slider {
  margin-top: -20px;
  height: 110px;
  padding: 0 64px;
  text-align: center;
}
.info-slider .img_box{
  position: relative;
  width: 800px;
  padding-top:15px;
  overflow: hidden;
  text-align: center;
  margin:0 auto;
}
.info-nav-slider {
  height: 100px;
  width: 10000px;
  text-align: center;
  transition: margin .3s;
}
.slider {
  width: 100px;
  float: left;
}
.slider img{
  height:50px;
  width: 50px;
  padding: 3px;
  border-radius: 5px;
  box-shadow: 0px 0px 1px #aaa;	
}
.slider img:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #aaa;
}
.slider-desc {
  display: inline-block;
}
.ctrl_box img {
  position: absolute;
  top:12px;
  cursor: pointer;
  opacity: .5;
}
.ctrl_l{
  left: 0;
}
.ctrl_r{
  right:0px;
}*/
</style>