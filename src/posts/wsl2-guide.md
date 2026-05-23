---
title: 开发者必备：Windows 10/11 WSL2 安装与使用教程
date: 2026-05-17 10:00:00
thumbnail: https://wmimg.com/i/1277/2026/05/6a09d934d695e.jpg
excerpt: 详细介绍在 Windows 10/11 上安装和配置 WSL2 的完整流程，以及常用的 WSL 实例管理命令。
tags: 
  - 软件
  - WSL
  - Ubuntu
  - Linux
---

# {{ $frontmatter.title }}

![开发者必备：Windows 10/11 WSL2 安装与使用教程（Ubuntu 24.04）](/public/uploads/202410/wsl2-guide-with-ubuntu.jpg)

## 前置准备 {#prerequisites}

在安装 WSL2 之前，需要先启用 Windows 的两项必要功能，开启 适用于 Linux 的 Windows 子系统(WSL)与虚拟机平台功能。

### 图形界面操作（推荐） {#gui-method}

1. 按下键盘上的 `Win + R` 组合键，在弹出的运行框中输入 `optionalfeatures`，然后点击“确定”或按回车，打开 **Windows 功能** 窗口。

2. 在 **Windows 功能** 窗口中，找到并勾选以下两项（请仔细核对，不要遗漏）：
   - `适用于 Linux 的 Windows 子系统`
   - `虚拟机平台`

3. 点击窗口右下角的 **确定** 按钮，系统将自动安装所选功能。

4. 安装完成后，系统会弹出提示 **需要重启电脑才能生效**。请点击 **立即重启**，让更改生效。**务必执行重启**，否则后续的 WSL 安装步骤会失败。

![开发者必备：Windows 10/11 WSL2 安装与使用教程（Ubuntu 24.04）](/public/uploads/202410/windows-add-feat.png)

## 升级 WSL 内核 {#upgrade-wsl}

由于国内 Windows 系统版本较多，自带的 WSL 可能不是最新版。建议先将 WSL 升级到最新版本，以获得更好的兼容性和性能。

- 前往微软官方 GitHub 仓库下载最新安装包：  
  https://github.com/microsoft/WSL/releases
- 下载 `wsl.2.x.x.x.x64.msi` 双击安装即可。

安装完成后，重新打开命令提示符或 PowerShell，输入 `wsl --version` 可查看当前版本。

## 安装镜像 {#install-image}

我们将安装 Ubuntu 24.04 为例，有两种常用方法：**直接在线安装** 和 **手动下载镜像导入**。

在线安装简单，但可能受网络影响。如果在线安装卡住，可以尝试手动导入。

### 方法一：在线安装 {#online-install}

首先查看可安装的发行版列表：

```
> wsl --list --online
```

输出示例：

```
NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Ubuntu-24.04                    Ubuntu 24.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
...
```

选择你想要的分发版（例如 Ubuntu 24.04），执行安装命令：

```
> wsl --install -d Ubuntu-24.04
```

系统会自动下载、安装，并提示创建用户名和密码。稍等片刻即可完成。

### 方法二：手动下载镜像并导入 {#manual-import}

如果你在执行 `wsl --install -d` 后进度条一直显示 **0%**，多半是网络问题。此时可以手动下载 WSL 镜像文件，然后导入。

1. 访问 Ubuntu 官方 WSL 镜像下载页面：  
   https://ubuntu.com/download/wsl  
   找到类似 `ubuntu-24.04.4-wsl-amd64.wsl` 或者 `Intel or AMD 64-bit` or `ARM 64-bit` 符合自己平台版本描述的文件并下载。

2. 打开终端，进入下载目录，执行导入命令：
   ```
   > cd D:\Backup\Downloads
   > wsl --install --from-file Ubuntu-24.04
   ```

首次启动时，系统会提示你创建默认的 Linux 用户（如 `ubuntu`）并设置密码：

```
Create a default Unix user account: ubuntu
New password:
Retype new password:
passwd: password updated successfully
```

按提示输入即可。之后每次进入 WSL 都会自动使用该用户登录。

## 管理 WSL 实例 {#manage-wsl}

安装完成后，可以通过以下命令查看所有已安装的发行版及其运行状态和 WSL 版本：

```
> wsl -l -v
```

输出示例：

```
  NAME            STATE           VERSION
* Ubuntu-24.04    Running         2
```

星号 `*` 表示默认发行版。要启动指定发行版，使用：

```
> wsl -d Ubuntu-24.04
```

如果想将某个发行版设置为默认，执行：

```
> wsl --set-default Ubuntu-24.04
```

## 参考文档 {#reference}

- [如何使用 WSL 在 Windows 上安装 Linux - Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/install)
- [在 WSL 2 上安装 Ubuntu - Ubuntu 官方文档](https://documentation.ubuntu.com/wsl/latest/howto/install-ubuntu-wsl2/)
- [Windows Subsystem for Linux 文档 - Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/)
