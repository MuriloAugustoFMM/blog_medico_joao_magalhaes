'use client'

import { useState } from 'react'
import Link from 'next/link'

type ArticleCard = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
}

type VideoCard = {
  id: string
  slug: string
  title: string
  duration: string
  views?: string
  date: string
  thumbnail: string
}

export default function ContentGrid({
  articles,
  videos,
}: {
  articles: ArticleCard[]
  videos: VideoCard[]
}) {
  const [activeTab, setActiveTab] = useState<'artigos' | 'videos'>('artigos')

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
        <div>
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-teal mb-3">Conteúdo educacional</p>
          <h2 className="font-serif text-4xl font-semibold text-navy">Artigos e vídeos gratuitos</h2>
        </div>
        <div className="flex gap-0 bg-bg border border-border self-start">
          {(['artigos', 'videos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-navy text-white' : 'text-slate hover:text-navy'
              }`}
            >
              {tab === 'artigos' ? 'Artigos' : 'Vídeos'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'artigos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.length === 0 && (
            <p className="text-slate col-span-3">Nenhum artigo publicado ainda.</p>
          )}
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group cursor-pointer">
              <div className="overflow-hidden bg-blue mb-5" style={{ aspectRatio: '16/10' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-medium text-teal uppercase tracking-wider">{article.category}</span>
                <span className="text-[#D4D9DF]">·</span>
                <span className="text-xs text-slate">{article.readTime} leitura</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy leading-snug mb-3 group-hover:text-teal transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-slate leading-relaxed mb-4">{article.excerpt}</p>
              <p className="text-xs text-[#9BA8B5]">{article.date}</p>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.length === 0 && (
            <p className="text-slate col-span-3">Nenhum vídeo publicado ainda.</p>
          )}
          {videos.map((video) => (
            <Link key={video.id} href={`/videos/${video.slug}`} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-navy mb-5" style={{ aspectRatio: '16/9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <div
                      className="w-0 h-0 ml-1"
                      style={{
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderLeft: '14px solid #1B3A52',
                      }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs px-2 py-1 font-mono">
                  {video.duration}
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy leading-snug mb-3 group-hover:text-teal transition-colors">
                {video.title}
              </h3>
              <div className="flex gap-3 text-xs text-[#9BA8B5]">
                {video.views && <span>{video.views} visualizações</span>}
                {video.views && <span>·</span>}
                <span>{video.date}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-14 text-center border-t border-border pt-10">
        <Link
          href="/blog"
          className="inline-block border border-navy text-navy px-9 py-3.5 text-sm font-medium hover:bg-bg transition-colors"
        >
          Ver todos os conteúdos
        </Link>
      </div>
    </>
  )
}
