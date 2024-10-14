---
title: 中国境内开发环境镜像 Mirror 收集大全
date: 2024-10-13 10:00:00
thumbnail: https://img.erpweb.eu.org/imgs/2024/10/5d7b61fb9bc1c364.jpg
excerpt: 开发环境国内大厂镜像 Mirror 收集大全。
tags: 
  - 软件
---

# {{ $frontmatter.title }}

## 镜像源列表 {#registry}

::: code-group

```shell [阿里源]
# npm mirror 镜像站
https://npmmirror.com/

# 阿里巴巴开源镜像站
https://developer.aliyun.com/mirror/
```

```shell [华为源]
https://mirrors.huaweicloud.com
```

:::


## 设置方法 {#config}

<details>
<summary>Composer</summary>

全局设置

```shell
composer config -g repo.packagist composer https://mirrors.huaweicloud.com/repository/php/
```

项目配置

```shell
# 项目的根目录
composer config repo.packagist composer https://mirrors.huaweicloud.com/repository/php/

# 或者在 composer.json 中添加如下内容
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://mirrors.huaweicloud.com/repository/php/"
    }
}
```
</details>


<details>
<summary>npm、yarn、pnpm</summary>

全局设置

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com

pnpm install -g cnpm --registry=https://registry.npmmirror.com

yarn config set registry https://registry.yarnpkg.com --global
```

</details>


## 参考文档 {#references}

- [华为开源镜像站](https://mirrors.huaweicloud.com/home)
