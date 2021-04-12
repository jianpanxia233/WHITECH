<template>
    <div class="outbox">
        <div class="title">关于我们</div>
        <div class="content">
                <p>WHITECH是一个线上活动平台，致力于让人们可以随时随地参与有趣的线上活动，与具有相同愿景和相似爱好的人会面、合作、学习。</p>
                <p>
                WHITECH is an online activity platform dedicated to allowing people to participate in interesting online activities anytime and anywhere, meeting, cooperating, and learning with people with the same vision and similar hobbies.
                WHITECH es una plataforma de actividades en línea dedicada a permitir que las personas participen en actividades en línea interesantes en cualquier momento y en cualquier lugar, conociendo, cooperando y aprendiendo con personas con la misma visión y pasatiempos similares.</p>
        </div>
        <div class="foot">
            <p>联系我们：whitechstartup@126.com</p>
            <router-link to="/joinus">
                <p style="color:#fff">加入我们（tap进入“加入我们“页面）</p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.outbox {
    height: 100%;
    background-color:#090723;
    padding: 40px 80px;
    color: #fff;
    .title {
        font-size: 30px;
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 20px 0px;
        font-size: 20px;
        line-height: 30px;
    }
}
</style>