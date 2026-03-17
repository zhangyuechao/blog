---
title: "OpenClaw WebSocket 实时通信：构建即时 AI 应用"
date: 2026-03-17T11:58:00+08:00
draft: false
description: "使用 WebSocket 实现 OpenClaw 的实时双向通信"
featured: false
author: "作者名字"
tags: ["OpenClaw", "WebSocket", "实时", "通信"]
categories: ["高级特性"]
image: "/images/posts/ai-generated/hero-01.jpg"
---

## 为什么需要 WebSocket？

- 实时消息推送
- 流式响应
- 低延迟交互
- 双向通信

## 服务端实现

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  const session = openclaw.session.create();
  
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    
    // 流式响应
    await session.chat(data.content, {
      stream: true,
      onChunk: (chunk) => {
        ws.send(JSON.stringify({
          type: 'chunk',
          content: chunk
        }));
      }
    });
  });
});
```

## 客户端连接

```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'chunk') {
    appendToUI(data.content);
  }
};

// 发送消息
ws.send(JSON.stringify({
  content: '你好'
}));
```

## 总结

WebSocket 让 OpenClaw 实现真正的实时交互。
