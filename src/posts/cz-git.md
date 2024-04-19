---
title: cz-git 使用指南笔记
date: 2024-01-01 00:00:00
thumbnail: https://pic.ziyuan.wang/user/agobox/2024/04/cz-git-logo_77ee49640f4a1.png
excerpt: cz-git 是 commitizen 的适配器工具，用来快速生成标准化 git commit message。本文讲述了 cz-git 的使用指南，包括全局安装、配置适配器类型、添加自定义配置等步骤。
tags:
  - commitizen
  - cz-git
  - git
---

# {{ $frontmatter.title }}

## 全局安装使用 {#global-installation}

全局安装的好处在任何项目下都可以利用 `cz` 或 `git cz` 命令启动命令行工具，生成标准化 commit message

### 步骤 1: 下载全局依赖 {#global-step-install-dependencies}

```shell
pnpm install -g cz-git commitizen
```

### 步骤 2: 全局配置适配器类型 {#global-step-config-adapter}

::: code-group

```shell [Linux]
echo '{ "path": "cz-git", "$schema": "https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@1.7.1/docs/public/schema/cz-git.json" }' > ~/.czrc
```

```shell [Windows]
# %USERPROFILE% 为 Windows 系统下的用户目录，如 C:\Users\用户名
echo { "path": "cz-git", "$schema": "https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@1.7 .1/docs/public/schema/cz-git.json" } > %USERPROFILE%\.czrc
```
:::

### 步骤 3: 添加自定义配置 {#global-step-add-config}

::: tip
**注意** : 步骤 3 是在默认配置不满足需求的情况下，来进行自定义配置，省略该步骤即使用用默认配置。
:::

有 **两种** 配置方式，第一种以 `~/.czrc` 文件作为配置文件，第二种与 `commitlint` 配合，在 `$HOME` 路径下创建配置文件

**方式一** : 编辑 `~/.czrc` 文件以 `JSON` 格式添加配置

步骤 2 已经生成 `~/.czrc` 文件，这步可以增加自己的配置，如增加 `emoji` 表情

```json{3}
{
  "path": "cz-git",
  "useEmoji": true
}
```

**方式二** : 与 [commitlint](https://github.com/conventional-changelog/commitlint) 配合，在 `$HOME` 路径下创建配置文件（参考官方[配置模板](https://cz-git.qbb.sh/zh/config/)）

## 项目中使用 {#project-installation}

### 步骤 1: 下载依赖 {#project-step-install-dependencies}

```bash
pnpm install -D cz-git commitizen
```

### 步骤 2: 指定适配器 {#project-step-config-adapter}

```ts{5-9}
{
  "scripts": {
    ...
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

### 步骤 3: 添加配置文件 {#project-step-add-config}

在根目录创建 `.commitlintrc` 配置文件。
