<template>
    <div class="outer-box">
        <div class="followbox">
            <el-tabs v-model="activeTab" @tab-click="handleClick">
                <el-tab-pane label="关注" name="concentrate">
                    <div class="main">
                        <el-input
                        placeholder="搜索"
                        prefix-icon="el-icon-search"
                        v-model="searchname"
                        @keyup.enter.native="refreshTblWithSearch"
                        ></el-input>
                        <div class="list">
                            <div class="list-item" 
                                v-for="(item,index) in concentrates" 
                                :key="index"
                                @click="toSpace(item.realName)"
                                >
                                    <div class="img">
                                    <img :src="item.avatar" :alt="item.realName"/>  
                                    </div>
                                    <div>
                                        <div class="name">{{item.name}}</div>
                                        <div class="message"></div>
                                    </div>                    
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="粉丝" name="followers">
                    <div class="main">
                        <el-input
                        placeholder="搜索"
                        prefix-icon="el-icon-search"
                        v-model="searchname"
                        @keyup.enter.native="refreshTblWithSearch"
                        ></el-input>
                        <div class="list">
                            <div class="list-item" 
                                v-for="(item,index) in followers" 
                                :key="index"
                                @click="toSpace(item.realName)"
                                >
                                    <div class="img">
                                    <img :src="item.avatar" :alt="item.realName"/>  
                                    </div>
                                    <div>
                                        <div class="name">{{item.name}}</div>
                                        <div class="message"></div>
                                    </div>                    
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        activeTab: 'concentrate',
        searchname: '',
        concentrates: [
                {
                    name: '小明',
                    sign: '你好',
                    portraitUri: require(`@/assets/persons/talk1.png`)
                },
                {
                    name: '小刚',
                    sign: '你好',
                    portraitUri: require(`@/assets/persons/talk2.jpg`)
                }
            ],
        followers: [
            {
                name: '小花',
                sign: '著名up',
                portraitUri: require(`@/assets/persons/talk1.png`)
            },
            {
                name: '小李',
                sign: '主持人',
                portraitUri: require(`@/assets/persons/talk2.jpg`)
            }
        ],
      }
    },
    mounted(){
        let realName = localStorage.getItem('realName')
        this.$http.get(`/user/follow/page?current=1&size=10&realName=${realName}`).then(result => {
            this.concentrates = result.records
        })
        this.$http.get(`/user/fans/page?current=1&size=10&realName=${realName}`).then(result => {
            this.followers = result.records
        })
    },
    methods: {
        handleClick(tab,event){
            console.log(tab,event)
        },
        refreshTblWithSearch(){
            console.log(11)
        },
        toSpace(){
            console.log(22)
        }
    }
}
</script>
<style lang="scss" scoped>
.outer-box {
    width: 100%;
    height: 100%;
}
.followbox {
    .main {
        .list {
            .list-item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 50px;
                padding: 5px 30px;
                .img{
                    width: 40px;
                    height: 40px;
                    margin-right: 30px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
                .name {
                    font-size: 14px;
                    vertical-align: middle;
                }
                .message {
                    font-size: 12px;
                    color: #999;
                }
            }
            .list-item:hover {
                cursor: pointer;
                background-color: #f6f6f6;
            }
        }
    }
}
</style>