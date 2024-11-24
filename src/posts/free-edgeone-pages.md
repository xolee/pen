---
title: 免费白嫖腾讯 EdgeOne Pages 服务构建 VitePress 站点
date: 2024-11-24 12:00:00
thumbnail: https://pic2.58cdn.com.cn/nowater/webim/big/n_v2b1dfdafbe5094a92a6bdd33a1ffb43fd.jpg
excerpt: 配置 EdgeOne Pages 服务快速构建、部署静态 VitePress 站点
tags:
  - Free
  - VitePress
---

# {{ $frontmatter.title }}

EdgeOne Pages 是基于 Tencent EdgeOne 基础设施打造的前端开发和部署平台，专为现代 Web 开发设计，帮助开发者快速构建、部署静态站点和无服务器应用。通过集成边缘函数能力，实现高效的内容交付和动态功能扩展，支持全球用户的快速访问。

EdgeOne Pages 服务现在处于公测阶段，官方说长期提供免费版本，公测期间无限制，当未来进行商业化时，免费版本会有一定限制，例如构建次数等。 Pages 服务使用也很简单，只需要授权自己的 Github 仓库即可。最关键的是免费。

EdgeOne Pages 国内服务地址：https://console.cloud.tencent.com/edgeone/pages
EdgeOne 国际站点：https://edgeone.ai/

::: danger

需要注意的是我们只用 EdgeOne Pages 服务，其他的不用开通，以免产生其他费用。EdgeOne 的是免费 14 天，Pages 是免费的。

:::

[![EdgeOne Pages 管理菜单](https://pic8.58cdn.com.cn/nowater/webim/big/n_v284e623edba1e42449dec6af04168cf22.png)](https://pic8.58cdn.com.cn/nowater/webim/big/n_v284e623edba1e42449dec6af04168cf22.png)

## 仓库授权 {#authorization}

进入 Pages 管理页面，按照提示登录 Github 账号，授权仓库权限，我这里是只授权了部署项目仓库的权限。

## 项目部署 {#deployments}

授权过后，会显示对应权限的仓库，点击要部署的仓库，进行相关部署设置即可。

[![EdgeOne Pages 项目部署设置](https://pic8.58cdn.com.cn/nowater/webim/big/n_v24a798d76d2b6437eadb21341293e23a0.png)](https://pic8.58cdn.com.cn/nowater/webim/big/n_v24a798d76d2b6437eadb21341293e23a0.png)

部署命令跟本地测试一样，如果命令有错误，后面也可以在项目设置中进行修改。

## 自定义域名 {#settings}

项目部署成功后，会有一个临时域名提示，有效期 3 个小时。

我们可以在项目设置中，增加自定义域名，前提得要有备案。根据相应提示添加 CNAME 解析，然后在面板进行验证，验证通过后，腾讯会自动生成绑定域名相对应的证书。

[![EdgeOne Pages 添加自定义域名](https://pic2.58cdn.com.cn/nowater/webim/big/n_v28971981f0e004309915fc82eb616185a.png)](https://pic2.58cdn.com.cn/nowater/webim/big/n_v28971981f0e004309915fc82eb616185a.png)

## 效果 {#results}

访问效果是杠杠的，但是不知道能用多少时间，现在国内的 Pages 服务基本都关闭了。
