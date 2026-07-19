/**
 * js/config.js — Dhyana Yogasthala
 * Single source of truth for all shared constants.
 * To update the WhatsApp number, endpoint, UPI ID, or email, edit ONLY this file.
 */
const SITE_CONFIG = {
  siteName: 'Dhyana Yogasthala',
  teacherName: 'Shruti Jain',
  location: 'Sonepat',
  year: '2026',

  // WhatsApp
  whatsappNumber: '918950867190',
  whatsappDefaultMsg: 'Hi%20Shruti%2C%20I%20would%20like%20to%20know%20more%20about%20your%20yoga%20programmes.',
  whatsappSthiraMsg: 'Hi%20Shruti%2C%20I%20want%20to%20know%20more%20about%20Sthira.',

  // Google Sheets endpoint (shared Apps Script deployment)
  registrationEndpoint: 'https://script.google.com/macros/s/AKfycbz8Cdz6OreMzP6xb9iZeT9t_HOJhhNDLd__PNDSwFGw3cJaxG8-krPxoK5qPgjaFmtE0g/exec',

  // Payment
  upiId: 'shruti.shruti.jain84@okaxis',
  upiName: 'Shruti Jain',

  // Contact email
  email: 'seekwithshruti@gmail.com',
};

/**
 * UPCOMING_PROGRAMS — single source of truth for all upcoming program cards.
 *
 * To ADD a program    : add a new object below, set active: true.
 * To ARCHIVE a program: set active: false — card disappears from main page.
 * To CHANGE date/time : edit date / time / location strings below.
 *
 * Fields:
 *   id           — unique slug, used as form key prefix
 *   tag          — badge shown on the card (e.g. '✦ Free · Online')
 *   title        — program name
 *   image        — path relative to site root (assets/images/...)
 *   cardDesc     — short description shown on main page card
 *   pageDesc     — full description shown on dedicated page hero (can use \n for line breaks)
 *   benefits     — array of strings shown on dedicated page benefits strip
 *   subtitle     — small subtitle shown under h1 on dedicated page (optional)
 *   date         — date string (e.g. '2 August 2026')
 *   time         — time string (e.g. '11:30 AM – 12:30 PM IST')
 *   location     — location string (e.g. 'Online' or 'Sec-15, Sonipat')
 *   link         — path to dedicated page (programs/...html)
 *   linkText     — button label on main page card
 *   isFree       — true = skip payment overlay; false = show UPI payment overlay
 *   active       — true = show on main page; false = archived/hidden
 */
