import { testimonials } from '../../data/testimonials'
import { TestimonialCard } from '../ui/TestimonialCard'

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-primary-50 dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-widest text-primary-500 mb-4">
            User Stories
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl font-light text-gray-900 dark:text-white mb-5">
            Real Skin. Real Results.
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            How K-beauty fans used Glow Compare to finally find the right routine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-16 text-center p-10 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border">
          <p className="font-heading text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4 italic">
            "Stop guessing. Start glowing."
          </p>
          <p className="font-body text-gray-500 dark:text-gray-400 mb-8">
            Join thousands of skincare enthusiasts making smarter K-beauty choices.
          </p>
          <a
            href="#compare"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-500 hover:bg-primary-700 text-white font-body font-semibold text-sm transition-colors duration-200"
          >
            Compare Products Now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
