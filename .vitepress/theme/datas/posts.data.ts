import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
  thumbnail: string | undefined
  type: string
  tag: string[]
  category: string[]
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  // excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        excerpt: frontmatter.excerpt,
        thumbnail: frontmatter.thumbnail ? toWpLink(frontmatter.thumbnail) : '/images/default_images.jpg',
        type: frontmatter.type,
        tag: frontmatter.tag,
        category: frontmatter.category,
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw) ?? '1970-01-01T00:00:00.000Z'
  date.setUTCHours(24)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }
}

function toWpLink(url: string): Post['thumbnail'] {
  const { host, hostname, pathname, protocol } = new URL(url)
  const isWpUrl = new RegExp(/^(i[1-3]\.wp\.com)$/).test(hostname)
  console.log({ host, hostname, pathname, protocol, isWpUrl})
  if (!isWpUrl) return `${protocol}//i2.wp.com/${host}${pathname}`
  return url
}
