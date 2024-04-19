---
title: 在 Git 中创建一个空分支（孤立分支）
date: 2024-02-01 00:00:00
thumbnail: https://pic.ziyuan.wang/user/agobox/2024/04/yancy-min-842ofHC6MaI-unsplash_675e8e0de2296.jpg
excerpt: 在 Git 中创建一个空分支（孤立分支）
tags: 
  - git
---

# {{ $frontmatter.title }}

## 效果 {#effect}

我现在想在 `demo` 仓库里创建一个 `pages` 分支专门用来存放演示文件，而且我不想让这个分支包含任何历史提交。

## 使用方法 {#usage}
 
### 步骤 1：创建分支 {#step-1}

使用 `git checkout -b` 命令创建的分支是有父节点的，这意味着新的分支包含了历史提交，所以我们需要使用 `git checkout --orphan` 命令，创建孤立分支。

```shell
git checkout --orphan pages

=== Output ===
Switched to a new branch 'pages'
```

### 步骤 2：清空内容 {#step-2}

使用 `git checkout --orphan` 创建的分支会把原分支的内容拷贝过来，因为要创建空分支，所以需要使用 `git rm -rf .` 来清除拷贝的内容。

```shell
# 查看状态可以发现，原分支的文件被复制并添加了
git status

=== Output ===
On branch pages

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   .vitepress/config.mts
        new file:   .vitepress/theme/index.ts
        new file:   .vitepress/theme/style.css
        new file:   package.json
        new file:   pnpm-lock.yaml
        new file:   src/index.md
        new file:   src/posts/cz-git.md

# 删除所有文件
git rm -rf .

=== Output ===
rm '.gitignore'
rm '.vitepress/config.mts'
rm '.vitepress/theme/index.ts'
rm '.vitepress/theme/style.css'
rm 'package.json'
rm 'pnpm-lock.yaml'
rm 'src/index.md'
rm 'src/posts/cz-git.md'

# 再次查看
git status

=== Output ===
On branch pages

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

### 步骤 3：初始化分支 {#step-3}

如果空分支没有任何文件被提交的话，使用 `git branch` 是看不到空分支的，创建一个 `README.md` 文件来描述这个分支。提交后，再使用 `git branch` 就能看到我创建的空分支 `pages` 了。

```shell{20}
# 未提交孤立分支前
git branch -a

=== Output ===
  master
  post
  remotes/origin/post

# 添加文件（README.md）到暂存区
git add .

# 提交
git commit -m "add README.md"

# 再次查看
git branch -a

=== Output ===
  master
* pages
  post
  remotes/origin/post
```

### 步骤 4：提交到远程分支 {#step-4}

```shell
# 提交
git push origin pages

=== Output ===
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Delta compression using up to 4 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 485 bytes | 485.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Powered by GITEE.COM [GNK-6.4]
remote: Create a pull request for 'pages' on Gitee by visiting:
remote:     https://gitee.com/xolee/pen/pull/new/xolee:pages...xolee:post
To https://gitee.com/xolee/pen.git
 * [new branch]      pages -> pages

# 提交孤立分支后
git branch -a

=== Output ===
  emoji
  master
* pages
  post
  remotes/origin/pages
  remotes/origin/post
 ```
 