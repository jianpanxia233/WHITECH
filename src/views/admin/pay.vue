<template>
    <div class="outerbox">
        <el-container>
            <div class="pay-box" v-for='(item,index) in payments' :key="index">
                <div class="title">
                    <span class="main-title">{{item.title}}</span>
                    <span class="price">{{item.price}}</span>
                </div>
                <p class="content">
                    {{item.content}}
                </p>
                <div class="button">
                    <el-button type="primary">购买</el-button>
                </div>
            </div>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            payments: [
                {
                    title: '月度会员',
                    price: '30rmb',
                    content: '可享受无限畅聊等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等'
                },
                {
                    title: '年度会员',
                    price: '199rmb',
                    content: '可享受无限畅聊等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.outerbox {
    padding: 20px;
    height: 100%;
}
.el-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: #fff;
    .pay-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 30%;
        margin-top: 40px;
        margin-bottom: 40px;
        border-radius: 40px 40px 40px 40px ;
        padding: 30px;
        border: 1px solid $color-primary;
        .title {
            .main-title {
                font-size: 30px;
            }
            .price {
                margin-left: 20px;
                font-size: 24px;
            }
        }
        .content {
            width: 100%;
            max-width: 500px;
            line-height: 30px;
        }
        .button {
            margin-left: 50%;
            transform:translateX(-30%);
        }
    }
}
</style>