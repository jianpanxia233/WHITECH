import * as RongIMLib from '@rongcloud/imlib-v4'

// 应用初始化以获取 RongIMLib 实例对象，请务必保证此过程只被执行一次
const im = RongIMLib.init({ appkey: 'pwe86ga5ps706' });
export function init(callbacks){

    function getExistedConversationList(){
        // 获取会话列表
        return JSON.parse(localStorage.getItem("resultList"))
    }

    // 添加事件监听
    im.watch({
        // 监听会话列表变更事件
        conversation(event) {
            const conversationList = getExistedConversationList()
            //发生变更的会话列表
            const updatedConversationList = event.updatedConversationList;
            // 通过 im.Conversation.merge 计算最新的会话列表
            const latestConversationList = im.Conversation.merge({ conversationList, updatedConversationList })
            callbacks.CONNECTED && callbacks.CONNECTED(latestConversationList)
        },
        // 监听消息通知
        message(event) {
            // 新接收到的消息内容
            const message = event.message;
            callbacks.Received && callbacks.Received(message);
        },
        // 监听 IM 连接状态变化
        status(event) {
            console.log('connection status:', event.status);
        },
        // 监听聊天室 KV 数据变更
        chatroom(event) {
            /**
             * 聊天室 KV 存储数据更新
             * @example
             * [
             *  {
             *    "key": "name",
             *    "value": "我是小融融",
             *    "timestamp": 1597591258338, 
             *    "chatroomId": "z002", 
             *    "type": 1 // 1: 更新（ 含:修改和新增 ）、2: 删除
             *  },
             * ]
             */
            const updatedEntries = event.updatedEntries
        },
        expansion(event) {
            /**
             * 更新的消息拓展数据
             * @example {
             *    expansion: { key: 'value' },      // 设置或更新的扩展值
             *    messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
             * }
             */
            const updatedExpansion = event.updatedExpansion;
            /**
             * 删除的消息拓展数据
             * @example {
             *    deletedKeys: ['key1', 'key2'],    // 设置或更新的扩展值
             *    messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
             * }
             */
            const deletedExpansion = event.deletedExpansion;
        }
        });
    
    return im
}