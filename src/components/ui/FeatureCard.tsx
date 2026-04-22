import type { Feature } from '../../data/features'

interface FeatureCardProps {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="h-48 overflow-hidden">
        <img
          src={feature.image}
          alt={feature.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-6 border-l-4 border-primary-500">
        <h3 className="font-heading text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {feature.title}
        </h3>
        <p className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  )
}
