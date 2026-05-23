---
title: Ubuntu APT Source 软件源完全指南：规则解读与第三方源替换
date: 2026-05-21 10:00:00
thumbnail: https://wmimg.com/i/1277/2026/05/6a1167ebe1265.jpg
excerpt: 详解 Ubuntu 24.04+ 软件源配置详解，并如何将默认源替换为清华镜像源，以及恢复官方源的方法。
tags: 
  - Ubuntu
  - Linux
---

# {{ $frontmatter.title }}

在使用 Ubuntu 的过程中，**软件源** 扮演着至关重要的角色。它决定了你的系统从哪里获取软件包、更新和安全补丁。本文将带你深入理解 Ubuntu 24.04 及以上版本采用的 **DEB822 格式** 软件源配置规则，并手把手教你如何将默认源替换为速度更快的国内镜像源（以清华大学镜像站为例）。

## 一、什么是软件源（APT Source） {#what-is-apt-source}

软件源就是一个存储了大量 `.deb` 软件包和元数据的网络服务器。`apt` 命令通过读取 `/etc/apt/sources.list` 或 `/etc/apt/sources.list.d/` 下的配置文件，知道去哪里下载软件、解决依赖、执行更新。

从 Ubuntu 24.04 LTS (Noble Numbat) 开始，系统推荐使用 **DEB822 格式**（多行键值对），而不是传统的单行 `deb` 格式。旧格式依然兼容，但新格式更清晰、更易管理。

## 二、DEB822 格式详解 {#deb822-format}

一个典型的 DEB822 源配置文件内容如下（这是 Ubuntu 官方源的配置）：

```bash
Types: deb
URIs: http://archive.ubuntu.com/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

## Ubuntu security updates
Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

| 字段 | 解释 |
| :--- | :--- |
| **Types** | 软件包类型。<br>**deb** 表示二进制包；<br>**deb-src** 表示源代码包，可同时写多个（空格分隔）。 |
| **URIs** | 仓库的访问地址（可多个）。APT 会从该 URL 下载 `Packages.gz` 等索引文件。 |
| **Suites** | 发行版代号及其更新通道。常见的有：<br>**noble**（基础发行版）、<br>**noble-updates**（常规 bug 和功能更新）、<br>**noble-backports**（回溯的新版本软件，风险稍高）、<br>**noble-security**（仅安全更新，独立通道）。 |
| **Components** | 软件包分类。Ubuntu 分为四类：<br>**main**（官方支持的自由软件）、<br>**restricted**（非自由但仍支持的软件，如驱动）、<br>**universe**（社区维护的自由软件）、<br>**multiverse**（非自由且官方不支持的软件）。 |
| **Signed-By** | 验证仓库签名的 GPG 密钥环路径。这保证了下载的包未被篡改。 |

## 三、配置文件存放规则 {#gui-method}

Ubuntu 使用两种位置存放源配置：

1. **传统文件**：`/etc/apt/sources.list`（通常单行格式）
2. **碎片化目录**：`/etc/apt/sources.list.d/`（推荐）

### `sources.list.d/` 目录规则

- 该目录下的 **所有 `.list` 或 `.sources` 后缀的文件** 都会被 APT 读取。
- 其他后缀（如 `.bak`、`.old`）会被**忽略**。
- 文件名可以任意命名，只要后缀正确即可，例如：
  - `ubuntu.tsinghua.sources` ✅
  - `my-mirror.list` ✅
  - `ubuntu.sources.backup` ❌ (后缀错误，不生效)
- 多文件共存时，APT 会**合并**所有源。如果同一个 Suite 出现在两个不同的文件里，APT 会同时使用它们（可能导致重复拉取索引，但不影响功能）。

> **最佳实践**：为每个第三方源单独创建一个 `.sources` 文件，并在原官方文件名后加 `.bak` 来禁用它，而不是直接删除。

---

## 四、实战：将默认源替换为清华源 {#replace-with-tsinghua}

清华大学开源软件镜像站 `mirrors.tuna.tsinghua.edu.cn` 是国内速度很快的 Ubuntu 源。下面演示如何优雅地完成替换。

### 步骤 1：备份并禁用官方源

```bash
sudo mv /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
```
将原官方配置文件重命名（后缀从 .sources 变为 .sources.bak），APT 不再读取它。这相当于安全备份，随时可恢复。


### 步骤 2：创建清华源配置文件

使用 tee 命令直接写入 /etc/apt/sources.list.d/ubuntu.tsinghua.sources

```
sudo tee /etc/apt/sources.list.d/ubuntu.tsinghua.sources << 'EOF'
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

## Ubuntu security updates
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
EOF
```

### 步骤 3：更新 APT 索引

```
sudo apt update
```

### 步骤 4（可选）：验证当前源

```
sudo apt policy
```

## 五、如何恢复官方源 {#restore-official-source}

```
# 删除清华源配置文件
sudo rm /etc/apt/sources.list.d/ubuntu.tsinghua.sources

# 恢复官方源配置（把备份改回来）
sudo mv /etc/apt/sources.list.d/ubuntu.sources.bak /etc/apt/sources.list.d/ubuntu.sources

# 再次更新
sudo apt update
```

## 六、常见注意事项 {#common-notes}

1. **后缀名是“死线”**  
   放在 `/etc/apt/sources.list.d/` 下的文件，**必须**以 `.sources` 或 `.list` 结尾，否则 APT 完全无视。不要自作主张取名 `ubuntu.sources.tsinghua`。

1. **不要同时保留两个相同 Suite 的源**  
   如果官方源和清华源的 `.sources` 文件都存在于目录中，APT 会**同时使用两者**，虽然不会报错，但会重复下载索引，浪费时间和流量。建议仅保留一个活动源。

1. **安全签名不可省略**  
   `Signed-By` 字段必须正确指向 Ubuntu 官方 GPG 密钥，否则 `apt update` 会报 `NO_PUBKEY` 错误。如果你从非官方源安装软件（如 Docker、NodeSource），需要额外导入它们自己的密钥。

1. **时间同步问题**  
   如果系统时间不准，GPG 签名验证可能失败（显示“签名过期”）。安装 `ntpdate` 并同步时间即可：
   ```bash
   sudo apt install ntpdate
   sudo ntpdate cn.pool.ntp.org
   ```

## 七、总结 {#summary}

| 知识点 | 要点 |
| :--- | :--- |
| **配置格式** | Ubuntu 24.04+ 推荐使用 DEB822（多段落 `Types: deb ...`） |
| **存放目录** | `/etc/apt/sources.list.d/` + 正确后缀 `.sources` 或 `.list` |
| **核心字段** | `Types` / `URIs` / `Suites` / `Components` / `Signed-By` |
| **替换第三方源** | 备份官方文件 → 创建新文件 → `apt update` |
| **恢复方法** | 删除第三方文件 → 还原备份 → 再次 `update` |

掌握软件源的管理，不仅能让你获得更快的下载速度，还能灵活添加第三方仓库，大大扩展 Ubuntu 的能力。希望本文能帮助你在今后的使用中更加得心应手！