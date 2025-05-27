---
title: 如何使用 Cloudflare Worker & Pages 构建免费优质代理上网节点
date: 2024-12-24 12:00:00
thumbnail: https://pic1.58cdn.com.cn/nowater/webim/big/n_v2ff8781dbc05f415cab9509847aa956c5.png
excerpt: 探讨如何使用 Cloudflare Worker & Pages 搭建免费、安全、快速的 vless 代理上网节点。
tags:
  - Free
  - Cloudflare
  - vless
  - v2ray
---

# {{ $frontmatter.title }}

探讨如何不使用 VPS 服务器，免费利用 Cloudflare Workers & Pages 自建一个高效、安全的网络代理节点。

## 项目所需 {#base}

- Cloudflare 账户 
- `cmliu/edgetunnel`：这是一个基于 Cloudflare Worker 平台的脚本，可以方便地将 VLESS 配置信息使用在线配置转换到 Clash 或 Singbox 等工具中。


## 生成 UUID {#generator-UUID}

::: code-group

```shell [Linux]
uuidgen

=== Output ===
a73f1c81-18d2-490c-9c6a-aadac0edad7c
```

```shell [Windows]
# Powershell
[guid]::NewGuid().ToString()

=== Output ===
a73f1c81-18d2-490c-9c6a-aadac0edad7c
```

:::

## 部署 {#depoly}

<details>

<summary>部署到 Cloudflare Pages</summary>

1. 下载项目 [edgetunnel-main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) 文件

1. 创建 Cloudflare Pages，自定义 Pages 名称为 `proxy`，并上传 edgetunnel-main.zip 文件后点击 <kbd>Depoly 部署站点</kbd>

1. 部署完成后点击 <kbd>继续处理站点</kbd> 后，选择 <kbd>设置</kbd> > <kbd>环境变量</kbd> > <kbd>变量和机密</kbd> > <kbd>添加变量</kbd>。 变量名称填写 `UUID`，类型为文本，值为上一步生成的 UUID，后点击 <kbd>保存即可</kbd>。

1. 返回 `部署` 选项卡，在右上角点击 <kbd>创建新部署</kbd> 后，部署环境选择为`制作`，重新上传 edgetunnel-main.zip 文件后，点击 <kbd>保存并部署</kbd> 即可。

</details>

<details>

<summary>部署到 Cloudflare Workers</summary>

1. 登录 Cloudflare 账户，转到 Workers & Page 页面
1. 点击创建，然后切换到 Workers 选项卡，点击创建 Workers
1. 自定义 Worker 名称为 `proxy`，点击部署
1. 打开 [edgetunnel Worker 脚本](https://raw.githubusercontent.com/cmliu/edgetunnel/refs/heads/main/%E6%98%8E%E6%96%87%E6%BA%90%E7%A0%81.js)，并复制脚本内容到 Cloudflare Workers 页面中的 wordker.js
1. 将 Worker 脚本中的 UUID 值修改为上一步生成的 UUID 值
1. 点击部署即可

</details>

## 订阅 {#subscription}

节点的访问地址格式为 `https://{pages-name}.pages.dev/{UUID}`，按照上面的操作 Pages 访问地址是 `https://proxy.pages.dev/a73f1c81-18d2-490c-9c6a-aadac0edad7c`。

部署到 Worker 的地址同理。

## 客户端 {#client}

- v2rayN：Windows、Linux 客户端
- v2rayNG：Android 客户端


### 配置 V2RayN 客户端 {#v2rayN}

1. 在 V2RayN 界面中，选择 <kbd>订阅分组</kbd> → <kbd>订阅分组设置</kbd> → <kbd>添加</kbd>。

1. 输入自定义别名，如 Cloudflare Proxy。可选地址输入节点访问地址，点击确认

1. 然后选择 <kbd>订阅分组</kbd> → <kbd>更新当前订阅(不通过代理)</kbd>

1. 在 V2RayN 主界面切换到 Cloudflare Proxy 分组，在列表中右键选择 <kbd>一键多线程测试延迟和速度测试</kbd>，等待测试完成。

1. 选择一个延迟低和速度快的节点，右键 <kbd>设为活动服务器</kbd>

1. 在 V2RayN 主界面底部系统代理切换为 `PAC 模式` 或者 `自动配置系统代理`

![配置 V2RayN 客户端](/uploads/202410/cloudflare-proxy-v2rayN-client.png)

## 参考文档 {#references}

- [cmliu/edgetunnel](https://github.com/cmliu/edgetunnel)
- [v2rayN](https://github.com/2dust/v2rayN)
- [v2rayNG](https://github.com/2dust/v2rayNG)