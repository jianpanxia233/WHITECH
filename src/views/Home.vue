<template>
    <div id="homepage">
        <div id="PaginationOno">
            <div class="hostEvents">
                <div class="el-container">
                    <div class="title">
                        <div class="img">
                            <img :src="require(`@/assets/title.png`)" alt="title">
                        </div>
                    </div>
                    <div class="main">
                        Whitech是一个在线活动平台，您可以在其中创建、参与有趣的在线活动，与全球的朋友进行互动
                    </div>
                </div>
                <div>
                    <el-button type="primary" @click="hostEvent">举办自己的活动</el-button>
                    <el-button type="danger" @click="goAround">参观现有的活动</el-button>
                </div>
            </div>
            <div class="description">
                <img :src="`https://image.whitech.club/static/0404839b47beb7db53ece6f3dc583200.jpeg`" alt="pic2"/>
            </div>
        </div>
        <div id="PaginationTwo">
            <el-container class="whatsapp">
                <el-header class="title-1">
                    使用方便
                </el-header>
                <el-main class="main">
                    <el-container v-for="item in Events" :key="item.id">
                        <el-header>
                            <p>{{item.title}}</p>
                        </el-header>
                        <el-main style="overflow:visible">
                            <div class="img">
                              <img :src="item.icon" :alt="item.title">
                            </div>
                        </el-main>
                        <p style="font-size: 16px;line-height:45px">{{item.main}}</p>
                    </el-container>
                </el-main>
                <el-footer>
                     <el-button type="primary" @click="hostEvent">举办活动</el-button>
                </el-footer>
            </el-container>
        </div>
        <div id="PaginationThree">
            <el-container>
                <el-header>
                    WHITECH
                </el-header>
                <el-main>
                    <p>研讨会、现场表演、峰会、播客录音、社区聚会、网络、现场问答</p>
                </el-main>
                <el-footer>
                    <span v-for="item in Cases" :key="item.id" @click="detailOfUs(item.id)">{{item.name}}</span>
                </el-footer>
            </el-container>
        </div>
        <el-dialog
        title="活动详情填写"
        :visible.sync="dialogVisible"
        class="apply-deyail"
        >
            <hostModal @child-say="listen" ref="hostmodal"/>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="publishEvent">发布</el-button>
        </el-dialog>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import hostModal from '@/components/hostmodal.vue'
export default {
    components: {
        hostModal
    },
    data() {
        return {
            Events: [
                {
                    id: 1,
                    icon: require(`@/assets/wine.png`),
                    title: `聚会`,
                    main: `易于举办社交活动`
                },
                {
                    id: 2,
                    icon: require(`@/assets/talks.png`),
                    title: `演讲`,
                    main:  `使用互动功能展示自己`
                },
                {
                    id: 3,
                    icon: require(`@/assets/ticket.png`),
                    title: `会议`,
                    main: `创建多模块会议吸引参与者和赞助商`
                }
            ],
            Cases: [
                {
                    id: 1,
                    name: '关于我们'
                },
                {
                    id: 2,
                    name: '加入我们'
                }
            ],
            dialogVisible: false
        }
    },
    methods: {
        hostEvent(){
            let token = Cookies.get(process.env.VUE_APP_COOKIE_KEY)
            if(token=='undefined'){ 
              this.$router.push(`/login`)
            }
            else{
                this.dialogVisible = true   
            }
        },
        goAround(){
            this.$router.push( `/activity`)
        },
        publishEvent(){
            this.$refs.hostmodal.publish()
        },
        listen() {
            this.dialogVisible = false
        },
        detailOfUs(id){
            let route = id === 2 ? 'joinus' : 'aboutus'
            this.$router.push(`/${route}`)
        }
    },
    mounted(){
        try{
            if(Cookies.get(initstatus) == 'unfinish'){
                this.$message.warning('请初始化信息');
                this.$router.push('/admininfo')
            }
        } catch {
            console.log('no need init')
        }
    }
}
</script>
<style lang="scss" scoped>
#homepage {
    height: 100%;
}

#PaginationOno {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    height: 400px;
    background-image: linear-gradient(#090723,#202564);
    .hostEvents {
        div {
            display: flex;
        }
        .el-container {
            display: flex;
            flex-direction: column;
        }
        .title {
            font-size: 40px;
            font-weight: bold;
            color: #fff;
            .img {
                width: 250px;
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .main {
            margin-top: 20px;
            max-width: 500px;
            height: 120px;
            font-size: 18px;
            line-height: 30px;
            color: #fff;
        }
    }
    .description {
        padding: 20px 0;
        width: 520px;
        height: 350px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

#PaginationTwo {
    width: 100%;
    height: auto;
    background-color:#090723;
    // background-image: linear-gradient(#0E1034,#202564);
    img {
        padding-top: 50px;
        margin-left: 50%;
        transform: translateX(-50%);
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .whatsapp {
        padding-top: 100px;
        height: auto;
        .title-1 {
            display: flex;
            font-size: 40px;
            justify-content: center;
            font-weight: bold;
            color: #fff;
        }
        .main {
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: auto;
            font-size: 14px;
            color: #fff;
            .el-container {
                flex: 1;
            }
            p {
                font-size: 20px;
                text-align: center;
                padding: 0 30px;
            }
            .el-main{
                display: flex;
                justify-content: center;
                margin-bottom: 30px;
                .img {
                width: 150px;
                height: 150px;
                    img {
                    width: 100%;
                    height: 100%;
                    }
                }
            }
        }
        .el-footer {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

#PaginationThree {
    width: 100%;
    height: 350px;
    padding-top: 50px;
    background-color:#090723;
    .el-container {
        display: flex;
        color: #fff;
        text-align: center;
        .el-header {
            font-size: 40px;
            font-weight: bold;
        }
        .el-main {
            font-size: 16px;
        }
        .el-footer {
            margin-top: 25px;
            span {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.6);
                margin: 0% 2%;
                cursor: pointer;
            }
        }
    }
}
</style>