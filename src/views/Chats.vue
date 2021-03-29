<template>
  <el-container>
    <el-aside width="40%" min-width="40%">
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
              v-for="(item, index) in contacts"
              :key="index"
              @click="tomessagebox(item.name)"
            >
              <div class="img">
                <img :src="item.portraitUri" :alt="item.name" />
              </div>
              <div>
                <div class="name">{{ item.name }}</div>
                <div class="message">{{ item.message }}</div>
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
          <span>和{{ talker }}的对话</span>
        </div>
        <div class="content"></div>
        <div class="message">
          <div class="message-box">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea"
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
import object from "@/plugins/im";
import * as RongIMLib from "@rongcloud/imlib-v4";
import getDate from "@/plugins/time.js"
export default {
  data() {
    return {
      searchname: "",
      contacts: [
        {
          name: "小明",
          message: "你好",
          portraitUri: require(`@/assets/persons/talk1.png`),
        },
        {
          name: "小刚",
          message: "你好",
          portraitUri: require(`@/assets/persons/talk2.jpg`),
        },
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
      textarea: ""
    };
  },
  computed: {
        
  },
  methods: {
    debounceInput() {
      debounce(() => {
        console.log(this.searchname);
      }, 1000);
    },
    tomessagebox(name) {
      this.system = false;
      this.talker = name;
      var conversation = object.im.Conversation.get({
        targetId: this.talker,
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
    });
    var option = {
    timestamp: +new Date(),
    count: 20
    };
    conversation.getMessages(option).then(function(result){
    var list = result.list; // 历史消息列表
    var hasMore = result.hasMore; // 是否还有历史消息可以获取
    console.log('获取历史消息成功', list, hasMore);
    });
    },
    sendMessage() {
        var conversation = object.im.Conversation.get({
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
        .then(function (message) {
            console.log("发送文字消息成功");      
        })
        .catch((error) => {
            console.log("发送文字消息失败", error.code, error.msg);
        });
    },
    tosystem() {
      this.system = true;
      this.getmessage()
    },
    markdown() {
        this.chatInit()
    },
    chatInit() {
        object.im.disconnect().then(() => console.log('断开链接成功'))
        object.im.connect({
        token:
            "RgPWcHHx7DEyDOuctYJiuCZYvDKFaLFzKZEHGzL7ghRi/uYNHd6uK9FhJLmfM/+N@aes0.cn.rongnav.com;aes0.cn.rongcfg.com",
        })
        .then((user) => {
        console.log("链接成功, 链接用户 id 为: ", user.id);
        this.setMessageList()
    });
    // getChatList() {
    // //    object.conversationList.forEach( (el,index) => {
    // //        this.contacts[index].message = el.content.content
    // //        this.contacts[index].name = el.targetId
    // //        this.contacts[index].time = getDate(el.sendTime,'yyyy/mm/dd')
    // //    })
    // }
    },
    setMessageList(){
        object.im.Conversation.getList().then(list => {
        localStorage.setItem("resultList", JSON.stringify(list));
        console.log('获取会话列表成功', list);
    }).catch(error => {
        console.log('获取会话列表失败: ', error.code, error.msg);
    });   
    },
    getmessage(){
        let result = JSON.parse(localStorage.getItem('resultList'))
        result.forEach( (el,index) => {
        this.contacts[index].message = el.latestMessage.content.content
        this.contacts[index].name = el.targetId
        this.contacts[index].time = getDate(el.latestMessage.sentTime,'yyyy/mm/dd')
        })
    },
  mounted() {
        
  },
}
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
    width: 100%;
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
          color: $color-primary;
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
            color: $color-primary;
          }
        }
        .list-item:hover {
          cursor: pointer;
          background-color: #20256460;
        }
      }
    }
  }
}
.el-main {
  .system {
    height: 95%;
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
      flex: 1;
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