export function HeroSection() {
  return (
    <section
      id="compare"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <img
        src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1920&q=90&fit=crop"
        alt="A flat lay of various Korean beauty skincare products including face creams, serums, and a jade roller"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest text-primary-300 mb-4">
          K-Beauty Intelligence
        </p>
        <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-none mb-6">
          Decode Every Drop.
        </h1>
        <p className="font-body text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Compare Korean beauty products by ingredients, skin type compatibility, effects, and price — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-500 hover:bg-primary-300 text-white font-body font-semibold text-sm transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Comparing
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#reviews"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors duration-200"
          >
            See Reviews
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
