export interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  product: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Marchand',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&q=80&fit=crop&crop=face',
    rating: 5,
    text: "I'd been buying K-beauty products on impulse for two years and my skin was a mess of conflicting actives. Glow Compare showed me I was layering vitamin C with niacinamide — they cancel each other out! Three weeks after switching, my dark spots are visibly fading.",
    product: 'COSRX Niacinamide Serum vs. Some By Mi AHA/BHA',
  },
  {
    id: 2,
    name: 'Aiko Tanaka',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&q=80&fit=crop&crop=face',
    rating: 5,
    text: 'As someone with sensitive, redness-prone skin I was always scared to try new serums. The complexion match filter saved me so much trial and error. I found a centella-based product that scored 98% for sensitive skin — it genuinely transformed my barrier.',
    product: 'Dr.Jart+ Cicapair vs. Beauty of Joseon Glow Serum',
  },
  {
    id: 3,
    name: 'Layla Hassan',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&q=80&fit=crop&crop=face',
    rating: 4,
    text: 'The price-per-ml breakdown is what sold me. I was about to spend £45 on a luxury ampoule with 0.3ml of the active peptide. Glow Compare surfaced a budget alternative with 3x the concentration at half the price. That\'s data no influencer will ever give you.',
    product: 'IOPE Bio Essence vs. Medi-Peel Bor-Tox Peptide Ampoule',
  },
  {
    id: 4,
    name: 'Mei-Lin Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&q=80&fit=crop&crop=face',
    rating: 5,
    text: "I have combination skin with an oily T-zone and dry cheeks — every recommendation felt like it was written for someone else. Glow Compare's zone-based matching is something I didn't know I needed. My routine has never been more balanced.",
    product: 'Laneige Water Bank vs. Klairs Supple Preparation Serum',
  },
]
