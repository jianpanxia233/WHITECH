<template>
    <div class="hostmodal">
        <el-form
          ref="eventInfo"
          label-position="right"
          :model="eventInfo"
          :rules="eventRules"
        >
            <el-form-item label="活动名" prop="eventName">
                <el-input
                    v-model="eventInfo.eventName"
                    style="max-width: 500px"
                    placeholder="请输入您认为合适的活动名"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动介绍" prop="eventDetail">
                <el-input
                    v-model="eventInfo.eventDetail"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 10 }"
                    :rows="3"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动图片" prop="eventPic">
                <el-upload
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
            <el-form-item label="选择时间" prop="eventTime">
                <el-date-picker
                v-model="eventInfo.eventTime"
                :picker-options="pickerOptions"
                type="datetimerange"
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
    name: 'hostmodal',
    props: {
        view: {
            type: Boolean,
            default() {
                return false
            }
        },
        activityId : {
          type: String,
          default() {
            return '';
          },
        }
    },
    data() {
        return {
            imageUrl: 'https://hopintch.oss-cn-shanghai.aliyuncs.com/bb85df4c374c4ed09bf0e0ac06b12140.jpg',
            fileList: [],
            eventInfo:{
                eventName: '',
                eventDetail: '',
                eventPic: '',
                eventTime: ''
            },
            eventRules: {
                eventName:  { required: true, message: '请输入名称', trigger: 'blur' },
                eventTime:  { required: true, message: '请选择时间', trigger: 'blur' }
            },
            loading: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() <= (Date.now()-(24*60*60*1000))
                }
            }
            }
    },
    mounted() {
        
    },
    methods: {
      handleupload(param) {
        const formData = new FormData()
        formData.append('file', param.file)
        this.$http.post('/oss/upload/image',formData).then(response => {
          console.log(response)
          // this.imageUrl = URL.createObjectURL(file.raw);
          this.$message({
          message: '上传成功',
          type: 'success'
          });
          this.imageUrl=response
        }).catch(response => {
          console.log('上传图片失败')
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
      publish(){
        this.$refs.eventInfo.validate(valid => {
          if(valid){
            let form = {
              cover : this.imageUrl,
              description: this.eventInfo.eventDetail,
              endTime: "",
              startTime: "",
              title: this.eventInfo.eventName
            }
            let time = this.eventInfo.eventTime
            let starttime = Moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
            let endtime = Moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
            form.endTime = endtime
            form.startTime = starttime
            this.$http.post('/user/activity',form).then(response => {
              if(response){
                this.$message({
                message: '发布活动成功',
                type: 'success'
                });
                this.$refs.eventInfo.resetFields();
                this.imageUrl = ''
                this.$emit('child-say')
              } else if(response.code){
                this.$message.error('发布活动失败');
              }
            })
          }
        })
      },
      refresh(activityId){
        this.$refs.eventInfo.validate(valid => {
          if(valid){
            let form = {
              cover : this.imageUrl,
              description: this.eventInfo.eventDetail,
              endTime: "",
              startTime: "",
              title: this.eventInfo.eventName
            }
            let time = this.eventInfo.eventTime
            let starttime = Moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
            let endtime = Moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
            form.endTime = endtime
            form.startTime = starttime
            form.activityId = activityId
            this.$http.put('/user/activity',form).then(response => {
              if(response){
                this.$message({
                message: '更新活动成功',
                type: 'success'
                });
                this.$refs.eventInfo.resetFields();
                this.imageUrl = ''
                this.$emit('child-say')
              } else if(response.code){
                this.$message.error('更新活动失败');
              }
            })
          }
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>