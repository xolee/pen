---
title: Laragon 开发环境笔记
date: 2025-08-17 12:00:00
thumbnail: https://wmimg.com/i/1277/2025/08/68a2028ca26d8.jpg
excerpt: Laragon 开发环境笔记。
tags:
  - Laragon
  - PHP
  - Laravel
  - 软件
---

# {{ $frontmatter.title }}

[![Laragon - Windows 下 PHP/Laravel 开发环境](/uploads/202410/laragon.jpg)](/uploads/202410/laragon.jpg)

## MySQL {#mysql}

<details>
<summary>修改 MySQL 密码</summary>

Laragon 中 MySQL 默认密码为空。使用空密码打开 HeidiSQL 后，运行下面的代码：

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
```

重启 HeidiSQL 即可，使用新密码登录。

或者在终端工具中使用命令语句修改

```
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

</details>

## 版本下载 {#download}

```json
{
  "archives": {
    "mysql": "https://dev.mysql.com/downloads/mysql/",
    "php": "https://windows.php.net/download/",
  }
}
```

## 参考文档 {#references}
