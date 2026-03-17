#!/bin/bash
# GitHub 博客部署脚本
# 使用方法: ./deploy.sh YOUR_GITHUB_TOKEN

set -e

TOKEN=$1
REPO_NAME="blog"
USERNAME="zhangyuechao"

if [ -z "$TOKEN" ]; then
    echo "❌ 错误: 请提供 GitHub Token"
    echo "使用方法: ./deploy.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "如何获取 Token:"
    echo "1. 访问 https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token (classic)'"
    echo "3. 勾选 'repo' 权限"
    echo "4. 生成后复制 token"
    exit 1
fi

echo "🚀 开始部署博客到 GitHub..."

# 1. 创建 GitHub 仓库
echo "📦 创建 GitHub 仓库: $REPO_NAME"
curl -s -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"我的个人博客 - Hugo + Blowfish\",\"private\":false}" || echo "仓库可能已存在，继续..."

# 2. 等待仓库创建完成
sleep 2

# 3. 配置远程仓库
cd /root/.openclaw/workspace/my-blog
git remote remove origin 2>/dev/null || true
git remote add origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO_NAME.git"

# 4. 推送源码
echo "📤 推送源码到 GitHub..."
git push -u origin master --force

# 5. 构建并部署到 gh-pages 分支
echo "🔨 构建静态网站..."
hugo --minify --baseURL "https://$USERNAME.github.io/$REPO_NAME/"

# 6. 创建 gh-pages 分支并推送
cd public
git init
git remote add origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO_NAME.git" 2>/dev/null || git remote set-url origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO_NAME.git"
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages

echo ""
echo "✅ 部署完成！"
echo "📍 网站地址: https://$USERNAME.github.io/$REPO_NAME/"
echo "📍 源码地址: https://github.com/$USERNAME/$REPO_NAME/"
echo ""
echo "⚠️  注意: 首次部署后需要等待 1-5 分钟才能在浏览器访问"
