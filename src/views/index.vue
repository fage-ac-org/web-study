<template>
  <div class="blog-home">
    <header class="blog-header">
      <h1>我的博客</h1>
      <p>欢迎来到我的博客首页！</p>
    </header>
    <main>
      <section class="blog-list">
        <article v-for="post in posts" :key="post.id" class="blog-post">
          <h2>{{ post.title }}</h2>
          <p class="meta">作者：{{ post.author }} | 日期：{{ post.date }}</p>
          <p class="summary">{{ post.summary }}</p>
          <a :href="`/post/${post.id}`" class="read-more">阅读全文</a>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'Vue3 入门教程',
    author: '张三',
    date: '2024-06-01',
    summary: '本文介绍了如何使用 Vue3 创建你的第一个应用。'
  },
  {
    id: 2,
    title: '组件通信详解',
    author: '李四',
    date: '2024-06-05',
    summary: '深入讲解了 Vue3 组件之间的多种通信方式。'
  },
  {
    id: 3,
    title: 'Vue3 响应式原理',
    author: '王五',
    date: '2024-06-10',
    summary: '带你了解 Vue3 响应式系统的底层实现。'
  }
])
</script>

<style scoped>
.blog-home {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.blog-header {
  text-align: center;
  margin-bottom: 32px;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.blog-post {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.blog-post:last-child {
  border-bottom: none;
}
.meta {
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
}
.summary {
  margin-bottom: 8px;
}
.read-more {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}
.read-more:hover {
  text-decoration: underline;
}
</style>
