<template>
  <div class="wrapper meeting">
    <div class="ag-header">
      <div class="ag-header-lead">
        <img class="header-logo" :src="require('../assets/images/ag-logo.png')" alt="" />
        <span>Whitech</span>
      </div>
      <div class="ag-header-msg">
          Room:&nbsp;<span id="room-name">{{channel}}</span>
      </div>
    </div>
    <div class="ag-main">
      <div class="ag-container">
        <AgoraVideoCall 
          :videoProfile="videoProfile"
          :channel="channel"
          :transcode="transcode"
          :attendeeMode="attendeeMode"
          :baseMode="baseMode"
          :publisherToken="publisherToken"
          :isSpeaker ="isSpeaker"
          :appId="appId"
          @child-say="listen"
          :uid="uid"></AgoraVideoCall>
      </div>  
      <div class="ag-chatroom">
        <div class="box-messages">
          <div
                class="message-item"
                v-for="(msg,index) in messageHistory"
                :key="index"
                :class="[msg.messageDirection == 1 ? 'my-msg' : 'your-msg']"
            >
                <div v-if="msg.messageType == 'RC:TxtMsg'" class="message-text">
                <!-- <div class="rong-avatar">
                      <img
                          v-if="msg.messageDirection == 1"
                          @click="tomyinfo()"
                          :src="myportraitUri"
                          class="rong-avatar-bd"
                      >
                      <img
                          v-else
                          @click="tohisinfo()"
                          :src="hisportraitUri"
                          class="rong-avatar-bd"
                      >
                </div> -->
                <div class="message-body">
                      <pre
                          class="user-msg"
                      >{{msg.content.content}}</pre>
                      <img
                          class="image-message"
                          :src="msg.content.imageUri"
                          alt="image"
                          v-if="msg.content.messageName == 'ImageMessage'"
                      >
                  </div>
                </div>
            </div>
        </div>
        <div class="box-textarea">
          <div class="message-box">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea"
              @keyup.enter.native="sendMessage"
            >
            </el-input>
          </div>
          <div class="send-button">
              <el-button @click="sendMessage" size="mini">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Cookies from "js-cookie";
import { init } from "@/plugins/im";
import * as RongIMLib from "@rongcloud/imlib-v4";
import AgoraVideoCall from "@/components/AgoraVideoCall";
import {AGORA_APP_ID} from "@/plugins/agora.js"
export default {
  components: {
    AgoraVideoCall
  },
  data() {
    return {
      videoProfile: "480p_4",
      channel: Cookies.get("channel") || "test",
      transcode: Cookies.get("transcode") || "interop",
      attendeeMode: Cookies.get("attendeeMode") || "video",
      baseMode: Cookies.get("baseMode") || "avc",
      uid: localStorage.getItem('userId'),
      publisherToken: Cookies.get("publisherToken"),
      isSpeaker: Cookies.get("isSpeaker"),
      im : {},
      chatRoom: {},
      messageHistory: [],
      textarea: ''
    };
  },
  methods: {
    listen(){
      this.chatRoom.quit().then(function() {
        console.log('退出聊天室成功');
      });
    },
    chatroominit() {
      this.chatRoom = this.im.ChatRoom.get({
        id: Cookies.get('channel')
      })
      this.chatRoom.joinExist({
        count:20
      }).then(()=> {
        console.log('加入聊天室成功');
      });
      var option = {
        timestrap: +new Date(),
        count: 20
      };
      this.chatRoom.getMessages(option).then((result)=>{
        this.messageHistory = result.list; // 历史消息列表
        var hasMore = result.hasMore; // 是否还有历史消息可以获取
        console.log('获取聊天室历史消息成功', result.list, hasMore);
      });
    },
    sendMessage(){
      this.chatRoom.send({
        messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
        content: {
          content: this.textarea // 文本内容
        }
      }).then((message)=>{
        console.log('发送文字消息成功', message);
        this.messageHistory.push(message)
        this.textarea = ''
        this.$nextTick(this.scrollEnd)
      });
    },
    scrollEnd(){
      //添加完消息 跳转到最后一条
      var list = document.querySelectorAll(".message-item");
      if (list.length > 1) {
          var last = list[list.length - 1];
          last.scrollIntoView();
      }
    },
  },
  created() {
    this.appId = AGORA_APP_ID
    let agendaId = this.$route.query.agendaId
    let status = this.$route.query.status
    this.$http.post(`/user/activity/agenda/${status}/${agendaId}`).then(result => {
      this.channel = agendaId
      Cookies.set('channel',agendaId)
      if(status=='join'){
        this.publisherToken = result.agoraToken
        this.isSpeaker = result.isSpeaker
        Cookies.set('publisherToken',result.agoraToken)
        Cookies.set('isSpeaker',result.isSpeaker)
        if(result.isSpeaker){
          this.attendeeMode = 'video'
          Cookies.set("attendeeMode",'video')
        } else if(!result.isSpeaker) {
          this.attendeeMode = 'audience'
          Cookies.set("attendeeMode",'audience')
        }
      } else if(status=='preview'){
        this.publisherToken = result.publisherToken
        Cookies.set('publisherToken',result.publisherToken)
      }
    })
  },
  mounted() {
    var callbacks = {
        Received: (message)=>{
          this.messageHistory.push(message)
          this.$nextTick(this.scrollEnd)
        }
    }
    this.im = init(callbacks)
    this.im.connect({
        token:Cookies.get('IM_TOKEN'),
      })
      .then((user) => {
      console.log("链接成功, 链接用户 id 为: ", user.id);
      this.chatroominit()
    }).catch(err => console.log(err));
  }
};
</script>

<style scoped>
.meeting.wrapper {
  background: #090723;
  height: 100%;
}

.meeting .ag-header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ag-header-lead {
  font-size: 16px;
  line-height: 35px;
}

.meeting .ag-main {
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.meeting .ag-footer :first-child {
  margin-right: 80px;
}

.header-logo {
  width: 60px;
  height: 35px;
  margin-right: 12px;
}

.ag-container {
  width: calc(100% - 60px);
  height: 100%;
  overflow:hidden;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.ag-chatroom {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  border-radius: 12px;
  margin-left: 20px;
  background: rgb(247, 243, 243);
}

.box-messages {
  padding: 0 0.5rem;
  height: 450px;
  overflow: auto;
}

.box-textarea {
  display: flex;
  flex-direction: column;
}
.message-item:nth-child(n+1) {
    margin-top: 10px;
}  

.message-item:last-child {
    margin-bottom: 10px;
}

.message-text {
    display: flex;
    font-size: 12px;
}
.message-box {
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
}
.send-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.my-msg .message-text {
    flex-direction: row-reverse;
}

.you-msg .message-text {
    padding-left: 1.39rem;
}

.message-text .rong-avatar {
    flex-shrink: 0;
    width: 35px;
    height: 35px;
    border-radius: 25px;
    overflow: hidden;
    cursor:pointer
}

.message-text .rong-avatar img {
    height: 100%;
    width: 100%;
}
</style>

