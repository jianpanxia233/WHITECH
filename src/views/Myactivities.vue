<template>
    <div id="myActs">
            <div class="el-header">
                <p>我参加的活动</p>
            </div>
            <hr/>
            <div class="el-main" ref="activitybox">
                <div class="itembox"
                 v-for="(item,index) in activities"
                 :key="index"
                 @click="gotoDetail(item.index)">
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
            <div class="el-header" style="background-color:#090723">
                <p>我举办的活动</p>
            </div>
            <!-- <hr/> -->
            <div class="el-main" ref="activitybox"> 
                <div class="itembox" 
                v-for="(item,index) in activities" 
                :key="index"
                @click="gotoDetail(item.index)">
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
        </div>
</template>
<script>
export default {
    data() {
        return {
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
                },
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
    methods: {
        loadMore(){
            this.loadstate = true
            let loads = this.activities.slice(0,3)
            this.activities = this.activities.concat(loads)
            this.loadstate = false
        },
        gotoDetail(id){
            this.$router.push(`/activitydetail?activityId=${id}`)
        }
    }
}
</script>
<style lang="scss" scoped>
#myActs{
    width: 100%;
    height: auto;
    // background-color:rgb(247, 243, 243);
    background-image: linear-gradient(#090723,#202564);
    .el-header {
        font-size: 36px;
        padding: 10px 30px;
        color: $color-primary;
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
        background-image: linear-gradient(#090723,#202564);
        // background-color:rgb(247, 243, 243);
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
    background-color: #202564;
    .el-button{
        margin-left: 50%;
        margin-bottom: 20px;
        transform:translateX(-50%);
    }
}
</style>