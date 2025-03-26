<template>
  <div class="chat-container">
    <van-nav-bar title="AI 智能助手" />
    
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']">
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>

    <div class="chat-input">
      <van-field
        v-model="inputMessage"
        placeholder="请输入您的问题..."
        @keyup.enter="sendMessage"
      >
        <template #button>
          <van-button type="primary" @click="sendMessage">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { showToast } from 'vant'
import { chatService } from './services/api'

const messages = ref([])
const inputMessage = ref('')
const messagesContainer = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) {
    showToast('请输入内容')
    return
  }

  // 添加用户消息
  messages.value.push({
    type: 'user',
    content: inputMessage.value
  })

  const userMessage = inputMessage.value
  inputMessage.value = ''
  await scrollToBottom()

  try {
    const response = await chatService.sendMessage(userMessage)
    
    // 添加 AI 回复
    messages.value.push({
      type: 'ai',
      content: response.reply
    })
  } catch (error) {
    showToast('发送失败，请重试')
  }

  await scrollToBottom()
}

onMounted(() => {
  messages.value.push({
    type: 'ai',
    content: '你好！我是 AI 助手，有什么可以帮你的吗？'
  })
})
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #f7f8fa;
}

.message {
  margin-bottom: 16px;
  max-width: 80%;
}

.user-message {
  margin-left: auto;
}

.ai-message {
  margin-right: auto;
}

.message-content {
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-message .message-content {
  background-color: #1989fa;
  color: white;
}

.chat-input {
  padding: 16px;
  background-color: white;
  border-top: 1px solid #eee;
}
</style> 