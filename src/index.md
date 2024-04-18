---
layout: page
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../.vitepress/theme/datas/posts.data'
</script>

<style>
.article {
  @apply shadow-md rounded-md;
}

.article-thumbnail,
.article-thumbnail img {
  @apply rounded-t-md bg-gray-200 aspect-ratio-video;
}

.article-thumbnail img {
  @apply items-center justify-center w-full h-full object-cover;
}

.article-details {
  @apply p-5 space-y-4;
}

.article-title {
  @apply text-3xl font-bold mb-4;
}

.article-subtitle {
  @apply text-xl mb-2;
}

.article-meta {
  @apply flex ju items-center mb-4;
}

.article-meta {
  @apply flex items-center gap-x-3 text-gray-400;
}

.article-meta>div {
  @apply inline-flex items-center gap-x-1;
}

.article-meta>div svg {
  @apply w-6 h-6;
}

@screen xl {
} 
</style>
<div class="container mx-auto p-x-5 p-y-10 lg:p-12  space-y-6">
  <section class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-10">
    <article class="article" v-for="post in posts" :key="post.url">
      <div class="article-thumbnail">
        <a :href="withBase(post.url)">
          <img :src="withBase(post.thumbnail)" loading="lazy" :alt="post.title">
        </a>
      </div>
      <div class="article-details"> 
        <h2 class="article-title"><a :href="withBase(post.url)">{{ post.title }}</a></h2>
        <p class="article-subtitle">{{ post.excerpt }}</p>
        <footer class="article-meta">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path><circle cx="18" cy="18" r="4"></circle><path d="M15 3v4"></path><path d="M7 3v4"></path><path d="M3 11h16"></path><path d="M18 16.496v1.504l1 1"></path></svg>
            <time class="article-published">{{ post.date.string }}</time>
          </div>
          <!-- <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 15"></polyline></svg>
            <time class="article-reading">1 分钟</time>
          </div> -->
        </footer>
      </div>
    </article>
  </section>
</div>
