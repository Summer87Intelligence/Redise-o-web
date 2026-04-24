interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
  accentTitle?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  accentTitle,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-5 ${
            centered ? 'mx-auto' : ''
          }`}
        >
          <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
          <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight text-balance">
        {title}
        {accentTitle && (
          <>
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {accentTitle}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg text-[#8B949E] leading-relaxed ${
            centered ? 'max-w-2xl mx-auto' : 'max-w-xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
