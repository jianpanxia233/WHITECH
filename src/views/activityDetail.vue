<template>
    <div style="padding: 10px 20px; background-image: linear-gradient(#090723,#202564);">
        <div class="title">
            <div class="left-title">
                <div class="main-title">活动名称</div>
                <div class="hoster"><div class="img"><img
                :src="require(`@/assets/persons/talk1.png`)" alt="hello"
                /></div><div class="text">***举办</div></div>
            </div>
            <div class="right-title">
                2021年2月1日，星期一-2021年12月5日，星期日
            </div>
        </div>
        <div class="content-introduce">
            <div class="img">
                <img :src="require(`@/assets/activity_3.png`)" alt="pic">
            </div>
            <div class="introuce">
                RootCamp is happy to host the Demo Day for our first batch together with our founding partners, SpinLab and K+S. 
            </div>
        </div>
        <div class="speakersout">
            <div class="head">演讲者</div>
            <div class="container">
                <div v-for="(item,index) in speakers" :key="index" class="speakers">
                    <img :src="item.img" :alt="item.name"/>
                    {{item.name}}
                </div>
            </div>
        </div>  
        <div class="agenda">
            <div class="head">议程</div>
            <div v-for="(item,index) in agendas" :key="index">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            {{item.title}}
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="grid-content bg-purple-dark">
                            {{item.speakers}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            {{item.time}}
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content bg-purple-dark">
                            <el-button>加入</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            agendas: [
                {
                    title: '小明的环节',
                    speakers: '中本聪，小明',
                    time: '10:00-10:30'
                },
                {
                    title: '小刚的环节',
                    speakers: '中本聪，小明',
                    time: '11:00-11:30'
                }
            ],
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
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.bg-purple-dark {
background: #99a9bf;
}
.bg-purple {
background: #d3dce6;
}
.bg-purple-light {
background: #e5e9f2;
}

.agenda {
    margin: 30px 0px;
    background-color: rgb(247, 243, 243);
    border-radius: 5px;
    width: 100%;
    .head {
        display: flex;
        justify-content: center;
        font-size: 40px;
        font-weight: 900;
        line-height: 50px;
        margin: 30px 0px;
    }
    .el-row {
        margin-left: 7%;
    }

}
.title {
    display: flex;
    padding-bottom: 40px;
    .left-title {
        flex-grow: 1;
        .main-title {
            color: #fff;
            font-size: 50px;
            font-weight: 900;
            line-height: 60px;
        }
        .hoster {
            display: flex;
            .img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .text {
                color: #fff;
                font-size: 20px;
                line-height: 30px;
            }
        }
    }
    .right-title {
        color: #fff;
        font-size: 30px;
        font-weight: 700;
        line-height: 60px;
    }
}
.content-introduce {
    display: flex;
    justify-content: center;
    .img {
        width: 740px;
        height:400px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .introuce {
        width: 500px;
        padding: 0px 10px;
        color: #fff;
        font-size: 20px;
    }
}
.speakersout {
    margin: 30px 0;
    background-color: rgb(247, 243, 243);
    border-radius: 5px;
    .head {
        display: flex;
        justify-content: center;
        font-size: 40px;
        font-weight: 900;
        line-height: 50px;
        margin: 30px 0px;
    }
    .container {
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
    }
    .speakers {
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
    }
}
</style>