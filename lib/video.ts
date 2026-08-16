export function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1)
    }

    if (
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'm.youtube.com'
    ) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v')
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2]
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2]
      }
    }

    return null
  } catch {
    return null
  }
}

export function getVideoEmbedUrl(
  url: string,
  provider: string
) {
  try {
    const parsed = new URL(url)

    if (provider === 'YOUTUBE') {
      let videoId = ''

      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.slice(1)
      } else {
        videoId = parsed.searchParams.get('v') ?? ''
      }

      if (!videoId) return null

      return `https://www.youtube.com/embed/${videoId}`
    }

    if (provider === 'VIMEO') {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop()

      if (!videoId) return null

      return `https://player.vimeo.com/video/${videoId}`
    }

    return url
  } catch {
    return null
  }
}