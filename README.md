# 不用好起来

一个无需登录、不上传情绪数据的安静陪伴 PWA。

```powershell
npm install
npm run dev
```

打开 `http://127.0.0.1:5173/`。生产构建使用 `npm run build`。

首版文案位于 `src/App.jsx` 的 `emotions` 数组中。正式发布前应由创作者和心理健康专业人士复核全部文案。

## GitHub Pages

推荐创建名为 `lbf509102-sketch.github.io` 的公开仓库，然后把本项目推送到 `main` 分支。

1. 在 GitHub 新建仓库：`lbf509102-sketch.github.io`。
2. 在仓库的 **Settings → Pages** 中，将构建来源设为 **GitHub Actions**。
3. 将本项目提交并推送到 `main` 分支。
4. 等待 Actions 完成，访问 `https://lbf509102-sketch.github.io/`。

`.github/workflows/deploy-pages.yml` 会自动执行安装、构建和发布。工作区中的其他练习目录已加入 `.gitignore`，不会被上传。
