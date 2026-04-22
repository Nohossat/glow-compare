export interface Feature {
  id: number
  title: string
  description: string
  image: string
  imageAlt: string
}

export const features: Feature[] = [
  {
    id: 1,
    title: 'Ingredient Breakdown',
    description: 'Compare INCI lists side by side with plain-language explanations of key actives like niacinamide, centella asiatica, and hyaluronic acid.',
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80&fit=crop',
    imageAlt: 'Elegant skincare serum dropper bottle on marble',
  },
  {
    id: 2,
    title: 'Complexion Match',
    description: 'Filter products by skin type — oily, dry, combination, sensitive, or acne-prone. See compatibility scores before you buy.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&fit=crop',
    imageAlt: 'Woman receiving face mask skincare treatment',
  },
  {
    id: 3,
    title: 'True Value Analysis',
    description: 'Go beyond retail price. We calculate cost per ml, active concentration per ml, and effectiveness ratings from peer-reviewed data.',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80&fit=crop',
    imageAlt: 'Multiple skincare products laid out with botanical elements',
  },
]
