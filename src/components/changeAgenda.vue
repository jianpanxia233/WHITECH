<template>
    <div class="AgendaInfo">
        <el-form
          ref="AgendaInfo"
          label-position="right"
          :model="AgendaInfo"
          :rules="AgendaRules"
        >
            <el-form-item label="议程名" prop="AgendaName">
                <el-input
                    v-model="AgendaInfo.AgendaName"
                    style="max-width: 500px"
                    placeholder="请输入您认为合适的议程名"
                ></el-input>
            </el-form-item>
            <el-form-item label="议程演讲人" prop="AgendaSpeakers">
                <el-select v-model="AgendaInfo.AgendaSpeakers" multiple placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.speakerUserId"
                    :label="item.realName"
                    :value="item.speakerUserId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                v-model="AgendaInfo.AgendaTime"
                type="datetimerange"
                style="margin-top:16px"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Moment from 'moment'
export default {
    name: 'changeAgenda',
    props: {
        options: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            AgendaInfo: {
                AgendaId: '',
                AgendaName: '',
                AgendaSpeakers: [],
                AgendaTime: []
            },

            AgendaRules: {
                AgendaName:  { required: true, message: '请输入名称', trigger: 'blur' },
                AgendaTime:  { required: true, message: '请选择时间', trigger: 'blur' }
            },
            
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() <= (Date.now()-(24*60*60*1000))
                }
            }
        }
    },
    methods: {
        init(item){
            this.AgendaInfo.AgendaId = item.activityAgendaId
            this.AgendaInfo.AgendaName = item.title
            item.speakerVOS.forEach(item => {
                this.AgendaInfo.AgendaSpeakers.push(item.speakerUserId)
            })
        },
        publish(){
            let form = {}
            let time = this.AgendaInfo.AgendaTime
            form.starTime = Moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
            form.endTime = Moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
            form.activityAgendaId = this.AgendaInfo.AgendaId
            form.title = this.AgendaInfo.AgendaName
            form.userIds = this.AgendaInfo.AgendaSpeakers
            this.$http.put(`/user/activity/agenda`,form).then(result => {
                if(result){
                    this.$message({
                    message: '更新议程成功',
                    type: 'success'
                    });
                    this.$refs.AgendaInfo.resetFields();
                    this.$emit('child2-say')
                } else if(response.code){
                this.$message.error('更新议程失败');
              }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
