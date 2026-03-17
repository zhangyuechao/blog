---
title: "OpenClaw 技能开发实战：从零开发一个天气查询技能"
date: 2026-03-17T11:04:00+08:00
draft: false
description: "手把手教你开发 OpenClaw 自定义技能，以天气查询为例展示完整开发流程"
featured: true
author: "作者名字"
tags: ["OpenClaw", "技能开发", "教程", "JavaScript"]
categories: ["实战开发"]
image: "/images/posts/ai-generated/hero-04.jpg"
---

## 技能架构概述

OpenClaw 技能是一个标准化的模块，包含以下组件：
- `manifest.json` - 技能描述文件
- `index.js` - 主要逻辑代码
- `SKILL.md` - 使用文档

## 创建天气查询技能

### 1. 创建技能目录

```bash
mkdir -p ~/.openclaw/skills/weather
cd ~/.openclaw/skills/weather
```

### 2. 编写 manifest.json

```json
{
  "name": "weather",
  "version": "1.0.0",
  "description": "查询全球城市天气",
  "author": "yourname",
  "entry": "index.js",
  "permissions": ["network"],
  "triggers": ["天气", "temperature", "weather"]
}
```

### 3. 编写核心逻辑

```javascript
// index.js
const axios = require('axios');

module.exports = {
  name: 'weather',
  
  async execute(query, context) {
    const city = this.extractCity(query);
    
    try {
      const response = await axios.get(
        `https://api.weather.com/v1/current?city=${city}`
      );
      
      return {
        success: true,
        data: {
          city: city,
          temperature: response.data.temp,
          condition: response.data.condition,
          humidity: response.data.humidity
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `无法获取 ${city} 的天气信息`
      };
    }
  },
  
  extractCity(query) {
    // 简单的城市提取逻辑
    const match = query.match(/(.+?)的?天气/);
    return match ? match[1] : '北京';
  }
};
```

## 测试技能

```bash
# 加载技能
openclaw skills load weather

# 测试
openclaw ask "北京天气怎么样？"
```

## 进阶功能

- 添加缓存机制
- 支持多语言
- 集成地图显示
- 预报功能

## 总结

通过本教程，你学会了如何开发一个完整的 OpenClaw 技能。这个模式可以应用到任何类型的技能开发中。
