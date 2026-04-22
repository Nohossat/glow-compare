import type { Testimonial } from '../../data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-secondary-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-700"
          loading="lazy"
        />
        <div>
          <p className="font-heading text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-gray-500 dark:text-gray-400">{testimonial.location}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
      <p className="font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
        "{testimonial.text}"
      </p>
      <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-body font-medium bg-secondary-200 text-secondary-600 dark:bg-secondary-600/20 dark:text-secondary-300">
        {testimonial.product}
      </span>
    </div>
  )
}
