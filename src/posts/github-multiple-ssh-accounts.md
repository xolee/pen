---
title: 在一台电脑中配置多个账号 Github SSH 密钥
date: 2024-04-19
thumbnail: https://pic3.58cdn.com.cn/nowater/webim/big/n_v2511f226674b14662b176d151a32ad064.png
excerpt: 配置多个 Github 账户 SSH 密钥，上传时自动验证并推送修改代码。
tags:
  - Github
  - SSH
---

# {{ $frontmatter.title }}

在一台电脑中配置多个 Github 账户 SSH 密钥，`git push` 上传时自动验证并推送修改代码。使用 `demo@domain.com` 和 `test@domain.com` 两个账号作为本次操作记录。

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

::: danger 省略该步骤操作
在后面配置 SSH Host 后，可省略该步骤操作。我这里只作为记录。
:::

在向 ssh-agent 添加新的 SSH 密钥之前，确保 ssh-agent 正在运行或者手动启动。

```bash
# ssh-agent 手动启动
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

```bash
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
cat C:\Users\Administrator/.ssh/id_ed25519_demo

# 复制显示的内容或者本地打开复制
SHA256:oYidentificationi2YIll9identificationMd82+M demo@domain.com
```

将上面复制的公钥文件内容添加保存到对应的 Github 账户中。

<!-- ## 测试连接 {#github-test}

```bash
ssh -T git@github.com
Hi Demo! You've successfully authenticated, but GitHub does not provide shell access.
```

出现用户名称的话，证明连接成功，可以正常进行 git 操作即可。 -->

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
