export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-[#050505] p-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="border-b border-white/6 pb-8">
          <div className="mb-4 flex items-center gap-3">
            <img src="/logo.svg" alt="Torop" className="h-16 w-16" />
            <h1 className="font-bold text-4xl text-[#F5F5F5]">
              SF Pro Display Font Test
            </h1>
          </div>
          <p className="text-[#A1A1AA]">
            This page tests all font weights and styles
          </p>
        </div>

        {/* Regular Weight */}
        <div className="space-y-4 rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            Regular (400)
          </div>
          <p className="text-sm text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="text-base text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="text-lg text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="text-xl text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="text-2xl text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>

        {/* Medium Weight */}
        <div className="space-y-4 rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            Medium (500)
          </div>
          <p className="font-medium text-sm text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-medium text-base text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-medium text-lg text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-medium text-xl text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-medium text-2xl text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>

        {/* Bold Weight */}
        <div className="space-y-4 rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            Bold (700)
          </div>
          <p className="font-bold text-sm text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-bold text-base text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-bold text-lg text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-bold text-xl text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-bold text-2xl text-[#F5F5F5]">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>

        {/* Hero Sizes */}
        <div className="space-y-8 rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            Hero Sizes
          </div>
          <h1 className="font-bold text-4xl leading-tight tracking-tight text-[#F5F5F5]">
            Product analytics that knows your data
          </h1>
          <h1 className="font-bold text-5xl leading-tight tracking-tight text-[#F5F5F5]">
            Product analytics that knows your data
          </h1>
          <h1 className="font-bold text-6xl leading-tight tracking-tight text-[#F5F5F5]">
            Product analytics that knows your data
          </h1>
        </div>

        {/* Mixed Weights */}
        <div className="space-y-4 rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            Mixed Weights in Paragraph
          </div>
          <p className="text-lg leading-relaxed text-[#F5F5F5]">
            This is <span className="font-medium">medium weight text</span> and
            this is <span className="font-bold">bold weight text</span> mixed
            with regular weight text. The font should transition smoothly
            between weights.
          </p>
        </div>

        {/* Color Variations */}
        <div className="space-y-4 rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            Color Variations
          </div>
          <p className="font-bold text-2xl text-[#F5F5F5]">
            Primary Text (#F5F5F5)
          </p>
          <p className="font-bold text-2xl text-[#A1A1AA]">
            Secondary Text (#A1A1AA)
          </p>
          <p className="font-bold text-2xl text-[#6366F1]">
            Accent Text (#6366F1)
          </p>
        </div>

        {/* Browser Info */}
        <div className="rounded-xl border border-white/6 bg-[#0B0B0F] p-8">
          <div className="mb-4 font-mono text-xs tracking-wider text-[#6366F1] uppercase">
            How to Verify
          </div>
          <ol className="list-decimal space-y-2 pl-5 text-[#A1A1AA]">
            <li>Open browser DevTools (F12)</li>
            <li>Go to Network tab</li>
            <li>Filter by "Font"</li>
            <li>Refresh this page</li>
            <li>
              You should see SFPRODISPLAYREGULAR.OTF, SFPRODISPLAYMEDIUM.OTF,
              and SFPRODISPLAYBOLD.OTF loading
            </li>
            <li>Right-click any text and select "Inspect"</li>
            <li>
              In Computed tab, check font-family should be "SF Pro Display"
            </li>
          </ol>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block rounded-lg bg-[#6366F1] px-6 py-3 font-medium text-white transition-all hover:bg-[#5558E3]"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
