// Content for /info/:page. Replace every [Add …] placeholder with your real policy text.
// Nothing here has been invented on your behalf.
export const INFO_PAGES = {
  'our-methods': {
    title: 'Our Methods',
    sections: [{ h: 'How we work', p: '[Add your story, process and ingredients information here — edit src/data/info.js]' }],
  },
  'shipping-returns': {
    title: 'Shipping & Returns',
    sections: [
      { h: 'Shipping', p: '[Add your delivery areas, timelines and charges here]' },
      { h: 'Returns', p: '[Add your return and exchange policy here]' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [{ h: 'Your information', p: '[Add your privacy policy here]' }],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [{ h: 'Terms of sale', p: '[Add your terms and conditions here]' }],
  },
};
