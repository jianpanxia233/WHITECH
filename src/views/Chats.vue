<template>
  <el-container>
    <el-aside width="30%" min-width="40%">
      <div class="side-box">
        <div class="header">
          <p class="title">消息中心<span @click="markdown">全部标记已读</span></p>
          <div @click="tosystem">
            <div class="tiktok">
              <img src="@/assets/message.png" alt="" />
            </div>
            <span>系统消息</span>
          </div>
        </div>
        <hr />
        <div class="main">
          <el-input
            placeholder="搜索想要私信的人"
            prefix-icon="el-icon-search"
            v-model="searchname"
            @input="debounceInput"
          ></el-input>
          <div class="list">
            <div
              class="list-item"
              :class="{active: item.userId == talker}"
              v-for="(item, index) in contacts"
              :key="index"
              @click="tomessagebox(item.userId,item.name)"
            >
              <div class="img">
                <img :src="item.portraitUri" :alt="item.name" />
              </div>
              <div>
                <div class="name">{{ item.name }}</div>
                <div class="message">{{ item.message }}</div>
              </div>
              <div class="time">
                {{item.time}}
              </div>
              <div class="tips" v-show="item.unread">
                <span>{{item.unread}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div class="system" v-show="system">
        <div
          v-for="(item, index) in sysmessages"
          :key="index"
          class="system-box"
        >
          <p>{{ item.mes }}</p>
          <span>{{ item.time }}</span>
          <hr />
        </div>
      </div>
      <div class="main-box" v-show="!system">
        <div class="title">
          <span>和{{ name }}的对话</span>
        </div>
        <div class="content">
          <div class="message-wrapper">
            <div
                class="message-item"
                v-for="(msg,index) in messageHistory"
                :key="index"
                :class="[msg.messageDirection == 1 ? 'my-msg' : 'your-msg']"
            >
                <div v-if="msg.messageType == 'RC:TxtMsg'" class="message-text">
                    <div class="rong-avatar">
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
                    </div>
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
        </div>
        <div class="message">
          <div class="message-box">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea"
              @keyup.enter="sendMessage"
            >
            </el-input>
          </div>
          <div class="send-button">
              <el-button @click="sendMessage">发送</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import debounce from "@/plugins/utils";
import { init } from "@/plugins/im";
import * as RongIMLib from "@rongcloud/imlib-v4";
import getDate from "@/plugins/time.js"
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      messageHistory: [],
      searchname: "",
      myportraitUri: localStorage.getItem('avatar'),
      hisportraitUri: '',
      contacts: [
        {
          name: "",
          userId: "",
          message: "",
          portraitUri: '',
          unread: 0
        }
      ],
      system: true,
      sysmessages: [
        {
          mes: "你好你好",
          time: "03-22 21:14",
        },
        {
          mes: "欢迎使用",
          time: "03-23 21:14",
        },
      ],
      talker: "",
      name: "",
      textarea: "",
      im: {}
    };
  },
  computed: {
        
  },
  mounted() {
    this.chatInit();
  },
  methods: {
    tomyinfo(){
      this.$router.push(`/dashbord`)
    },
    tohisinfo(){
      this.$router.push(`/othersInfo?userId=${this.talker}`)
    },
    debounceInput() {
      debounce(() => {
        console.log(this.searchname);
      }, 1000);
    },
    tomessagebox(id,name) {
      this.name = name
      this.talker = id;
      var conversation = this.im.Conversation.get({
        targetId: this.talker,
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
      });
      var option = {
        timestamp: +new Date(),
        count: 20
      };
      conversation.read().then(()=>{
          let that = this
          this.contacts.forEach(el => {
            if(el.userId==id){
              this.hisportraitUri = el.portraitUri
              el.unread = 0
            }
          })
          conversation.getMessages(option).then(function(result){
          var list = result.list; // 历史消息列表
          // var hasMore = result.hasMore; // 是否还有历史消息可以获取
          that.messageHistory = list
          that.$nextTick(that.scrollEnd);
          that.system = false;
          });
      }
      )
    },
    sendMessage() {
        // if(!this.textarea) return false
        var conversation = this.im.Conversation.get({
        // targetId
        targetId: this.talker,
        // 会话类型：RongIMLib.CONVERSATION_TYPE.PRIVATE | RongIMLib.CONVERSATION_TYPE.GROUP
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE,
        });
        // 向会话内发消息
        conversation
        .send({
            // 消息类型，其中 RongIMLib.MESSAGE_TYPE 为 IMLib 内部的内置消息类型常量定义
            messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
            // 消息内容
            content: {
            content: this.textarea, // 文本内容
            },
        })
        .then(message=>{
          this.messageHistory.push(message)
          this.textarea = ''
          this.$nextTick(this.scrollEnd)
        })
    },
    scrollEnd(){
      //添加完消息 跳转到最后一条
      var list = document.querySelectorAll(".message-item");
      if (list.length > 1) {
          var last = list[list.length - 1];
          last.scrollIntoView();
      }
    },
    tosystem() {
      this.system = true;
      this.talker = ''
      this.getmessage()
    },
    markdown() {
        console.log('标记已读')
    },
    chatInit() {
        var that = this 
        var callbacks = {
            CONNECTED: function(conversation) {
              console.log('触发回调')
              // that.setMessageList() 
              // that.tomessagebox(this.talker)
            },
            Received: function(message) {
              that.messageHistory.push(message)
              let list = JSON.parse(localStorage.getItem('resultList'))
              list.forEach((item,index) => {
                onreceive(item.targetId,index)
              })
              function onreceive(id,index){
                let conversation = that.im.Conversation.get({
                  targetId: id,
                  type: RongIMLib.CONVERSATION_TYPE.PRIVATE
                });
                conversation.getUnreadCount().then(function(count) {
                    that.contacts[index].unread = count
                    that.setMessageList()
                    that.$nextTick(that.scrollEnd)
                })
              }
            }
        };
        this.im = init(callbacks)
        this.im.connect({
          token:Cookies.get('IM_TOKEN'),
        })
        .then((user) => {
        console.log("链接成功, 链接用户 id 为: ", user.id);
        this.setMessageList()
    }).catch(err => console.log(err));
    },
    setMessageList(){
        this.im.Conversation.getList().then(list => {
        localStorage.setItem("resultList", JSON.stringify(list));
        console.log('获取会话列表成功', list);
        list.forEach((el,index) => {
          this.getUserInfo(el.targetId,index)
        })
        this.getmessage()
        }).catch(error => {
            console.log('获取会话列表失败: ', error.code, error.msg);
        });   
    },
    getmessage(){
        let result = JSON.parse(localStorage.getItem('resultList'))
        result.forEach( (el,index) => {
        this.contacts[index].message = el.latestMessage.content.content
        this.contacts[index].time = getDate('yyyy/mm/dd',el.latestMessage.sentTime)
        })
    },
    getUserInfo(userId,index){
      this.$http.get(`/user/info/${userId}`).then(result => {
            this.contacts[index].userId = userId
            this.contacts[index].name = result.realName
            this.contacts[index].portraitUri = result.avatar
        })
    }
  },
}
</script>
<style lang="scss" scoped>
.el-container {
  // background-color:rgb(247, 243, 243);
  background-image: linear-gradient(#090723, #202564);
}
.el-aside {
  padding: 20px 15px 20px 80px;
  .side-box {
    width: 310px;
    height: 95%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3%;
    background: rgb(247, 243, 243);
    hr {
      width: 95%;
      margin: 10px auto;
      border: 0;
      height: 1px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .header {
      .title {
        padding-left: 30px;
        font-weight: bold;
        span {
          margin-left: 50px;
          font-weight: normal;
          color: #999;
        }
        span:hover {
          cursor: pointer;
          color: #1f6fff;
        }
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .tiktok {
        width: 25px;
        height: 25px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .main {
      .list {
        .list-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 50px;
          padding: 5px 30px;
          .img {
            width: 40px;
            height: 40px;
            margin-right: 30px;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .name {
            font-size: 14px;
            vertical-align: middle;
          }
          .message {
            font-size: 12px;
            color: #1f6fff;
          }
          .time {
            color: gray;
            font-size: 10px
          }
          .tips {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: red;
            span {
              color: #fff;
              font-size: 13px;
            }
          }
        }
        .list-item:hover {
          cursor: pointer;
          background-color: #20256460;
        }
        .active {
          background-color: #20256460;
        }
      }
    }
  }
}
.el-main {
  .system {
    height: 580px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3%;
    background: rgb(247, 243, 243);
    .system-box {
      padding: 10px 20px;
      hr {
        width: 95%;
        margin: 0 auto;
        border: 0;
        height: 1px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
  .main-box {
    height: 95%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px 4px 0 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    .title {
      background-color: #f6f6f6;
      text-align: center;
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 4px 4px 0 0;
    }
    .content {
      overflow-y: scroll;
      height: 500px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0 0.5rem;
      .message-wrapper {
          padding: 0 0.5rem;
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

      .message-text .message-body {
          position: relative;
          color: #353535;
          padding: 7px;
          max-width: 100%;
          min-height: 24px;
          display: inline-block;
          vertical-align: top;
          text-align: left;
          border-radius: 3px;
          -moz-border-radius: 3px;
          -webkit-border-radius: 3px;
      }

      .message-text .message-body pre {
          white-space: normal;
          font-family: "Microsoft yahei";
      }
      .my-msg .message-text .message-body {
          margin-right: 10px;
          background:#68b9f0;
      }

      .my-msg .message-text .message-body:after {
          position: absolute;
          top: 8px;
          right: -14px;
          border: 5px solid transparent;
          content: " ";
          border-left-color: #68b9f0;
          border-left-width: 10px;
      }

      .your-msg .message-text .message-body {
          margin-left: 0.25rem;
          background: #fff;
      }

      .your-msg .message-text .message-body:before {
          position: absolute;
          top: 0.32rem;
          left: -0.3rem;
          border: 0.2rem solid transparent;
          content: " ";
          border-right-color: #fff;
          border-right-width: 0.15rem;

      }
    }
    .message {
      padding: 15px;
      border-top: 1px solid #e0e0e0;
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
    }
  }
}
</style>