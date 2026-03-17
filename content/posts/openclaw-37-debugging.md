---
title: "OpenClaw 调试技巧：快速定位问题"
date: 2026-03-17T09:12:00+08:00
draft: false
description: "掌握 OpenClaw 的调试工具和技巧，高效解决问题"
featured: false
author: "作者名字"
tags: ["OpenClaw", "调试", "问题排查", "技巧"]
categories: ["工具"]
image: "/images/posts/ai-generated/hero-08.jpg"
---

## 调试模式

```bash
# 开启调试
openclaw --debug

# 详细日志
openclaw --verbose

# 单步执行
openclaw --step
```

## 日志级别

```javascript
// 设置日志级别
openclaw.logger.setLevel('debug');

// 查看调用链
openclaw.logger.trace('执行路径');
```

## 技能调试

```javascript
// 技能单元测试
openclaw skills test my-skill --verbose

// 模拟执行
openclaw skills simulate my-skill --input "测试输入"
```

## 网络调试

```bash
# 查看 API 调用
openclaw --trace-api

# 检查响应时间
openclaw --profile
```

## 常见问题

| 问题 | 解决方法 |
|------|----------|
| 技能加载失败 | 检查 manifest.json |
| API 超时 | 检查网络或增加超时时间 |
| 内存不足 | 减少并发或增加内存 |

## 总结

熟练使用调试工具是高效开发的必备技能。
