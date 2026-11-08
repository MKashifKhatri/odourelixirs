// Pure data module — also imported by server/index.js, so keep it free of JSX and import.meta.env.
// Edit prices here; every page, the cart and the order API read from this file.

export const PRICES = {
  perfume: 349, // INR per 30 ml fragrance — configurable
  discoverySet: 299, // INR — configurable
};

// Delivery charge in INR added at checkout. 0 = none. Set to your real value.
export const SHIPPING_FEE = 0;
// Optional note shown in cart/checkout, e.g. "Free delivery across India". Leave '' to hide.
export const SHIPPING_NOTE = '';

export const MAX_QTY = 10;

export const PRODUCTS = [
  {
    id: 'mareva',
    slug: 'mareva',
    name: 'Mareva',
    descriptor: 'Bergamot · Seaweed · Musk', // taken from the bottle label in your recording
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/products/mareva.png',
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  {
    id: 'dreamscape',
    slug: 'dreamscape',
    name: 'Dreamscape',
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/products/dreamscape.png',
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  {
    id: 'citrus-garden',
    slug: 'citrus-garden',
    name: 'Citrus Garden',
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/products/citrus-garden.png',
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  {
    id: 'roasted-affair',
    slug: 'roasted-affair',
    name: 'Roasted Affair',
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/products/roasted-affair.png',
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
  {
    id: 'vanilla-ember',
    slug: 'vanilla-ember',
    name: 'Vanilla Ember',
    descriptor: 'Signature fragrance',
    category: 'Fragrance',
    size: '30 ml',
    price: PRICES.perfume,
    image: '/assets/products/vanilla-ember.png',
    description: 'A 30 ml fragrance from the Odour Elixirs collection.',
  },
];

export const DISCOVERY_SET = {
  id: 'discovery-set',
  slug: 'discovery-set',
  name: 'Discovery Set',
  descriptor: 'All five fragrances',
  category: 'Set',
  size: null,
  price: PRICES.discoverySet,
  image: '/assets/products/discovery-set.png',
  description:
    'Experience the complete Odour Elixirs collection. Five fragrances, one set — find your signature.',
};

export const CATALOG = [...PRODUCTS, DISCOVERY_SET];

export const getProductById = (id) => CATALOG.find((p) => p.id === id);
export const getProductBySlug = (slug) => CATALOG.find((p) => p.slug === slug);
