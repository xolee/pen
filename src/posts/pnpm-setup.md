---
title: PNPM 国内镜像源并自定义设置目录 
date: 2025-05-27 10:00:00
thumbnail: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iorh6ftsaniq8afcuf34.png
excerpt: PNPM 自定义设置目录。
tags: 
  - PNPM
  - dev
  - mirrors
---

# {{ $frontmatter.title }}

## 更换源 {#registry}

::: code-group

```shell [阿里源]
pnpm config set registry https://registry.npmmirror.com/
```

```shell [华为源]
pnpm config set registry https://mirrors.huaweicloud.com/repository/npm/
```

```shell [官方镜像源]
pnpm config set registry https://registry.npmjs.org/
```

:::

## 自定义设置目录 {#set-dir}

```
mkdir D:\AppData\pnpm\store D:\AppData\pnpm\global D:\AppData\pnpm\global-bin D:\AppData\pnpm\state D:\AppData\pnpm\cache

pnpm config set store-dir "D:\AppData\pnpm\store"             # pnpm 全局仓库路径（类似 .git 仓库）
pnpm config set global-dir "D:\AppData\pnpm\global"           # pnpm 全局安装路径
pnpm config set global-bin-dir "D:\AppData\pnpm\global-bin"   # pnpm 全局 bin 路径
pnpm config set state-dir "D:\AppData\pnpm\state"             # pnpm 创建 pnpm-state.json 文件的目录
pnpm config set cache-dir "D:\AppData\pnpm\cache"             # pnpm 全局缓存路径
```

然后需要将 `D:\AppData\pnpm\global` 和 `D:\AppData\pnpm\global-bin` 两个目录路径添加到本地环境中。
