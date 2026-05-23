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
        thumbnail: resolveThumbnail(frontmatter.thumbnail),
        type: frontmatter.type,
        tag: frontmatter.tag,
        category: frontmatter.category,
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string | Date): Post['date'] {
  const str = raw instanceof Date ? raw.toISOString() : String(raw ?? '')
  const match = str.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (!match) {
    return { time: 0, string: '1970-01-01' }
  }
  const date = new Date(str)
  return {
    time: isNaN(date.getTime()) ? 0 : date.getTime(),
    string: `${match[1]}-${match[2]}-${match[3]}`
  }
}

function resolveThumbnail(thumbnail: string | undefined): Post['thumbnail'] {
  const DEFAULT_THUMBNAIL = '/images/default_images.jpg'
  if (!thumbnail) return DEFAULT_THUMBNAIL
  if (thumbnail.startsWith('/')) return thumbnail
  return toWpLink(thumbnail)
}

function toWpLink(url: string): Post['thumbnail'] {
  const { host, hostname, pathname, protocol } = new URL(url)
  const isWpUrl = new RegExp(/^(i[1-3]\.wp\.com)$/).test(hostname)
  if (!isWpUrl) return `${protocol}//i${Math.floor(Math.random() * 3) + 1}.wp.com/${host}${pathname}`
  return url
}
