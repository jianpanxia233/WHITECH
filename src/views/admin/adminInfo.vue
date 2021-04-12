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
                    <img v-show="!imageUrl"  :src="ruleForm.portrait" :alt="ruleForm.name+'头像'"/>  
                    </div>
                    <el-upload
                    v-show="edit"
                    class="avatar-uploader"
                    ref="upload"
                    action="string"
                    :show-file-list="false"
                    :http-request="handleupload"
                    :before-upload="before_upload"
                    :on-change="fileChange"
                    :file-list="fileList"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <span v-show="!edit">{{ruleForm.name}}</span>
                    <el-input v-model="ruleForm.name"  v-show="edit"></el-input>
                </el-form-item>
                <el-form-item label="社会角色" prop="headLine">
                    <span v-show="!edit">{{ruleForm.headLine}}</span>
                    <el-input v-model.number="ruleForm.headLine"  v-show="edit"></el-input>
                </el-form-item>
                <el-form-item label="自我介绍" prop="sign">
                    <span v-show="!edit">{{ruleForm.sign}}</span>
                    <el-input 
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入详细的标签描述"
                    v-model="ruleForm.sign"
                    v-show="edit"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button type="primary" @click="submitForm('ruleForm')" v-show="edit">提交</el-button>
                    <el-button @click="resetForm('ruleForm')" v-show="!edit">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="el-header">
            <div>
                粉丝数：{{fansNum}}
            </div>
            <div>
                关注数：{{followNum}}
            </div>
            <div style="margin-top:40px">我举办的活动</div>
            <el-button type="primary" @click="hostEvent">举办活动</el-button>
        </div>
        <hr/>
        <div class="el-main" ref="activitybox">
                <div class="itembox" v-for="(item,index) in activities" :key="index"
                @click="gotoDetail(item.id)">
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
                        :key="index2" @click="gotoSpeaker(item2.speakerUserId)">
                            <img :src="item2.img" :alt="item2.name">
                        <p>{{item2.name}}</p>
                        </div>
                    </div>
                </div>
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
import hostModal from '@/components/hostmodal.vue'
export default {
    components: {
        hostModal
    },
    data() {
        return {
            dialogVisible:false,
            edit: false,
            ruleForm: {
                portrait: require(`@/assets/persons/talk1.png`),
                name: '小杠',
                headLine: '22',
                sign: '每天进步一点点'
                },
            rules:{
                name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            },
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
            view: false,
            fansNum: 1,
            followNum: 0,
            fileList: [],
            imageUrl: '',
        }
    },
    mounted(){
        this.queryActicities()
        this.queryUserInfo()
    },
    methods: {
        resetForm(name){
            this.edit = true
        },
        submitForm() {
            let form = {
                bio : this.ruleForm.sign,
                headLine : this.ruleForm.headLine,
                realName : this.ruleForm.name
            }
            this.$http.put(`/user`,form).then(result => {
                this.ruleForm.portrait = result.avatar
                // this.ruleForm.sign = result.bio
                this.ruleForm.headLine = result.headLine
                this.ruleForm.name = result.realName 
                this.edit = false
            })

        },
        hostEvent(){
            this.dialogVisible = true
        },
        publishEvent(){
            this.$refs.hostmodal.publish()
        },
        listen() {
            this.dialogVisible = false
        },
        queryActicities(){
            this.$http.get(`/user/activity/page?current=1&size=10&status=1`)
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
            })
        },
        queryUserInfo(){
            this.$http.get(`/user/info`).then(result => {
                this.ruleForm.headLine = result.headLine
                this.ruleForm.portrait = result.avatar
                this.ruleForm.name = result.realName
                this.followNum = result.followNum
                this.fansNum = result.fansNum
            })
        },
        handleupload(param) {
        const formData = new FormData()
        formData.append('file', param.file)
        this.$http.put(`/user/avatar`,formData).then(result => {
                    this.ruleForm.portrait = result.avatar
                    this.imageUrl = result.avatar
                    // this.ruleForm.sign = result.bio
                    this.ruleForm.headLine = result.headLine
                    this.ruleForm.name = result.realName 
                    this.edit = false
                    this.$message({
                    message: '上传成功',
                    type: 'success'
                    });
                })
      },
      fileChange(file) {
        this.$refs.upload.clearFiles() //清除文件对象
        this.fileList = [{name: file.name, url: file.url}]
      },
      before_upload(file) {
        const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },
        gotoDetail(id){
            this.$router.push(`/activitydetail?activityId=${id}`)
        },
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
.el-main {
        width: 60%;
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
        .itembox {
            background: rgb(247, 243, 243);
            height: 230px;
            margin-top: 30px;
            border-radius: 40px 40px 40px 40px ;
            border: 1px solid rgb(247, 243, 243);
        }
        .headImg {
            width: 200px;
            height: 100px;
            img {
                border-radius: 20px 20px 0 0 ;
                width:200px;
                height: 100px;
            }
        }
        .main {
            width: 200px;
            height: 70px;
            color: #000;
            .time {
                padding: 1px 10px;
                font-size: 12px;
            }
            .name {
                padding: 0px 10px;
                margin-top: -2px;
                margin-bottom: 5px;
                line-height: 1.0;
                font-size: 14px;
                font-weight: 600;
            }
            .mentor {
                margin: 0 0 5px 10px;
                font-size: 12px;
                color: #aeaeae;
            }
        }
        .foot {
            margin-top: -5px;
            width: 200px;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            .character{
               font-size: 12px;
               margin-left: 25%;
                img {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
.apply-detail {
    padding: 10px 20px;
    font-weight: 600;
}
</style>