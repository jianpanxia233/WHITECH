<template>
    <div style="padding: 10px 20px; background-image: linear-gradient(#090723,#202564);">
        <div class="title">
            <div class="left-title">
                <div class="main-title">{{title}}</div>
                <div class="hoster">
                    <div class="img"><img
                    :src="speakers[0].avatar" alt="hello"
                    /></div>
                    <div class="text">{{speakers[0].realName}}举办</div>
                    <div style="margin-left:20px">
                    <div v-show="userprofile">
                    <el-button type="primary" @click="refreshEvent">更新活动</el-button>
                    <el-button type="danger" @click="deleteEvent">删除活动</el-button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="right-title">
                {{startTime}}---{{endTime}}
            </div>
        </div>
        <div class="content-introduce">
            <div class="img">
                <img :src="cover" alt="pic">
            </div>
            <div class="introuce">
                {{description}}
            </div>
        </div>
        <div class="speakersout">
            <div class="head">
                <p>演讲者</p>
                <p 
                style="display:flex;margin-left:30px;margin-top:30px">
                <el-input
                    v-model="mobile"
                    style="max-width: 500px;margin-top: 10px"
                    placeholder="请输入添加成员手机号"
                ></el-input>
                <span
                v-show="userprofile">
                <el-button
                @click="addSpeakers">添加</el-button></span></p>
            </div>
            <!-- 演讲者 -->
            <div class="container">
                <div v-for="(item,index) in speakers" :key="index" class="speakers">
                    <div class="img">
                        <img :src="item.avatar" :alt="item.name"/>
                    </div>
                    <div class="text">
                        {{item.realName}}
                    </div>
                    <div
                    v-show="userprofile" 
                    class="icon" @click="deleteSpeaker(item.speakerUserId)">
                        <img src="@/assets/close.png" alt="close">
                    </div>
                </div>
            </div>
        </div>  
        <div class="agenda">
            <div class="head">
                <p>议程</p>
                <p 
                style="display:flex;margin-left:30px;margin-top:30px">
                <el-input
                    v-model="agendaTitle"
                    style="max-width: 500px;margin-top: 10px"
                    placeholder="请输入议程名称"
                ></el-input>
                <el-date-picker
                v-model="eventTime"
                type="datetimerange"
                style="margin-top:16px"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
                </el-date-picker>
                <span
                v-show="userprofile">
                <el-button
                @click="addAgenda">添加</el-button></span></p>
            </div>
            <div v-for="(item,index) in agendas" :key="index">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            {{item.title}}
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <span v-for="(item2,index2) in item.speakerVOS" :key="index2">
                                {{item2.realName}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            <span style="font-size:14px">{{item.starTime}}--{{item.endTime}}</span>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple-light">
                            <el-button type="primary" size="small" @click="entermeeting(item.activityAgendaId)">预览</el-button>
                            <el-button type="primary" 
                            size="small"
                            v-show="start"
                            @click="startmeeting(item.activityAgendaId)">开始</el-button>
                            <el-button type="primary" 
                            v-show="!start"
                            size="small"
                            @click="stopmeeting(item.activityAgendaId)">停止</el-button>
                            <el-button 
                            size="small"
                            v-show="userprofile"
                            type="danger" @click="deleteAgenda(item.activityAgendaId)">
                                删除
                            </el-button>
                            <el-button
                            size="small"
                            v-show="userprofile"
                            @click="changeAgenda(item.activityAgendaId)">
                                修改
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <div class="item-agenda">
                    <!-- <div class="item-agenda-child">
                        <el-input v-model="agendaTitle"
                        style="max-width: 500px;margin-top: 10px"
                        placeholder="请输入议程名称"></el-input>
                        <div class="child-button"><el-button
                        @click="changeAgenda(item)">修改标题</el-button></div>
                    </div> -->
                    <div class="item-agenda-child">

                    <!-- <el-input v-model="agendaMobile[index]"
                    style="max-width: 500px;margin-top: 10px"
                    placeholder="请选择演讲人"></el-input> -->
                    <el-select v-model="agendaMobile[index]" placeholder="请选择">
                        <el-option
                        v-for="item in speakers"
                        :key="item.speakerUserId"
                        :label="item.realName"
                        :value="item.speakerUserId">
                        </el-option>
                    </el-select>
                    <div class="child-button"><el-button
                    @click="addAgendaspeakers(item.activityAgendaId,index)"
                    >添加演讲人</el-button></div>
                    </div>
                    <!-- <div class="item-agenda-child">
                    <el-date-picker
                    v-model="changeeventTime"
                    type="datetimerange"
                    style="margin-top:10px"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                    </el-date-picker>
                    <div class="child-button"><el-button
                    @click="changeAgenda(item)">修改议程时间</el-button></div>
                    </div> -->
                </div>
            </div>
        </div>
        <el-dialog
        title="活动详情填写"
        :visible.sync="dialogVisible"
        class="apply-deyail"
        :activityId="activityId"
        >
            <hostModal @child-say="listen" ref="hostmodal"/>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="publishEvent">发布</el-button>
        </el-dialog>
        
    </div>
</template>
<script>
import Moment from 'moment'
import hostModal from '@/components/hostmodal.vue'
export default {
    components: {
        hostModal
    },
    data() {
        return {
            dialogVisible: false,
            start: true,
            title: '',
            cover: '',
            eventTime: '',
            startTime: '',
            description: '',
            endTime: '',
            agendas: [],
             speakers: [
                {
                    speakerUserId: '',
                    name: `中本聪`,
                    img: require(`@/assets/persons/talk1.png`)
                },
                {
                    speakerUserId:'',
                    name: `V姐`,
                    img: require(`@/assets/persons/talk2.jpg`)
                },
            ],
            mobile: '',
            agendaTitle: '',
            agendaMobile: [],
            changeeventTime: '',
            activityId: '',
            isAttendee: true,
            isOrganizer: true,
            isSpeaker: true,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() <= (Date.now()-(24*60*60*1000))
                }
            }
        }
    },
    computed: {
        userprofile() {
            return this.isOrganizer
        }
    },
    mounted(){
        this.queryInfo()
    },
    methods: {
        refreshEvent(){
            this.dialogVisible = true
        },
        publishEvent(){
            this.$refs.hostmodal.refresh(this.activityId)
        },
        deleteEvent(){
            this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.$http.delete(`/user/activity/${this.activityId}`).then(result => {
                if(result) {
                    this.$router.push(`/myacts`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        listen() {
            this.dialogVisible = false
            this.queryInfo()
        },
        queryInfo(){
            this.activityId = this.$route.query.activityId;
            this.$http.get(`/activity/info/${this.activityId}`)
                .then(result => {
                    this.title = result.title
                    this.cover = result.cover
                    this.startTime = result.startTime
                    this.endTime = result.endTime
                    this.description = result.description
                    this.speakers = result.activitySpeakers
                    this.agendas = result.activityAgendas
                    this.isAttendee = result.isAttendee,
                    this.isOrganizer = result.isOrganizer,
                    this.isSpeaker = result.isSpeaker
                })
        },
        addSpeakers() {
            if(this.mobile){
                let params = {
                    activityId: this.activityId,
                    mobile: this.mobile
                }
                this.$http.post(`/user/activity/speaker`,params)
                    .then(result => {
                        if(result){
                            this.$message.success('添加成功')
                            this.mobile = ''
                            this.queryInfo()
                        }
                    })
                }
        },
        addAgendaspeakers(activityAgendaId,index) {
            console.log(activityAgendaId)
            let form = {
                activityAgendaId :activityAgendaId,
                speakUserId : this.agendaMobile[index]
            }
            this.$http.post(`/user/activity/agenda/speaker`,form)
                .then(result => {
                    if(result){
                        this.$message.success('添加成功')
                        this.agendaMobile[index] = ''
                        this.queryInfo()
                    }
                })
        },
        deleteSpeaker(speakerUserId) {
            this.$http.delete(`/user/activity/speaker/${this.activityId}/${speakerUserId}`).then(result => {
                if(result){
                    this.$message.success('删除成功')
                    this.queryInfo()
                }
            })
        },
        addAgenda() {
            let form = {}
            let time = this.eventTime
            let starttime = Moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
            let endtime = Moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
            form.activityId = this.activityId
            form.endTime = endtime
            form.starTime = starttime
            form.title = this.agendaTitle
            let userId = localStorage.getItem('userId')
            form.userIds = [userId]
            this.$http.post(`/user/activity/agenda`,form).then(result => {
                if(result){
                    this.queryInfo()
                }
            })
        },
        changeAgenda(item) {
            let form = {}
            let time = this.changeeventTime
            form.starttime = Moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
            form.endtime = Moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
            form.activityAgendaId = item.activityAgendaId
            form.title = this.agendaTitle
            let userIds = [] 
            item.speakerVOS.forEach(item => {
                userIds.push(item.speakerUserId)
            })
            form.userIds = userIds
            this.$http.put(`/user/activity/agenda`).then(result => {
                if(result){
                    this.queryInfo()
                }
            })
        },
        deleteAgenda(agendaId) {
            this.$http.delete(`/user/activity/agenda/agenda/${agendaId}`).then(result => {
                result ? this.queryInfo() : ''
            })
        },
        entermeeting(agendaId){
            this.$router.push(`/meetingroom?agendaId=${agendaId}`)
        },
        startmeeting(agendaId){
            this.$http.post(`/user/activity/agenda/start/${agendaId}`).then(result => {
                if(result){
                    this.start = false
                }
            })
        },
        stopmeeting(agendaId){
            this.$http.post(`/user/activity/agenda/stop/${agendaId}`).then(result => {
                if(result){
                    this.start = true
                }
            })
        }
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
        border-radius: 50%;
        margin-bottom: 20px;
        .img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .text {
            text-align: center;
            font-size: 26px;
            height: 80px;
            line-height: 80px;
            margin-left: 20px;
        }
        .icon {
            cursor: pointer;
            width: 20px;
            height: 20px;
            img{
                width: 100%;
                height: 100%
            }
        }
    }
}
.item-agenda {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 8%;
    .item-agenda-child {
        display: flex;
        justify-content: space-between;
        .child-button {
            margin: 10px;
        }
    }
}
</style>