---
title: 在一台电脑中配置多个账号 Github SSH 密钥
date: 2024-04-19
thumbnail: https://pic3.58cdn.com.cn/nowater/webim/big/n_v2503e0ea0022e452193895b7532cc8fc6.png
excerpt: 配置多个 Github 账户 SSH 密钥，上传时自动验证并推送修改代码。
tags:
  - Github
  - SSH
---

# {{ $frontmatter.title }}

在一台电脑中配置为多个 Github 账户生成 不同的 SSH 密钥，在进行 git 操作时，自动识别以及身份验证。

使用 `demo@domain.com` 和 `test@domain.com` 两个账号作为本次操作记录。

## 创建本地密钥 {#generate-key}

两个账户分别在本地创建密钥。

::: code-group

```bash [demo 账户]
# 创建密钥
> ssh-keygen -t ed25519 -C "demo@domain.com"
Generating public/private ed25519 key pair.
# 自定义密钥名称，方便区分账号信息
# Windows 为全路径
Enter file in which to save the key (C:\Users\Administrator/.ssh/id_ed25519): C:\Users\Administrator/.ssh/id_ed25519_demo
# 密钥密码，默认为空
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\Administrator/.ssh/id_ed25519_demo
Your public key has been saved in C:\Users\Administrator/.ssh/id_ed25519_demo.pub
The key fingerprint is:
SHA256:oYidentificationi2YIll9identificationMd82+M demo@domain.com
The key's randomart image is:
+--[ED25519 256]--+
|   . *.oSo. o    |
|       o    E    |
|                 |
|                 |
+----[SHA256]-----+
```

```bash [test 账户]
# 创建密钥
> ssh-keygen -t ed25519 -C "test@domain.com"
Generating public/private ed25519 key pair.
# 自定义密钥名称，方便区分账号信息
# Windows 为全路径
Enter file in which to save the key (C:\Users\Administrator/.ssh/id_ed25519): C:\Users\Administrator/.ssh/id_ed25519_test
# 密钥密码，默认为空
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\Administrator/.ssh/id_ed25519_test
Your public key has been saved in C:\Users\Administrator/.ssh/id_ed25519_test.pub
The key fingerprint is:
SHA256:oYidentificationi2YIll9identificationMd82+M test@domain.com
The key's randomart image is:
+--[ED25519 256]--+
|   . *.oSo. o    |
|       o    E    |
|                 |
|                 |
+----[SHA256]-----+
```

::: 

## 添加密钥 {#add-key-to-ssh-agent}

::: danger

在向 ssh-agent 添加新的 SSH 密钥之前，确保 ssh-agent 正在运行或者手动启动。

```bash
# ssh-agent 手动启动
# 请在 PowerShell 中进行操作
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

:::


```bash
# 添加密钥
ssh-add C:\Users\Administrator/.ssh/id_ed25519_demo
ssh-add C:\Users\Administrator/.ssh/id_ed25519_test
```

当出现 `Could not open a connection to your authentication agent.` 报错，请运行 `ssh-agent bash` 后，再次执行 `ssh-add` 命令。

```bash
ssh-agent bash

# 添加密钥
ssh-add C:\Users\Administrator/.ssh/id_ed25519_demo
ssh-add C:\Users\Administrator/.ssh/id_ed25519_test
```

## 配置主机别名 {#ssh-host-config}

在 `C:\Users\Administrator/.ssh/` 目录中新建 config 配置文件，增加下面代码配置 SSH Host 别名区分各自的账户

```ssh
Host demohost
  Hostname github.com
  IdentityFile=C:\Users\Administrator/.ssh/id_ed25519_demo
  PreferredAuthentications publickey

Host testhost
  Hostname github.com
  IdentityFile=C:\Users\Administrator/.ssh/id_ed25519_test
  PreferredAuthentications publickey
```

参数说明

- `Host diyname` - 设置别名 diyname
- `Hostname github.com` - 设置别名的主机地址 github.com
- `IdentityFile=/home/user/.ssh/key` - 设置别名私钥

::: tip
如果使用 HTTPS 443 端口的话，请查阅 Github 官方文档 [SSH 如何在 HTTPS 端口下使用 ](https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)
:::

## 添加公钥 {#add-pub-key}

登录 Github 账户，在 `Setting` > `SSH and GPG keys` 选项中添加本地以 `.pub` 结尾的公钥文件内容。

<!-- ![Github 账户添加 SSH 公钥](https://docs.github.com/assets/cb-45016/images/help/settings/userbar-account-settings-global-nav-update.png
 "Github 账户添加 SSH 公钥") -->

```bash
# 通过 clip 命令直接复制文件内容
clip < C:/Users/Administrator/.ssh/id_ed25519_demo.pub
```

```bash
# 手动操作
cat C:\Users\Administrator/.ssh/id_ed25519_demo.pub

# 复制显示的内容或者本地打开复制
SHA256:oYidentificationi2YIll9identificationMd82+M demo@domain.com
```

将上面复制的公钥文件内容添加保存到对应的 Github 账户中。

## 测试 SSH 连接 {#ssh-test}

```bash
ssh -T git@github.com

# hostname
# ssh -T git@diyname
ssh -T git@demohost
ssh -T git@testhost
```

出现用户名称的话，证明连接成功，可以正常进行 git 操作即可。

如果提示 `Host key verification failed.` 可能是本地 `known_hosts` 文件内容导致，清空文件内容尝试一下。如果长时间操作的结果都是提示认证失败，可以查看 [github 权限被拒绝文档](https://docs.github.com/zh/authentication/troubleshooting-ssh/error-permission-denied-publickey)。

::: tip
仓库 SSH 链接也可以使用 hostname 的方式。具体操作可查看配置主机别名步骤，使用方法可查看下一步中的 diyname 名称的使用。
:::

## 如何使用 {#usage}

```bash
# 命令格式
git clone git@diyname:OWNER/repo.git
```

- `diyname` 为 SSH Host 设置
- `OWNER` 为 Github 账户名称
- `repo` 为 Github 仓库名称

如拉取 Github demo 账户的 `demo-repo` 的仓库，命令为 `git clone git@demohost:demo/demo-repo.git`

```bash
# 官方仓库地址
git@github.com:demo/demo-repo.git

# 定义后的地址
git@demohost:demo/demo-repo.git
```

之后所有在本电脑上有关 Github 的操作命令中的 `git@github.com` 都需要使用 `git@diyname` 代替。

## 参考文档 {#references}

- [Github 文档 - 生成新 SSH 密钥](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
- [Github 文档 - 关于向 Githu 帐户添加 SSH 公共密钥](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [Github 文档 - 在一台服务器上使用多个仓库](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys)
