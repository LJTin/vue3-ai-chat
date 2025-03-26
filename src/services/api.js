import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.deepseek.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY || 'YOUR_API_KEY'}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  withCredentials: true
})

export const chatService = {
  async sendMessage(message, onStream) {
    try {
      const response = await api.post('/chat/completions', {
        model: import.meta.env.VITE_MODEL_NAME || "deepseek-chat",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        stream: true,
        temperature: parseFloat(import.meta.env.VITE_TEMPERATURE) || 0.7,
        max_tokens: parseInt(import.meta.env.VITE_MAX_TOKENS) || 2000
      }, {
        responseType: 'stream',
        headers: {
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      })

      if (onStream) {
        const reader = response.data.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                onStream(null) // 结束流
              } else {
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.choices?.[0]?.delta?.content) {
                    onStream(parsed.choices[0].delta.content)
                  }
                } catch (e) {
                  console.error('解析响应数据失败:', e)
                }
              }
            }
          }
        }
      }

      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
} 