/**
 * Homepage FAQ content — single source of truth for both the visible
 * accordion (FaqSection.tsx) and its FAQPage JSON-LD (routes/index.tsx), so
 * the two can never say different things.
 */
export type Faq = {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: "What's included in a guided trip?",
    a: 'All rods, reels, tackle, bait, and safety gear are provided, along with cleaning and bagging of your catch. Just bring weather-appropriate clothing, a valid fishing license, and any food or drinks you want for the day.',
  },
  {
    q: 'Do I need a fishing license?',
    a: 'Yes, every angler must carry a valid Oregon (or Washington, depending on the water) license with the appropriate tags. We are happy to point you to the nearest vendor or the online portal before your trip.',
  },
  {
    q: 'What should I bring?',
    a: 'Dress in layers for the weather and bring polarized sunglasses, a hat, sunscreen, and rain gear in the cooler months. Non-slip footwear and a cooler for your catch are strongly recommended.',
  },
  {
    q: 'How many people can join a trip?',
    a: 'Our flagship 22-ft sled comfortably fishes up to four anglers, while the 18-ft Clackacraft is ideal for groups of three. Larger parties can be split across multiple boats, just ask when you book.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, all major credit and debit cards, and digital wallets like Venmo and Zelle. A deposit is due at booking to lock in your date, with the balance settled on the day of your trip.',
  },
  {
    q: "What's your cancellation policy?",
    a: 'A deposit reserves your date. Cancellations made seven or more days out are fully refundable or reschedulable. Weather calls are made by the captain, safety first, and always come with a rain check.',
  },
  {
    q: 'Are trips kid-friendly?',
    a: 'Absolutely. Warm-weather shad trips are perfect for kids and first-timers, with non-stop action on light gear. Let us know ages ahead of time so we can tailor the day to your group.',
  },
]