const UPCOMING_PROGRAMS = [
  {
    id: 'kaithal',
    tag: '✦ Kaithal',
    title: 'Classical Hatha Yoga in Kaithal',
    image: 'assets/images/hero-bg.webp',
    cardDesc: 'Yogasanas, Bhuta Shuddhi & Surya Kriya Review are coming to Kaithal! Join us from 14th - 16th August.',
    pageDesc: 'Namaskaram,\n\nClassical Hatha Yoga Programs are coming to Kaithal! 🙏\n\n🧘Yogasanas\n📅 14 Aug (Fri): 6:00 PM – 8:30 PM\n📅 15 Aug (Sat): 11:00 AM – 1:30 PM & 6:00 PM – 8:30 PM\n📅 16 Aug (Sun): 11:00 AM – 1:30 PM\n\n🔥 Bhuta Shuddhi\n📅 16 Aug (Sun): 3:00 PM – 4:15 PM\n\n☀️ Surya Kriya Review (for those already initiated into Surya Kriya)\n📅 16 Aug (Sun): 6:00 PM – 7:30 PM',
    subtitle: '14 - 16 Aug | Kaithal',
    benefits: [
      'Yogasanas',
      'Bhuta Shuddhi',
      'Surya Kriya Review'
    ],
    date: '14th–16th August',
    time: 'Multiple Timings',
    location: 'Pant nagar, Near Suncity, Kaithal',
    link: 'programs/kaithal.html',
    linkText: 'Know More / Register',
    isFree: false,
    active: true,
  },
  {
    id: 'yogasanas',
    tag: '✦ Workshop',
    title: 'Yogasanas',
    image: 'assets/images/practice-yogasanas.webp',
    cardDesc: 'Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing.',
    pageDesc: 'An asana is a dynamic way of meditating. Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing. These practices, transmitted in their classical form by Sadhguru, work at a level far deeper than physical exercise.',
    subtitle: 'Being in tune with the Existence',
    benefits: [
      'Improve physical health',
      'Bring mental clarity and emotional balance',
      'Create inner stillness and ease',
      'Prepare the body for meditation',
    ],
    date: '21st–24th July',
    time: '6:45 PM – 9:15 PM',
    location: 'Sec-15, Sonipat',
    link: 'programs/yogasanas.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'cervical-back-pain',
    tag: '✦ Free · Online Session',
    title: 'Yoga for Cervical and Back Pain',
    image: 'assets/images/practice-yoga-cervical-back-pain.webp',
    cardDesc: 'Discover how a few simple yet powerful yoga practices, designed by Sadhguru, can help relieve chronic neck and back pain and support long-term spinal health.',
    pageDesc: 'Sometimes, the most complicated problems have surprisingly simple solutions.\n\nThe chronic neck and back pain you\'ve lived with for months—or years—may ease with a few simple, powerful yoga practices. These time-tested techniques, designed by Sadhguru, are easy to learn and can support spinal health, improve flexibility, and bring lasting relief with consistent practice.\n\nI know this pain firsthand—I\'ve lived through it myself. That\'s why I\'m offering this program for free.\n\nLooking forward to seeing you.',
    subtitle: 'Free Classical Hatha Yoga · Online Session',
    benefits: [
      'Supports spinal health & flexibility',
      'Techniques designed by Sadhguru',
      'Easy to learn — no prior experience needed',
      'Lasting relief with consistent practice',
      '100% Free — Online Live Session',
    ],
    date: '2 August 2026',
    time: '11:30 AM – 12:30 PM IST',
    location: 'Online (joining link will be shared upon registration)',
    link: 'programs/yoga-cervical-back-pain.html',
    linkText: 'Register Free →',
    isFree: true,
    active: true,
  },
  {
    id: 'sthira',
    tag: '✦ New Offering · Exclusively for CA Students',
    title: 'Sthira',
    image: 'assets/images/hero-bg.webp', // Default fallback image since Sthira didn't have a card image
    cardDesc: 'Sthira is a Classical Hatha Yoga programme designed for CA students — to reduce stress, sharpen focus, and help you walk into your exam hall clear, calm, and confident.',
    pageDesc: 'CA exams are among the most demanding in the world. Sthira is a Classical Hatha Yoga programme designed for CA students — to reduce stress, sharpen focus, and help you walk into your exam hall clear, calm, and confident.',
    subtitle: 'Study with clarity, not under pressure',
    benefits: [
      'Reduce stress & exam anxiety at its root',
      'Sharpen focus, memory & concentration',
      'Do more in less time — peak productivity',
      'Calm the mind — think with clarity, not pressure',
      'Sleep deeper, wake up energised',
    ],
    date: 'TBA',
    time: 'Morning 6:00 – 6:35 AM | Evening 8:30 – 9:05 PM',
    location: 'Live Online (MWF & TTS)',
    link: 'programs/sthira-info.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: false, // Archived
  },
  {
    id: 'inner-peace',
    tag: '✦ Free · In-person Session',
    title: 'Yoga for Inner Peace',
    image: 'assets/images/yoga-inner-peace.webp',
    cardDesc: 'Join us for a rejuvenating hour dedicated to stillness and self-connection. This session will introduce a few simple yet powerful yogic practices designed to release physical tension, calm the mind, and restore natural balance.',
    pageDesc: 'Join us for a rejuvenating hour dedicated to stillness and self-connection.\n\nThis session will introduce a few simple yet powerful yogic practices designed to release physical tension, calm the mind, and restore natural balance in the body followed by guided meditations that gently quiet the mental chatter, leaving you in a state of deep peace and clarity.\n\nNo prior experience needed.\n\nSeats are limited, so pre-registration is mandatory. Reserve your spot below and take the first step toward a calmer, more centered you.',
    subtitle: 'Free Classical Hatha Yoga Session',
    benefits: [
      'Release physical tension',
      'Calm the mind',
      'Restore natural balance in the body',
      'Experience deep peace and clarity',
      'No prior experience needed'
    ],
    date: '28th July 2026',
    time: '12:00 – 1:00 PM',
    location: 'Dhyana Yogasthala, 812, Sector-15, Sonepat',
    link: 'programs/yoga-inner-peace.html',
    linkText: 'Register Free →',
    isFree: true,
    active: true,
  },
  {
    id: 'surya-kriya-free',
    tag: '✦ Free · Suited for Beginners',
    title: 'Surya Kriya',
    image: 'assets/images/surya-kriya-free.webp',
    cardDesc: '"An asana is a dynamic form of meditating" - Sadhguru. Move. Breathe. Meditate. Transform.',
    pageDesc: 'Move. Breathe. Meditate. Transform.\n\n"An asana is a dynamic form of meditating" - Sadhguru\n\nJoin us for this free Surya Kriya session. Pre-registration is mandatory and the program is suited for beginners.',
    subtitle: 'Free Classical Hatha Yoga Session',
    benefits: [
      'Relieve Cervical & Back Pain',
      'Improve energy levels',
      'Bring mental clarity and emotional balance',
      'Brings inner stillness and ease',
      'Enhances meditativeness'
    ],
    date: 'Jul 30 – 1 Aug 2026',
    time: '1:45 – 3:45 PM',
    location: 'Dhyana Yogasthala, 812, Sec-15, Sonepat',
    link: 'programs/surya-kriya-free.html',
    linkText: 'Register Free →',
    isFree: true,
    active: true,
  },
];

