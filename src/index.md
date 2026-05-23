---
layout: page
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../.vitepress/theme/datas/posts.data'
</script>

<style>
.article {
  @apply flex flex-col pb-8;
}

.article-thumbnail,
.article-thumbnail img {
  @apply relative flex items-center justify-center overflow-hidden rounded-2xl shadow-md aspect-[2/1];
}

.article-thumbnail img {
  @apply absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105;
}

.article-details {
  @apply flex flex-col gap-1.5 mt-5;
}

.article-title {
  @apply line-clamp-2 leading-snug font-semibold transition-colors text-xl;
}

.article-excerpt {
  @apply line-clamp-2 text-sm;
}

.article-meta {
  @apply mt-1 flex items-center gap-2 text-sm;
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
</style>
<div class="container mx-auto px-5 py-10 lg:p-12">
  <section class="mb-14 grid gap-8 md:grid-cols-3">
    <article class="article group" v-for="post in posts" :key="post.url">
      <div class="article-thumbnail">
        <a :href="withBase(post.url)">
          <img :src="withBase(post.thumbnail)" loading="lazy" :alt="post.title" class="group-hover:scale-105">
        </a>
      </div>
      <div class="article-details"> 
        <h2 class="article-title"><a :href="withBase(post.url)">{{ post.title }}</a></h2>
        <p class="article-excerpt">{{ post.excerpt }}</p>
        <footer class="article-meta">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path><circle cx="18" cy="18" r="4"></circle><path d="M15 3v4"></path><path d="M7 3v4"></path><path d="M3 11h16"></path><path d="M18 16.496v1.504l1 1"></path></svg>
            <time class="article-published">{{ post.date.string }}</time>
          </div>
        </footer>
      </div>
    </article>
  </section>
</div>
