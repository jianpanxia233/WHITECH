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
            <el-form-item label="活动类型" prop="eventType">
                <el-select
                    v-model="eventInfo.eventType"
                    filterable
                    placeholder = "请选择活动类型"
                >
                    <el-option
                      v-for="item in eventTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                </el-select>
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
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="主讲人" prop="eventTalker">
                <el-select
                v-model="eventInfo.eventTalker"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入昵称"
                :remote-method="remoteMethod"
                :loading="loading"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择时间" prop="eventTime">
                <el-date-picker
                v-model="eventInfo.eventTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'hostmodal',
    props: {
        view: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            imageUrl: '',
            eventInfo:{
                eventName: '',
                eventType: '',
                eventDetail: '',
                eventTalker: '',
                eventTime: ''
            },
            eventRules: {
                eventName:  { required: true, message: '请输入名称', trigger: 'blur' },
                eventType:  { required: true, message: '请选择类型', trigger: 'blur' },
                eventTalker:  { required: true, message: '请输入昵称', trigger: 'blur' },
                eventTime:  { required: true, message: '请选择时间', trigger: 'blur' }
            },
            eventTypes : ['宣讲','聚会','面试'], 
            options: [],
            loading: false,
            list: [],
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"],
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
              },
            }
    },
    mounted() {
        this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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