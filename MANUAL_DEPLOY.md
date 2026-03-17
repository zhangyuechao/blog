# 手动部署步骤

## 1. 在 GitHub 创建仓库
访问: https://github.com/new
- Repository name: blog
- Description: 我的个人博客 - Hugo + Blowfish
- 选择 Public
- 点击 Create repository

## 2. 推送源码
在终端执行:

cd /root/.openclaw/workspace/my-blog

# 配置远程仓库（用你的用户名替换 zhangyuechao）
git remote add origin https://github.com/zhangyuechao/blog.git

# 推送源码
git push -u origin master

## 3. 开启 GitHub Pages
1. 访问: https://github.com/zhangyuechao/blog/settings/pages
2. Source 选择: Deploy from a branch
3. Branch 选择: master，文件夹选 / (root)
4. 点击 Save

## 4. 访问网站
等待 1-5 分钟后访问:
https://zhangyuechao.github.io/blog/

## 5. 后续更新文章后重新部署

cd /root/.openclaw/workspace/my-blog

# 添加新文章
hugo new content posts/新文章.md

# 编辑文章后提交
git add -A
git commit -m "添加新文章"
git push origin master

# 构建并更新 GitHub Pages（如果使用 gh-pages 分支）
hugo --minify --baseURL "https://zhangyuechao.github.io/blog/"
cd public
git init
git remote add origin https://github.com/zhangyuechao/blog.git
git checkout -b gh-pages
git add -A
git commit -m "Update"
git push -f origin gh-pages
