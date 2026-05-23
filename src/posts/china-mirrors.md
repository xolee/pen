---
title: 中国境内开发环境镜像 Mirror 收集大全
date: 2024-10-13 10:00:00
thumbnail: /uploads/202410/chinamirror.jpg
excerpt: 开发环境国内大厂镜像 Mirror 收集大全。
tags: 
  - 软件
  - dev
  - mirrors
---

# {{ $frontmatter.title }}

## 镜像源列表 {#registry}

::: code-group

```shell [推荐一览]
# Cloudflare Packagist 镜像站
https://packagist.pages.dev/

# npm 阿里镜像
https://registry.npmmirror.com

# npm 官方镜像
https://registry.npmjs.org/
```

:::

## 设置方法 {#config}

<details>
<summary>Composer</summary>

全局设置

```shell
# 设定
composer config -g repos.packagist composer https://packagist.pages.dev

# 取消
composer config -g --unset repos.packagist

# 清除缓存
composer clear-cache

# 设置缓存目录
mkdir D:/AppData/Composer/files D:/AppData/Composer/repo D:/AppData/Composer/vcs D:/AppData/Composer/data 
composer config -g cache-dir D:/AppData/Composer
composer config -g cache-files-dir D:/AppData/Composer/files
composer config -g cache-repo-dir D:/AppData/Composer/repo
composer config -g cache-vcs-dir D:/AppData/Composer/vcs
composer config -g data-dir D:/AppData/Composer/data
```

项目配置

```shell
# 项目的根目录
composer config repo.packagist composer https://packagist.pages.dev

# 或者在 composer.json 中添加如下内容
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.pages.dev"
    }
}
```
</details>


<details>
<summary>npm、yarn、pnpm</summary>

全局设置

```shell
npm config set registry https://registry.npmmirror.com

pnpm config set registry https://registry.npmmirror.com

yarn config set registry https://registry.npmmirror.com
```

</details>

## 参考文档 {#references}

```json
{
  // 国内大厂
  "aliyun": "https://developer.aliyun.com/mirror/",
  "huawei": "https://mirrors.huaweicloud.com/",
  "taobao": "https://www.npmmirror.com/",
  "tencent": "https://mirrors.cloud.tencent.com/",
  "163": "https://mirrors.163.com/",

  // 国内大学
  "tsinghua": "https://mirrors.tuna.tsinghua.edu.cn/",
  "ustc": "https://mirrors.ustc.edu.cn/",

  // 其他
  "cloudflare": "https://packagist.pages.dev/",
}
```
