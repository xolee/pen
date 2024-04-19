---
title: 在 VitePress 中安装使用 Unocss
date: 2024-04-12
thumbnail: https://i1.wp.com/s2.loli.net/2024/04/19/HYXGltehAk8aD3n.jpg
excerpt: 在 VitePress 中安装使用 Unocss，实现自动引入样式文件，并使用 Unocss 提供的样式。
tag:
  - vue
  - vitepress
  - unocss
---

# {{ $frontmatter.title }}

## 安装 {#install}

```bash
pnpm add -D unocss
```

## 配置 {#configure}

在 `.vitepress/config.mts` 中添加 `UnoCSS` 插件。

```ts{3,7-10}
// .vitepress/config.mts
import { defineConfig } from "vitepress";
import UnoCSS from 'unocss/vite'

export default defineConfig({
  ...
  vite: {
    plugins: [
      UnoCSS(),
    ],
  }
});
```
在根目录添加 `UnoCSS` 配置文件 `uno.config.ts`。

```ts
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography(),
  ],
  transformers: [
    // Usage @apply, @screen and theme()
    // https://unocss.dev/transformers/directives
    transformerDirectives(),
  ],
})
```

## 添加样式文件 {#add-style-files}

在 `.vitepress/theme/index.ts` 中引入 `UnoCSS` 样式。

```ts{5}
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'uno.css' // [!code ++]

export default {
  ...
} satisfies Theme
```

之后就可以在 `.md`、`.vue`、 `.css` 文件中使用 `UnoCSS` 提供的样式了。

::: code-group


```md
<!-- post.md -->
<style>
.custom-class {
  bg-red-500;
}
</style>
```

```Vue
<!-- .vitepress/theme/Layout.vue -->
<template>
  <div class="custom-class">Hello UnoCSS!</div>
</template>
```

```css
/* .vitepress/theme/style.css */
.custom-class {
  bg-red-500;
}
```

:::

## 参考文档 {#reference}

- [UnoCSS 官方文档](https://unocss.dev/integrations/vite)
