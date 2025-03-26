# Vue3 AI 聊天助手

基于 Vue3 + Vite6 + Vant4 + DeepSeek 的智能 AI 聊天助手。

## 功能特点

- 基于 Vue3 和 Vite6 构建
- 使用 Vant4 UI 组件库
- 集成 DeepSeek AI 对话功能
- 响应式设计，支持移动端
- 流式对话体验

## 安装和运行

1. 克隆项目
```bash
git clone [项目地址]
cd vue3-ai-chat
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
复制 `.env.example` 文件为 `.env`，并填入你的 DeepSeek API 配置：
```
VITE_API_BASE_URL=你的 DeepSeek API 地址
VITE_API_KEY=你的 DeepSeek API 密钥
```

4. 运行开发服务器
```bash
npm run dev
```

5. 构建生产版本
```bash
npm run build
```

## 使用说明

1. 在输入框中输入你想问的问题
2. 点击发送按钮或按回车键发送消息
3. 等待 AI 助手的回复

## 注意事项

- 请确保已获取 DeepSeek API 的访问权限
- 请妥善保管你的 API 密钥
- 建议在开发环境中使用

## 技术栈

- Vue 3
- Vite 6
- Vant 4
- Axios
- DeepSeek API 