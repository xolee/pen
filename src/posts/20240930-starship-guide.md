---
title: Windows 使用 Starship 配置 PowerShell 和 Cmder 终端
date: 2024-09-30 08:00:00
thumbnail: https://pic3.58cdn.com.cn/nowater/webim/big/n_v2b09ae59e175a4e67acbda1da73fd03d6.jpg
excerpt: 通过使用 Starship 来增强美化 PowerShell 和 Cmder 终端。
tags: 
  - Windows
  - Terminal
  - 软件
---

# {{ $frontmatter.title }}

<img
  src="https://i2.wp.com/raw.githubusercontent.com/starship/starship/master/media/demo.gif"
  alt="使用 iTerm 和 Snazzy 主题的 Starship"
  align="justify"
 />



## 步骤 1： 安装 Starship

在 Starship 的 Github Releases 发布页面中下载 Window 对应的 MSI 软件包。

## 步骤 2： 设置终端配置

配置你的终端来初始化 starship。 请从下面列表选择你的终端：

<details>
<summary>Cmd</summary>

::: danger
我本地使用的是 laragon 环境自带的 cmder，所以可能与自行下载安装的方式的配置目录不太一样，仅供参考。
:::

1. 下载 [Clink](https://chrisant996.github.io/clink/clink.html) 或者前往 [Clink Releases Page](https://github.com/chrisant996/clink/releases)

1. 在 `laragon\bin\cmder\config` 目录中新建 `starship.lua` 文件，并将以下代码写入文件中。

```bash
load(io.popen('starship init cmd'):read("*a"))()
```

3. 重启 Cmder 终端即可。

</details>

<details>
<summary>PowerShell</summary>

通过在 PowerShell 运行 `$PROFILE` 来获取当前用户配置文件的路径。将 `Invoke-Expression (&starship init powershell)` 写入配置文件中即可。

```powershell
# 以下命令如果配置文件脚本文件和它们所属的目录不存在
# 创建“当前用户，当前主机”配置文件脚本文件
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }

echo Invoke-Expression (&starship init powershell) > $PROFILE
```
</details>

## 步骤 3： 设置 Starship 配置

打开一个新的 Shell 实例，你应该就能看到漂亮的 Shell 新提示符了。 如果你对默认配置感到满意，那么开始使用吧！

如果你想进一步配置 Starship，查阅下列内容：

- **[配置](https://starship.rs/config/)**：学习如何配置 Starship 来调节提示符到你喜欢的样子。

- **[预设](https://starship.rs/presets/)**：从其他构建好的配置中获取灵感。


## 参考文档 {#references}

- [Starship 官网](https://starship.rs)
- [Starship Github Releases](https://github.com/starship/starship/releases)
- [Clink Github Releases](https://github.com/chrisant996/clink/releases)
