<template>
    <div id="homepage">
        <div id="PaginationOno">
            <div class="hostEvents">
                <el-container>
                <el-header class="title">标题</el-header>
                <el-main class="main">这里是服务的说明，这里是服务的说明，这里是服务的说明，这里是服务的说明,这里是服务的说明，这里是服务的说明，这里是服务的说明，这里是服务的说明这里是服务的说明，这里是服务的说明，这里是服务的说明，这里是服务的说明</el-main>
                </el-container>
                <div>
                    <el-button type="primary">举办自己的活动</el-button>
                    <el-button type="danger">参观现有的活动</el-button>
                </div>
            </div>
            <div class="description">
                <img :src="require(`@/assets/socialnet.jpg`)" alt="pic2"/>
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
                        <el-main>
                            <div>
                              <img :src="item.icon" :alt="item.title">
                            </div>
                            <p style="font-size: 16px;line-height:25px">{{item.main}}</p>
                        </el-main>
                    </el-container>
                </el-main>
                <el-footer>
                     <el-button type="primary">举办活动</el-button>
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
                    <span v-for="item in Cases" :key="item.id">{{item.name}}</span>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Events: [
                {
                    id: 1,
                    icon: require(`@/assets/wine.png`),
                    title: `聚会`,
                    main: `易于举办社交活动和团队社交活动。1对1聊天或以小组形式聊天，每个人都可以看到和听到。`
                },
                {
                    id: 2,
                    icon: require(`@/assets/talks.png`),
                    title: `会谈`,
                    main:  `使用互动功能来添加您激动人心的时刻，以组织您的社区想要参加的活动。`
                },
                {
                    id: 3,
                    icon: require(`@/assets/ticket.png`),
                    title: `专题会议`,
                    main: `利用高级工具创建多节或多轨活动，以吸引您的与会者和赞助商。`
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
            ]
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
        .title {
            font-size: 40px;
            font-weight: bold;
            color: #fff;
        }
        .main {
            max-width: 500px;
            height: 250px;
            font-size: 14px;
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
            div{
                display: flex;
                width: 100%;
                height: auto;
                justify-content: center;
            }
            .img {
                width: 150px;
                height: 150px;
                img {
                    width: 100%;
                    height: 100%;
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
            }
        }
    }
}
</style>