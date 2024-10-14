---
title: SSH 协议下 Scp 命令进行文件传输指令说明
date: 2024-10-14 10:00:00
thumbnail: https://pic3.58cdn.com.cn/nowater/webim/big/n_v2987946761b0545d583478f0dd6c75c5c.jpg
excerpt: 基于 SSH 协议下，用于在本地和远程服务器之间安全地传输文件的工具。
tags: 
  - SSH
  - Linux
---

# {{ $frontmatter.title }}

scp（Secure Copy）是一个基于 SSH 协议的文件传输工具，它可以在本地服务器和远程服务器之间安全地传输文件以及文件夹。

## 下载 {#download}

```shell
scp -P 22 -r username@remote_host:/path/to/remote/file /path/to/local/destination
```

命令参数说明：

1. `-P` 端口 `-r` 递归
1. `username` 是远程服务器的用户名
1. `remote_host` 是远程服务器的主机名或 IP 地址
1. `/path/to/remote/file` 是远程服务器上要下载的文件的路径
1. `/path/to/local/destination` 是本地服务器上存放下载文件的路径，可以是相对路径或绝对路径

执行上述命令后，会要求输入远程服务器的密码。输入正确的密码后，文件就会被下载到本地服务器上的指定路径。

```shell
# demo.php 文件复制到本地
scp -P 22 -r ubuntu@127.0.0.1:/home/wwwroot/laravel/demo.php D:\Backup\Downloads
```

## 上传 {#upload}

```shell
scp -P 22 -r /path/to/local/file username@remote_host:/path/to/remote/destination
```

命令参数说明：

1. `-P` 端口 `-r` 递归
1. `/path/to/local/file` 是本地需上传文件的路径，可以是相对路径或绝对路径
1. `username` 是远程服务器的用户名
1. `remote_host` 是远程服务器的主机名或 IP 地址
1. `/path/to/remote/destination` 是远程服务器上存放上传文件的路径
