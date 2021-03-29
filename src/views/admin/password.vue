<template>
    <div class="infoForm">
        <el-form :model="ruleForm2" 
        status-icon 
        :rules="rules" 
        ref="ruleForm2"
        label-position="left"
        label-width="100px">
            <el-form-item label="验证码" prop="auth">
                <el-input v-model="ruleForm2.auth"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input v-model.number="ruleForm2.pass" placeholder="请输入8-15个字符"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="pass">
                <el-input v-model.number="ruleForm2.pass" placeholder="请再次确认"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm2: {
                auth: '',
                pass: ''
                },
            rules:{
                auth: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ] ,
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.infoForm{
    margin: 30px 100px ;
}
</style>