import React from 'react'

type YouTubeEmbedProps = {
  videoId: string
  title?: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  start?: number
}

/**
 * Responsive YouTube embed using youtube-nocookie.com
 * - Prevents Error 153 with proper CSP headers
 * - Works in production builds (Vercel, Codespace, etc.)
 * - Maintains 16:9 aspect ratio
 * - Full HTTPS support
 */
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'YouTube video',
  className = '',
  autoplay = false,
  muted = false,
  start,
}) => {
  if (!videoId) return null

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })

  if (autoplay) params.append('autoplay', '1')
  if (muted) params.append('mute', '1')
  if (start) params.append('start', String(start))

  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        backgroundColor: '#000',
      }}
    >
      <iframe
        src={embedUrl}
        title={title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

export default YouTubeEmbed
