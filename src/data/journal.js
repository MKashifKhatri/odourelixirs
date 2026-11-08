export const ARTICLES = [
  {
    slug: 'fragrance-guide',
    category: 'Fragrance Guide',
    title: 'A Beginner’s Guide to Fragrance',
    readTime: '4 min read',
    image: '/assets/journal/fragrance-guide.jpg',
    excerpt: 'Where to begin when you are choosing a fragrance for the first time.',
    body: [
      'Choosing a fragrance can feel overwhelming, but it is really a question of taste. Start by noticing what you already enjoy — the smell of fresh citrus, warm vanilla, clean linen, or roasted coffee — and look for fragrances that echo those moods.',
      'Always try a fragrance on skin rather than judging it from the bottle or a paper strip. Skin chemistry shapes how a scent develops, so the same fragrance can feel slightly different from person to person.',
      'Give it time. A fragrance opens, settles and then dries down over several hours. Wear it for a while before deciding whether it is yours.',
      'If you are unsure where to start, a discovery set lets you live with several scents before committing to a full bottle.',
    ],
  },
  {
    slug: 'understanding-perfume-notes',
    category: 'Perfume Notes',
    title: 'Understanding Perfume Notes',
    readTime: '5 min read',
    image: '/assets/journal/perfume-notes.jpg',
    excerpt: 'Top, heart and base — how a fragrance unfolds over time.',
    body: [
      'Perfumers describe a fragrance as a pyramid of notes. Each layer is noticed at a different moment as the scent develops on your skin.',
      'Top notes are the first impression. They are usually light and bright — citrus such as bergamot is a familiar example — and they tend to fade first.',
      'Heart notes form the character of the fragrance once the top notes settle. They are often floral, green, spiced or fruity.',
      'Base notes are what remain. Ingredients such as musk, woods and vanilla give a fragrance depth and are noticed in the final dry down.',
      'Reading the notes on a bottle — for example “Bergamot · Seaweed · Musk” — gives you a quick sense of the fragrance’s journey from first spray to last trace.',
    ],
  },
  {
    slug: 'finding-your-signature-scent',
    category: 'Signature Scent',
    title: 'Finding Your Signature Scent',
    readTime: '4 min read',
    image: '/assets/journal/signature-scent.jpg',
    excerpt: 'How to find the fragrance that feels unmistakably yours.',
    body: [
      'A signature scent is the fragrance people come to associate with you. It is less about trends and more about how a scent makes you feel when you wear it.',
      'Try fragrances one at a time, on different days, and pay attention to how you feel hours after applying them — not only in the first few minutes.',
      'Apply to clean, moisturised skin on pulse points, and store your bottle away from heat and light so the fragrance stays true.',
      'When one scent keeps being the one you reach for, that is your signature.',
    ],
  },
];

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);
