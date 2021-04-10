<template>
    <div class="infoForm">
        <div class="el-form">
          <el-form
            :model="ruleForm" 
            status-icon 
            :rules="rules" 
            ref="ruleForm"
            label-position="right"
            >
                <el-form-item label="头像" prop="portrait">
                    <div class="img">
                    <img :src="ruleForm.portrait" :alt="ruleForm.name+'头像'"/>  
                    </div>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <span>{{ruleForm.name}}</span>
                </el-form-item>
                <el-form-item label="社会角色" prop="headLine">
                    <span>{{ruleForm.headLine}}</span>
                </el-form-item>
                <el-form-item label="自我介绍" prop="sign">
                    <span>{{ruleForm.sign}}</span>
                </el-form-item>
            </el-form>
            <el-button v-show="!isfollow" type="primary" @click="follow">关注</el-button>
            <el-button v-show="isfollow" type="info" @click="unfollow">取消关注</el-button>
            <el-button type="primary" @click="toTalk">打个招呼</el-button>
        </div>
        <div class="el-header">
            <div>
                粉丝数：{{fansNum}}
            </div>
            <div class="character">
                <div class="list-item" 
                v-for="(item,index) in followers" 
                :key="index"  @click="toInfo(item.userId)">
                    <img :src="item.avatar" alt="**">
                    <p>{{item.realName}}</p>
                </div>
            </div>
            <div>
                关注数：{{followNum}}
            </div>
            <div class="character">
                <div class="list-item" 
                v-for="(item,index) in centers"
                :key="index" @click="toInfo(item.userId)">
                    <img :src="item.avatar" alt="**">
                    <p>{{item.realName}}</p>
                </div>
            </div>
        </div>
        <hr/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                portrait: '',
                name: '',
                headLine: '',
                sign: ''
                },
            rules:{
                name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            },
            view: false,
            fansNum: 1,
            followNum: 0,
            userId: '',
            isfollow:false,
            followers: [],
            centers: []
        }
    },
    mounted(){
        this.queryUserInfo()
        this.queryfollowers()
    },
    methods: {
        queryUserInfo(){
            this.userId = this.$route.query.userId
            this.$http.get(`/user/info/${this.userId}`).then(result => {
                this.ruleForm.headLine = result.headLine
                this.ruleForm.portrait = result.avatar
                this.ruleForm.name = result.realName
                this.followNum = result.followNum
                this.fansNum = result.fansNum
                this.isfollow = result.isFollow
            })
        },
        toTalk(){
            this.$router.push(`/chats?userId=${this.userId}`)
        },
        toInfo(userId){
            window.location.href = `/othersInfo?userId=${userId}`
        },
        follow() {
            this.$http.post(`/user/follow/${this.userId}`).then(result => {
                if(result){
                    this.isfollow = true
                }
            })
        },
        unfollow() {
            this.$http.post(`/user/cancel/follow/${this.userId}`).then(result => {
                if(result){
                    this.isfollow = false
                }
            })
        },
        queryfollowers() {
            this.$http.get(`/user/fans/page?current=1&size=10&userId=${this.userId}`).then(result => {
                this.followers = result.records
            })
            this.$http.get(`/user/follow/page?current=1&size=10&userId=${this.userId}`).then(result => {
                this.centers = result.records
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.infoForm{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .el-form {
        width: 40%;
        margin-left: 50px;
    }
    .img{
        float: left;
        width: 40px;
        height: 40px;
    }
    img {
        width: 100%;
        height: 100%;
    }
}
.el-header {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    vertical-align: middle;
}

.character {
    width: 400px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    .list-item{
        font-size: 14px;
        margin-left: 20px;
        img {
            width: 50px;
            height: 50px;
        }
        p {
            margin-top: -20px;
        }
    }
}

</style>