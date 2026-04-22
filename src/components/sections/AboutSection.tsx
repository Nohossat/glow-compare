import { features } from '../../data/features'
import { FeatureCard } from '../ui/FeatureCard'

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="font-body text-sm uppercase tracking-widest text-primary-500 mb-4">
              Our Mission
            </p>
            <h2 className="font-heading text-5xl sm:text-6xl font-light text-gray-900 dark:text-white leading-tight mb-8">
              Why Ingredient Intelligence Matters
            </h2>
            <div className="space-y-5 font-body text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              <p>
                The Korean beauty industry produces thousands of serums, moisturizers, essences, and sheet masks every year — each with a unique formula. Choosing the right product isn't just about brand trust or influencer recommendations. It's about understanding what's actually inside the bottle and how it interacts with your skin.
              </p>
              <p>
                Glow Compare breaks down each product by its active ingredients, targeted skin concerns (hydration, brightening, anti-aging, pore-minimizing), skin type suitability, and real price-per-ml value. Because glowing skin deserves informed choices.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div className="text-center">
                <p className="font-heading text-4xl font-semibold text-primary-500">3,200+</p>
                <p className="font-body text-xs text-gray-500 dark:text-gray-400 mt-1">Products analyzed</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-dark-border" />
              <div className="text-center">
                <p className="font-heading text-4xl font-semibold text-primary-500">48</p>
                <p className="font-body text-xs text-gray-500 dark:text-gray-400 mt-1">Active ingredients tracked</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-dark-border" />
              <div className="text-center">
                <p className="font-heading text-4xl font-semibold text-primary-500">5</p>
                <p className="font-body text-xs text-gray-500 dark:text-gray-400 mt-1">Skin types matched</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary-200 dark:bg-secondary-600/20 rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-primary-100 dark:bg-primary-700/20 rounded-full blur-2xl opacity-60" />
            <img
              src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=900&q=85&fit=crop"
              alt="Elegant skincare serum dropper bottle on a marble surface with soft warm lighting"
              className="relative rounded-3xl w-full object-cover shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="font-body text-sm uppercase tracking-widest text-primary-500 mb-2 text-center">
            What We Compare
          </p>
          <h3 className="font-heading text-4xl sm:text-5xl font-light text-gray-900 dark:text-white text-center mb-14">
            Three Pillars of Smart Skincare
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
