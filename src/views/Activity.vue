<template>
    <div id="activities">
        <div id="ActOno">
            <div class="view">
                <div :class="{banner:true,trans:flag}"  @mouseenter="enter" @mouseleave="leave">
                    <img :src="(imagesUrl[imgindex]['img'])" alt="" class="img">
                </div>
                <ul >  
                    <li v-for='(item,index) in 3'
                    :key="index"
                    @click='select(index)' :class='{con:index==imgindex}'></li>
                <!-- 点击小圆点切换对应图片展示 -->
                </ul>
                 <img src="@/assets/arrows/arrowleft.png"  @click="prev" class="prev"/>
                <img src="@/assets/arrows/arrowright.png"  @click="next" class="next"/>
            </div>
        </div>
        <div id="ActTwo">
            <div class="el-header">
                <p>即将到来的活动</p>
            </div>
            <hr/>
            <div class="el-main" ref="activitybox">
                <div class="itembox" v-for="(item,index) in activities" :key="index" @click="gotoDetail(item.id)">
                    <div class="headImg">
                        <img :src="item.img" :alt="item.name">
                    </div>
                    <div class="main">
                        <div class="time">{{item.time}}</div>
                        <div class="name">{{item.name}}</div>
                        <div class="mentor">主讲：</div>
                    </div>
                    <div class="foot">
                        <div class="character" v-for="(item2,index2) in item.speakers"
                        :key="index2">
                            <img :src="item2.img" :alt="item2.name">
                        <p>{{item2.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="load">
                <el-button
                round :loading="loadstate"
                @click="loadMore"
                >加载更多</el-button>
            </div>
            <div class="el-header">
                <p>已经结束的活动</p>
            </div>
            <hr/>
            <div class="el-main" ref="activitybox">
                <div class="itembox" v-for="(item,index) in activities" :key="index" @click="gotoDetail(item.id)">
                    <div class="headImg">
                        <img :src="item.img" :alt="item.name">
                    </div>
                    <div class="main">
                        <div class="time">{{item.time}}</div>
                        <div class="name">{{item.name}}</div>
                        <div class="mentor">主讲：</div>
                    </div>
                    <div class="foot">
                        <div class="character" v-for="(item2,index2) in item.speakers"
                        :key="index2" @click="gotoSpeaker(item2.index2)">
                            <img :src="item2.img" :alt="item2.name">
                        <p>{{item2.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="load">
                <el-button
                round :loading="loadstate"
                @click="loadMore"
                >加载更多</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgindex:'0',//控制变量，默认显示第一张
            flag:true,
            timer:null,
            activities: [
                {
                    name: `颜色与时尚`,
                    img: require(`@/assets/activity_3.png`),
                    time: `2021年2月1日，星期一-2021年12月5日，星期日`,
                    speakers: [
                        {
                            name: `中本聪`,
                            img: require(`@/assets/persons/talk1.png`)
                        },
                        {
                            name: `V姐`,
                            img: require(`@/assets/persons/talk2.jpg`)
                        },
                    ]
                },
                {
                    name: `小型企业成长与管理`,
                    img: require(`@/assets/activity_2.png`),
                    time: `2021年3月21日，星期日-2021年3月22日，星期一`,
                    speakers: [
                        {
                            name: `中本聪`,
                            img: require(`@/assets/persons/talk1.png`)
                        },
                        {
                            name: `V姐`,
                            img: require(`@/assets/persons/talk2.jpg`)
                        },
                    ]
                },
                {
                    name: `按键与频率`,
                    img: require(`@/assets/activity_1.png`),
                    time: `2021年3月23日，星期二，2：00 PM-4:30 PM`,
                    speakers: [
                        {
                            name: `中本聪`,
                            img: require(`@/assets/persons/talk1.png`)
                        },
                        {
                            name: `V姐`,
                            img: require(`@/assets/persons/talk2.jpg`)
                        },
                    ]
                }
            ],
            loadstate: false
        }
    },
    computed: {
        imagesUrl() {
            return this.activities.slice(0,3)
        }
    },
    created(){
        this.timer=setInterval(this.next.bind(this),2000)
    },
    mounted() {
        this.$http
            .get('/activity/list?current=1&size=10')
            .then(result => {
                let activities = result.records
                let result2 = []
                activities.forEach( item => {
                    let obj = {}
                    obj.id = item.activityId
                    obj.name = item.title
                    obj.img = item.cover
                    obj.time = `${item.startTime}---${item.startTime}`
                    obj.speakers = item.activitySpeakers.map(item => {
                        let spk = {
                            speakerUserId : item.speakerUserId,
                            name : item.realName,
                            img : item.avatar
                        }
                        return spk
                    })
                    result2.push(obj)
                })
                this.activities = result2
            }
            )
    },
    methods: {
        loadMore(){
            this.loadstate = true
            let loads = this.activities.slice(0,3)
            this.activities = this.activities.concat(loads)
            this.loadstate = false
        },
        //下一张
        next(){
            if(this.imgindex==this.imagesUrl.length-1){
                this.imgindex=0;
            }else{
                this.imgindex++;
            }
        },
        //上一张
        prev(){
            if(this.imgindex<0){
                this.imgindex=this.imagesUrl.length-1
            }else{
                this.imgindex--
            }
        },
        select(index){
            this.imgindex=index
        },
        enter:function(){
            clearInterval(this.timer);
        },
        leave:function(){
            this.timer=setInterval(this.next.bind(this),3000)
        },
        gotoDetail(id){
            this.$router.push(`/activitydetail?activityId=${id}`)
        },
        gotoSpeaker(){
            this.$router.push(`/dashbord`)
        }
    }
}
</script>
<style lang="scss" scoped>
#ActOno{
    width: 100%;
    height: 800px;
    display: flex;
    justify-content: center;
    background-color:#090723;
    .img{
        width: 1240px;
        height:600px
    }
    .banner{
        display: flex;
        justify-content: center; 
    }
    .trans{
        transition:all .5s
    }
    .view{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    ul{
        width: 300px;
        height: 50px;
        position: absolute;
        bottom: 100px;
        left: 90px;
    }
    ul li{
        width: 20px;
        height: 20px;
        float: left;
        margin-left: 30px;
        list-style: none;
        border-radius: 50%;
        background: #ffffff;
    }
    .con{
        background: red;
    }
    .prev{
        position: absolute;
        width: 100px;
        height: 130px;
        top: 40%;
        left: 0;   
    }
    .prev:hover {
        top: 35%;
        width: 150px;
        height: 180px;
    }
    .next{
        position: absolute;
        width: 100px;
        height: 130px;
        top: 40%;
        right: 0; 
    }
    .next:hover {
        top: 35%;
        width: 150px;
        height: 180px;
    }
}
#ActTwo{
    width: 100%;
    height: auto;
    background-color:rgb(247, 243, 243);
    .el-header {
        font-size: 36px;
        padding: 10px 30px;
        color: #1f6fff;
    }
    hr {	
		width: 95%;
		margin: 0 auto;
		border: 0;
		height: 1px;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
    .el-main {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
        background-color:rgb(247, 243, 243);
        .itembox {
            background: #fff;
            height: 430px;
            margin-top: 30px;
            border-radius: 40px 40px 40px 40px ;
            border: 1px solid rgb(247, 243, 243);
        }
        .headImg {
            width: 400px;
            height: 200px;
            img {
                border-radius: 40px 40px 0 0 ;
                width: 400px;
                height: 200px;
            }
        }
        .main {
            width: 400px;
            height: 150px;
            color: #000;
            .time {
                padding: 15px 20px;
                font-size: 14px;
            }
            .name {
                padding: 0px 20px;
                margin-top: -5px;
                margin-bottom: 10px;
                line-height: 1.25;
                font-size: 24px;
                font-weight: 600;
            }
            .mentor {
                margin: 20px 0 10px 20px;
                font-size: 16px;
                color: #aeaeae;
            }
        }
        .foot {
            margin-top: -15px;
            width: 400px;
            height: 80px;
            display: flex;
            justify-content: flex-start;
            .character{
               font-size: 14px;
               margin-left: 20px;
                img {
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }
}
.load{
    background-color:rgb(247, 243, 243);
    .el-button{
        margin-left: 50%;
        transform:translateX(-50%);
    }
}
</style>