/**
 * WORKSHOPS — individual Classical Hatha Yoga workshops.
 *
 * cardBenefits : shown as <ul> in workshops.html hub
 * cardDuration : left badge in practice-meta on hub card
 * cardTarget   : right badge in practice-meta on hub card
 * heroLabel    : string shown as label below nav on dedicated page hero
 * subtitle     : subtitle under h1 on dedicated page
 * pageDesc     : hero paragraph on dedicated page
 * benefits     : shown in benefits strip on dedicated page
 *                can be plain strings (icon defaults to ✦) or {icon, text}
 * isFree       : true = skip payment overlay on dedicated page
 */
const WORKSHOPS = [
  {
    id: 'angamardana',
    tag: 'Yogic Fitness',
    title: 'Angamardana',
    image: 'assets/images/practice-angamardana.webp',
    cardDesc: 'An ancient fitness system rooted in yoga for peak physical and mental wellbeing. No equipment. No gym. Just you and the power of your system.',
    cardBenefits: ['Build strength and stamina', 'Improve flexibility and agility', 'Strengthen the spine and muscular system', 'Bring lightness to the body'],
    cardDuration: '⏱ 4 days · 2.5 hrs each',
    cardTarget: 'Age 8+',
    heroLabel: 'Duration: 4 days · 2.5 hrs each | Fee: To Be Announced',
    subtitle: 'Yogic Fitness',
    pageDesc: 'An ancient fitness system rooted in yoga for peak physical and mental wellbeing. No equipment. No gym. Just you and the power of your system.',
    benefits: ['Build strength and stamina', 'Improve flexibility and agility', 'Strengthen the spine and muscular system', 'Bring lightness to the body'],
    link: 'programs/angamardana.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'surya-kriya',
    tag: 'Being in tune with the Sun',
    title: 'Surya Kriya',
    image: 'assets/images/practice-surya-kriya.webp',
    cardDesc: 'Traditionally available only to select groups of yogis, Surya Kriya is being offered by Sadhguru for the hectic pace of today\'s world. A complete spiritual process by itself.',
    cardBenefits: ['Develop mental clarity, focus & concentration', 'Reduce overthinking', 'Boost energy levels', 'Balance hormonal levels', 'Prepare for deeper meditative states'],
    cardDuration: '⏱ 3 days · 2 hrs each',
    cardTarget: 'Age 14+',
    heroLabel: 'Duration: 3 days · 2 hrs each | Fee: To Be Announced',
    subtitle: 'Being in tune with the Sun',
    pageDesc: 'Traditionally available only to select groups of yogis, Surya Kriya is being offered by Sadhguru for the hectic pace of today\'s world. A complete spiritual process by itself.',
    benefits: ['Develop mental clarity, focus & concentration', 'Reduce overthinking', 'Boost energy levels', 'Balance hormonal levels', 'Prepare for deeper meditative states'],
    link: 'programs/surya-kriya.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'yogasanas-workshop',
    tag: 'Being in tune with the Existence',
    title: 'Yogasanas',
    image: 'assets/images/practice-yogasanas.webp',
    cardDesc: 'An asana is a dynamic way of meditating. Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing.',
    cardBenefits: ['Improve physical health', 'Bring mental clarity and emotional balance', 'Create inner stillness and ease', 'Prepare the body for meditation'],
    cardDuration: '⏱ 4 days · 2.5 hrs each',
    cardTarget: 'Age 15+',
    link: 'programs/yogasanas.html',
    linkText: 'Know More / Explore',
    active: true,
  },
  {
    id: 'bhuta-shuddhi',
    tag: 'Elemental Cleansing',
    title: 'Bhuta Shuddhi',
    image: 'assets/images/practice-bhuta-shuddhi.webp',
    cardDesc: 'A process of cleansing the five fundamental elements — earth, water, fire, air, and space — within the human system. Laying the foundation for deeper health and higher yogic practices.',
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+ · Purification · Chronic Ailments',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: To Be Announced',
    subtitle: 'Elemental Cleansing',
    pageDesc: 'A process of cleansing the five fundamental elements — earth, water, fire, air, and space — within the human system. Laying the foundation for deeper health and higher yogic practices.',
    benefits: ['Purify the five elements in the body', 'Rejuvenate the system on a cellular level', 'Create harmony between body and mind', 'Lay the foundation for deeper yogic practices'],
    link: 'programs/bhuta-shuddhi.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'shanmukhi-mudra',
    tag: 'Sensory Cleansing',
    title: 'Shanmukhi Mudra',
    image: 'assets/images/practice-shanmukhi-mudra.webp',
    cardDesc: 'A meditative mudra that brings awareness to the eyes, ears, and nose simultaneously — cleansing and restoring the sensory system.',
    cardBenefits: ['Helps with ailments of the ears, eyes, and nose', 'Brings a natural glow to the face', 'Improves vision', 'Enhances meditativeness — helps turn inward'],
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: To Be Announced',
    subtitle: 'Sensory Cleansing',
    pageDesc: 'A meditative mudra that brings awareness to the eyes, ears, and nose simultaneously — cleansing and restoring the sensory system.',
    benefits: ['Helps with ailments of the ears, eyes, and nose', 'Brings a natural glow to the face', 'Improves vision', 'Enhances meditativeness — helps turn inward'],
    link: 'programs/shanmukhi-mudra.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'eye-care-practices',
    tag: 'Eye Health',
    title: 'Eye Care Practices',
    image: 'assets/images/practice-eye-care-practices.webp',
    cardDesc: 'A specialised set of yogic exercises for the eyes. Especially beneficial for long-sightedness and short-sightedness — aimed at relieving dependency on glasses over time.',
    cardBenefits: ['Relieve strain from screens and long hours', 'Improve and support better vision', 'Lubricate and strengthen the ocular muscles', 'Prevent long-term eye fatigue'],
    cardDuration: '⏱ 2 days · 1 hr 15 mins each',
    cardTarget: 'Age 8+',
    heroLabel: 'Duration: 2 days · 1 hr 15 mins each | Fee: To Be Announced',
    subtitle: 'Eye Health',
    pageDesc: 'A specialised set of yogic exercises for the eyes. Especially beneficial for long-sightedness and short-sightedness — aimed at relieving dependency on glasses over time.',
    benefits: ['Relieve strain from screens and long hours', 'Improve and support better vision', 'Lubricate and strengthen the ocular muscles', 'Prevent long-term eye fatigue'],
    link: 'programs/eye-care-practices.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'bhastrika-kriya',
    tag: 'Respiratory',
    title: 'Bhastrika Kriya',
    image: 'assets/images/practice-bhastrika-kriya.webp',
    cardDesc: 'A powerful breathing kriya that dramatically increases lung capacity, oxygenates the blood, and is particularly effective for respiratory problems, asthma, and low energy states.',
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+ · Respiratory · Meditation',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: To Be Announced',
    subtitle: 'Respiratory',
    pageDesc: 'A powerful breathing kriya that dramatically increases lung capacity, oxygenates the blood, and is particularly effective for respiratory problems, asthma, and low energy states.',
    benefits: ['Increase lung capacity dramatically', 'Oxygenate the blood efficiently', 'Relieve asthma and respiratory issues', 'Boost overall energy levels'],
    link: 'programs/bhastrika-kriya.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
  {
    id: 'jala-neti',
    tag: 'ENT Health',
    title: 'Jala Neti',
    image: 'assets/images/practice-jala-neti.webp',
    cardDesc: 'A classical nasal cleansing practice using saline water. Clears the nasal passage, sinuses, and ear-nose-throat pathways. Highly beneficial for allergies, sinusitis, and ENT concerns.',
    cardDuration: '⏱ 1 day · 1 hr',
    cardTarget: 'Age 14+ · Ears · Nose · Throat',
    heroLabel: 'Duration: 1 day · 1 hr | Fee: To Be Announced',
    subtitle: 'ENT Health',
    pageDesc: 'A classical nasal cleansing practice using saline water. Clears the nasal passage, sinuses, and ear-nose-throat pathways. Highly beneficial for allergies, sinusitis, and ENT concerns.',
    benefits: ['Clear the nasal passage and sinuses', 'Relieve allergies and sinusitis', 'Improve breathing quality', 'Enhance overall ENT health'],
    link: 'programs/jala-neti.html',
    linkText: 'Know More / Explore',
    isFree: false,
    active: true,
  },
];

/**
 * OFFERINGS — main offering types shown in the Offerings section on the homepage.
 *
 * featured     : true = card gets 'practice-card featured' CSS class
 * cardDuration : left badge in practice-meta
 * cardTarget   : right badge in practice-meta
 * heroLabel    : string used as label in hero on dedicated page
 * heroFeatures : optional array of strings — renders feature bullets in hero
 *                (used by Maitreyi instead of a desc paragraph)
 * benefits     : can be plain strings (✦ icon) or {icon, text} for custom icons
 * benefitsLabel: heading of the benefits strip (default: 'Program Benefits')
 */
const OFFERINGS = [
  {
    id: 'workshops-hub',
    tag: 'Classical Hatha Yoga',
    title: 'Workshops',
    image: 'assets/images/offering-workshops.webp',
    cardDesc: 'We offer workshops such as Angamardana, Surya Kriya, and Yogasanas ranging from one to five days. Each is dedicated to teaching a specific yogic practice in a way that enables you to continue it independently. These powerful programs have been structured by Sadhguru.',
    cardDuration: '⏱ 1 to 5 days',
    cardTarget: 'In-person',
    link: 'programs/workshops.html',
    linkText: 'Know More / Explore Workshops',
    featured: false,
    active: true,
  },
  {
    id: 'maitreyi',
    tag: '✦ One-on-One · Personalised',
    title: 'Maitreyi (One-on-One Online)',
    image: 'assets/images/practice-maitreyi.webp',
    cardDesc: 'Maitreyi is a personalised Online Classical Hatha Yoga offering designed to support your individual needs and aspirations. Through one-on-one guidance, the practices are carefully selected and adapted based on your current health condition, lifestyle, and goals.',
    cardDuration: '⏱ Online · Flexible',
    cardTarget: 'All ages · Personalised',
    heroLabel: 'One-on-One · Personalised · Live Online',
    subtitle: 'Classical Hatha Yoga, crafted for you',
    heroFeatures: [
      'One-on-one personalised sessions',
      'Practices selected for your health & goals',
      'Ongoing guidance and assessment',
      'Suitable for complete beginners',
    ],
    pageDesc: 'Maitreyi is a personalised Online Classical Hatha Yoga offering designed to support your individual needs and aspirations. Through one-on-one guidance, the practices are carefully selected and adapted based on your current health condition, lifestyle, and goals.\n\nNo two people are the same. Your yoga programme should not be either.',
    benefits: [
      { icon: '🧘', text: 'Classical Hatha Yoga practices — not generic fitness yoga' },
      { icon: '🎯', text: 'Customised guidance based on your individual requirements' },
      { icon: '📈', text: 'Ongoing assessment and support as you progress' },
      { icon: '🌱', text: 'Suitable for beginners — no prior experience required' },
    ],
    benefitsLabel: 'About the Programme',
    link: 'programs/maitreyi.html',
    linkText: 'Know More / Explore',
    featured: true,
    isFree: false,
    active: true,
  },
  {
    id: 'spiritual-retreat',
    tag: '✦ Immersive',
    title: 'Spiritual Retreat',
    image: 'assets/images/practice-spiritual-retreat.webp',
    cardDesc: 'A multi-day immersive retreat combining Classical Hatha Yoga practices, silence, inner work, and guided contemplation — a rare and deeply joyful opportunity for transformation. Every retreat is a journey — inward and outward.',
    cardDuration: '⏱ Multi-day',
    cardTarget: 'Transformation · Depth',
    heroLabel: 'Duration: Multi-day | Fee: To Be Announced',
    subtitle: 'Immersive',
    pageDesc: 'A multi-day immersive retreat combining Classical Hatha Yoga practices, silence, inner work, and guided contemplation — a rare and deeply joyful opportunity for transformation. Every retreat is a journey — inward and outward.',
    benefits: ['Immerse in silence and inner work', 'Deepen your yoga and meditation practice', 'Experience guided contemplation', 'Transform your perspective on life'],
    link: 'programs/spiritual-retreat.html',
    linkText: 'Know More / Explore',
    featured: true,
    isFree: false,
    active: true,
  },
  {
    id: 'pre-natal-yoga',
    tag: 'Motherhood',
    title: 'Pre-Natal Yoga',
    image: 'assets/images/practice-pre-natal-yoga.webp',
    cardDesc: 'A specially curated sequence of gentle yogic practices for expecting mothers — supporting physical comfort, emotional balance, and spiritual preparation for the journey of motherhood.',
    cardDuration: '⏱ 3-day In-person · Regular Weekend Online Classes',
    cardTarget: 'Pregnancy · Wellness',
    heroLabel: 'Duration: 3-day In-person · Regular Weekend Online Classes | Fee: To Be Announced',
    subtitle: 'Motherhood',
    pageDesc: 'A specially curated sequence of gentle yogic practices for expecting mothers — supporting physical comfort, emotional balance, and spiritual preparation for the journey of motherhood.',
    benefits: ['Support physical comfort during pregnancy', 'Maintain emotional balance', 'Prepare spiritually for motherhood', 'Connect with other expecting mothers'],
    link: 'programs/pre-natal-yoga.html',
    linkText: 'Know More / Explore',
    featured: false,
    isFree: false,
    active: true,
  },
  {
    id: 'childrens-yoga-workshop',
    tag: 'Kids',
    title: "Children's Yoga Workshop",
    image: 'assets/images/practice-childrens-yoga.webp',
    cardDesc: 'A fun and engaging workshop that introduces children to the fundamentals of Classical Hatha Yoga while nurturing healthy habits, awareness, and joyful participation.',
    cardBenefits: ['Hatha Yoga Practices', 'Food & Nutrition', 'Games & Activities', 'Connecting with Nature'],
    cardDuration: '',
    cardTarget: '',
    heroLabel: 'Duration: 1 to 5 days | Fee: To Be Announced',
    subtitle: 'Kids',
    pageDesc: 'A fun and engaging workshop that introduces children to the fundamentals of Classical Hatha Yoga while nurturing healthy habits, awareness, and joyful participation.',
    benefits: ['Hatha Yoga Practices', 'Food & Nutrition', 'Games & Activities', 'Connecting with Nature'],
    link: 'programs/childrens-yoga-workshop.html',
    linkText: 'Know More / Explore',
    featured: false,
    isFree: false,
    active: true,
  },
];

/** Returns a full wa.me URL for a given message key ('default' or 'sthira') */
function waUrl(key) {
  const msg = key === 'sthira' ? SITE_CONFIG.whatsappSthiraMsg : SITE_CONFIG.whatsappDefaultMsg;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${msg}`;
}

/** Applies correct WA href to all elements with [data-wa] attribute */
function applyWaLinks() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = waUrl(el.dataset.wa);
  });
}

/** Applies correct mailto href + display text to all elements with [data-email] attribute */
function applyEmailLinks() {
  document.querySelectorAll('[data-email]').forEach(el => {
    el.href = `mailto:${SITE_CONFIG.email}`;
    el.textContent = SITE_CONFIG.email;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyWaLinks();
  applyEmailLinks();
});
