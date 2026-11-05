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
  adminNotificationEmail: 'seekwithshruti@gmail.com',

  // Studio Google Maps Location
  mapsUrl: 'https://www.google.com/maps/place/Dhyana+Yogasthala+%7C+Sadhguru+Gurukulam/@29.0031183,77.0388958,17z/data=!3m1!4b1!4m6!3m5!1s0x390db11644390b87:0x3e19d926058ae62c!8m2!3d29.0031183!4d77.0388958!16s%2Fg%2F11njpmkd_r',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=29.0031183,77.0388958',
  address: '812, Sector 15, Sonepat, Haryana 131001, India',
  coordinates: { lat: 29.0031183, lng: 77.0388958 },
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
    id: 'childrens-yoga',
    tag: '✦ Online · Ages 7–13 · Live on Zoom',
    tagHi: '✦ ऑनलाइन · आयु 7–13 वर्ष · लाइव ज़ूम',
    title: 'Classical Hatha Yoga for Children',
    titleHi: 'बच्चों के लिए क्लासिकल हठ योग',
    image: 'assets/images/childrens-yoga-class.webp',
    imgContain: true,
    cardDesc: 'A live Sunday class that teaches traditional practices suited to growing bodies, with personal attention for every child. Enhances concentration, memory, and mind–body coordination.',
    cardDescHi: 'बढ़ते बच्चों के लिए उपयुक्त पारंपरिक योग अभ्यास सिखाने वाली लाइव रविवार कक्षा, जिसमें प्रत्येक बच्चे पर व्यक्तिगत ध्यान दिया जाता है। एकाग्रता, स्मृति और मन-शरीर के समन्वय को बढ़ाता है।',
    pageDesc: 'Classical Hatha Yoga for Children 🧘\n\nA live Sunday class that teaches traditional practices suited to growing bodies, with personal attention for every child.\n\n📅 Every Sunday | 11:00 AM – 12:00 PM\n💻 Live Zoom Session\n👧 Age Group: 7–13 years\n\nGuided by a trained Sadhguru Gurukulam Hatha Yoga Teacher.\n\n📌 Pre-registration mandatory | Maximum of 5-6 children',
    pageDescHi: 'बच्चों के लिए क्लासिकल हठ योग 🧘\n\nअपने बच्चे को स्वस्थ शरीर, एकाग्र मन और भावनात्मक कल्याण का उपहार दें!\n\n📅 हर रविवार | सुबह 11:00 – दोपहर 12:00 बजे\n💻 लाइव ज़ूम सत्र\n👧 आयु वर्ग: 7–13 वर्ष\n\nप्रशिक्षित सद्गुरु गुरुकुलम हठ योग शिक्षक द्वारा संचालित।\n\n📌 पूर्व-पंजीकरण अनिवार्य | केवल 5-6 सीटें उपलब्ध',
    subtitle: 'Every Sunday | 11 AM – 12 PM | Live Zoom',
    subtitleHi: 'हर रविवार | सुबह 11 – दोपहर 12 बजे | लाइव ज़ूम',
    benefits: [
      'Enhances concentration, memory, focus and mind–body coordination',
      'Helps in preventing obesity, asthma, sinusitis and chronic ailments',
      'Strengthens the spine and improves posture',
      'Promotes overall well-being and natural vitality',
    ],
    benefitsHi: [
      'एकाग्रता, स्मरण शक्ति और मन-शरीर के समन्वय में सुधार',
      'मोटापा, अस्थमा, साइनस और पुरानी बीमारियों से बचाव',
      'रीढ़ की हड्डी को मजबूत करता है और मुद्रा में सुधार',
      'समग्र स्वास्थ्य और प्राकृतिक ऊर्जा को बढ़ावा',
    ],
    date: 'To be announced',
    dateHi: 'जल्द घोषित की जाएगी',
    time: 'Sundays, 11:00 AM – 12:00 PM',
    timeHi: 'रविवार, सुबह 11:00 – दोपहर 12:00 बजे',
    location: 'Live Zoom Session (Online)',
    locationHi: 'लाइव ज़ूम सत्र (ऑनलाइन)',
    price: '₹2,000 / month',
    priceHi: '₹2,000 प्रति माह',
    link: 'programs/childrens-yoga.html',
    linkText: 'View Details & Register',
    linkTextHi: 'विवरण देखें और पंजीकरण करें',
    isFree: false,
    active: true,
  },
  {
    id: 'pre-natal-yoga',
    tag: '✦ In-Person or Online · Small Batch (2–3)',
    tagHi: '✦ व्यक्तिगत या ऑनलाइन · छोटा बैच (2–3)',
    title: 'Prenatal Yoga',
    titleHi: 'प्रसव पूर्व योग (प्रेनैटल योग)',
    image: 'assets/images/practice-pre-natal-yoga.webp',
    cardDesc: 'A gentle, guided way to feel calm, strong and prepared for the birth, for you and your baby.',
    cardDescHi: 'आपके और आपके शिशु के लिए प्रसव के प्रति शांत, सशक्त और तैयार महसूस करने का एक सौम्य, निर्देशित तरीका। 2–3 महिलाओं के छोटे बैच में व्यक्तिगत ध्यान।',
    pageDesc: 'Pregnancy Yoga 🌿\n\nA gentle, guided way to feel calm, strong and prepared for the birth, for you and your baby.\n\nWorkshop: 3 days, 2 hours each\nFollow-up: Review after 3–4 weeks\nBatch size: 2–3 women, for personal attention\nWho can join: More than 3 months pregnant',
    pageDescHi: 'प्रसव पूर्व योग 🌿\n\nगर्भवती माताओं के लिए कोमल योगिक अभ्यासों का एक विशेष रूप से चयनित क्रम — शारीरिक आराम, भावनात्मक संतुलन और मातृत्व की यात्रा के लिए आध्यात्मिक तैयारी का समर्थन करता है।',
    subtitle: '3 days · 2 hours each | Review after 3–4 weeks',
    subtitleHi: '3 दिन · प्रतिदिन 2 घंटे | 3–4 सप्ताह बाद समीक्षा',
    benefits: [
      'Deals with physiological changes of pregnancy gently and naturally',
      'Reduces stress, fatigue, mood swings and anxiety',
      'Prepares the body and pelvic region for a smoother, natural birth',
      'Accelerates post-childbirth recovery and restores vitality',
    ],
    benefitsHi: [
      'गर्भावस्था के शारीरिक बदलावों को सहजता से संभालना',
      'तनाव, थकान और चिंता को कम करना',
      'प्राकृतिक प्रसव के लिए शरीर को तैयार करना',
      'प्रसव के बाद त्वरित रिकवरी और जीवन शक्ति की पुनःप्राप्ति',
    ],
    date: 'To be announced',
    dateHi: 'जल्द घोषित की जाएगी',
    time: '3 Days (2 hrs each) + Review after 3–4 weeks',
    timeHi: '3 दिन (प्रतिदिन 2 घंटे) + 3–4 सप्ताह बाद समीक्षा',
    location: 'Dhyana Yogasthala, Sector 15, Sonepat (or Online)',
    locationHi: 'ध्याना योगस्थल, सेक्टर-15, सोनीपत (या ऑनलाइन)',
    price: '₹6,500 (Workshop & review included)',
    priceHi: '₹6,500 (वर्कशॉप और समीक्षा शामिल)',
    link: 'programs/pre-natal-yoga.html',
    linkText: 'View Details & Register',
    linkTextHi: 'विवरण देखें और पंजीकरण करें',
    isFree: false,
    active: true,
  },
  {
    id: 'surya-kriya',
    tag: '✦ In-Person · Sonepat · 3-Day Workshop',
    tagHi: '✦ व्यक्तिगत · सोनीपत · 3-दिवसीय वर्कशॉप',
    title: 'Surya Kriya',
    titleHi: 'सूर्य क्रिया',
    image: 'assets/images/practice-surya-kriya.webp',
    cardDesc: 'Traditionally available only to select groups of people, Surya Kriya is being offered by Sadhguru for the hectic pace of today’s world. A holistic process for health, wellness and inner well-being.',
    cardDescHi: 'परंपरागत रूप से केवल चुनिंदा लोगों के लिए उपलब्ध, सूर्य क्रिया को सद्गुरु आज की व्यस्त दुनिया के लिए प्रदान कर रहे हैं। स्वास्थ्य, कल्याण और आंतरिक शांति के लिए एक समग्र प्रक्रिया।',
    pageDesc: 'Being in Sync with the Sun.\n\nA powerful 21-step yogic process to activate inner energy, bring balance and experience greater wellbeing.\n\nTraditionally available only to select groups of people, Surya Kriya is being offered by Sadhguru as a holistic process for health, wellness, and complete inner wellbeing.\n\n📍 Dhyana Yogasthala, 812, Sector-15, Sonepat\n🏷️ Program Fee: ₹3,500 (Includes workshop and review)',
    pageDescHi: 'सूर्य के साथ तालमेल में।\n\nआंतरिक ऊर्जा को सक्रिय करने, संतुलन लाने और परम कल्याण का अनुभव करने के लिए 21 चरणों का एक शक्तिशाली योगिक अभ्यास।\n\nपरंपरागत रूप से केवल चुनिंदा लोगों के लिए उपलब्ध, सूर्य क्रिया को सद्गुरु आज की व्यस्त दुनिया के लिए एक पूर्ण आध्यात्मिक प्रक्रिया के रूप में प्रदान कर रहे हैं।',
    subtitle: 'Being in Sync with the Sun | Sonepat',
    subtitleHi: 'सूर्य के साथ तालमेल में | सोनीपत',
    benefits: [
      'Develop mental clarity, focus and concentration',
      'Reduce stress and overthinking',
      'Boost energy levels',
      'Balance hormonal levels (PCOS, PCOD, thyroid)',
      'Prepare for deeper meditative states',
    ],
    benefitsHi: [
      'मानसिक स्पष्टता, ध्यान और एकाग्रता का विकास',
      'तनाव और अत्यधिक सोच को कम करना',
      'ऊर्जा स्तर में वृद्धि',
      'हार्मोनल स्तर और संबंधित समस्याओं को संतुलित करना',
      'गहरे ध्यान की अवस्थाओं के लिए तैयारी',
    ],
    date: 'To be announced',
    dateHi: 'जल्द घोषित की जाएगी',
    time: '3 days, 2 hours each (Review after 3–4 weeks)',
    timeHi: '3 दिन, प्रतिदिन 2 घंटे (3–4 सप्ताह बाद समीक्षा)',
    location: 'Dhyana Yogasthala, 812, Sec-15, Sonepat',
    locationHi: 'ध्याना योगस्थल, 812, सेक्टर-15, सोनीपत',
    price: '₹3,500 (Workshop and review included)',
    priceHi: '₹3,500 (वर्कशॉप और समीक्षा शामिल)',
    link: 'programs/surya-kriya.html',
    linkText: 'View Details & Register',
    linkTextHi: 'विवरण देखें और पंजीकरण करें',
    isFree: false,
    active: true,
  },
  {
    id: 'cervical-back-pain-workshop',
    tag: '✦ Live Online · 1 Hour',
    tagHi: '✦ लाइव ऑनलाइन · 1 घंटा',
    title: 'Cervical & Back Pain Workshop',
    titleHi: 'सर्वाइकल और पीठ दर्द वर्कशॉप',
    image: 'assets/images/cervical-back-pain-workshop.webp',
    imgContain: true,
    cardDesc: 'Strengthen the spine before it gets too late. Learn a potent 10-minute practice structured by Sadhguru to relieve neck, cervical & back discomfort, plus live Q&A and free participation for the next 3 months as post-programme support.',
    cardDescHi: 'बहुत देर होने से पहले रीढ़ को मजबूत करें। गर्दन, सर्वाइकल और पीठ के दर्द से राहत के लिए सद्गुरु द्वारा संरचित 10 मिनट का अभ्यास, लाइव प्रश्नोत्तर और पोस्ट-प्रोग्राम सहायता के रूप में अगले 3 महीनों के लिए मुफ्त भागीदारी।',
    pageDesc: 'A live online workshop on cervical and back pain, featuring a 10-minute practice structured by Sadhguru to relieve neck, shoulder, and back discomfort and strengthen the spine.\n\n📅 31 October or 14 November 2026\n🕒 11:00 AM – 12:00 PM or 7:30 – 8:30 PM\n💻 Live Online Session\n🏷️ Fee: ₹399 (Special offer, was ₹1,000)\n🎁 Free participation for next 3 months as post-programme support',
    pageDescHi: 'सद्गुरु द्वारा संरचित 10 मिनट के अभ्यास के साथ सर्वाइकल और पीठ दर्द पर एक लाइव ऑनलाइन कार्यशाला। अगले 3 महीनों के लिए मुफ्त भागीदारी।',
    subtitle: '31 Oct or 14 Nov | Live Online | ₹399',
    subtitleHi: '31 अक्टूबर या 14 नवंबर | लाइव ऑनलाइन | ₹399',
    benefits: [
      'Learn a 10-minute practice structured by Sadhguru to strengthen the spine',
      'Relief from cervical, neck, and lower back stiffness',
      'Live Q&A with Classical Hatha Yoga teacher from Sadhguru Gurukulam',
      'Free participation for the next 3 months as post-programme support',
    ],
    benefitsHi: [
      'रीढ़ को मजबूत करने के लिए सद्गुरु द्वारा संरचित 10 मिनट का अभ्यास सीखें',
      'सर्वाइकल, गर्दन और पीठ की अकड़न से राहत',
      'सद्गुरु गुरुकुलम शिक्षक के साथ लाइव प्रश्नोत्तर',
      'पोस्ट-प्रोग्राम सहायता के रूप में अगले 3 महीनों के लिए मुफ्त भागीदारी',
    ],
    date: '31 October or 14 November 2026',
    dateHi: '31 अक्टूबर या 14 नवंबर 2026',
    time: '11:00 AM – 12:00 PM or 7:30 – 8:30 PM',
    timeHi: 'सुबह 11:00 – दोपहर 12:00 या शाम 7:30 – 8:30 बजे',
    location: 'Live Online Session',
    locationHi: 'लाइव ऑनलाइन सत्र',
    price: '₹399 (Special offer, was ₹1,000)',
    priceHi: '₹399 (विशेष ऑफर)',
    link: 'programs/yoga-cervical-back-pain-workshop.html',
    linkText: 'View Details & Register',
    linkTextHi: 'विवरण देखें और पंजीकरण करें',
    isFree: false,
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
    tagHi: 'योगिक फिटनेस',
    title: 'Angamardana',
    titleHi: 'अंगमर्दन',
    image: 'assets/images/practice-angamardana.webp',
    cardDesc: 'An ancient fitness system rooted in yoga for peak physical and mental wellbeing. No equipment. No gym. Just you and the power of your system. Fee: ₹5,500.',
    cardDescHi: 'योग में निहित एक प्राचीन फिटनेस प्रणाली — शीर्ष शारीरिक और मानसिक कल्याण के लिए। कोई उपकरण नहीं। कोई जिम नहीं। बस आप और आपके सिस्टम की शक्ति। शुल्क: ₹5,500।',
    cardBenefits: ['Build strength and stamina', 'Improve flexibility and agility', 'Strengthen the spine and muscular system', 'Bring lightness to the body'],
    cardDuration: '⏱ 4 days · 2.5 hrs each',
    cardTarget: 'Age 8+',
    heroLabel: 'Duration: 4 days · 2.5 hrs each | Fee: ₹5,500',
    heroLabelHi: 'अवधि: 4 दिन · प्रत्येक 2.5 घंटे | शुल्क: ₹5,500',
    price: '₹5,500',
    priceHi: '₹5,500',
    subtitle: 'Yogic Fitness',
    subtitleHi: 'योगिक फिटनेस',
    pageDesc: 'An ancient fitness system rooted in yoga for peak physical and mental wellbeing. No equipment. No gym. Just you and the power of your system.\n\n🏷️ Program Fee: ₹5,500',
    pageDescHi: 'योग में निहित एक प्राचीन फिटनेस प्रणाली — शीर्ष शारीरिक और मानसिक कल्याण के लिए। कोई उपकरण नहीं। कोई जिम नहीं। बस आप और आपके सिस्टम की शक्ति।\n\n🏷️ कार्यक्रम शुल्क: ₹5,500',
    benefits: ['Build strength and stamina', 'Improve flexibility and agility', 'Strengthen the spine and muscular system', 'Bring lightness to the body'],
    link: 'programs/angamardana.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'surya-kriya',
    tag: 'Being in sync with the Sun',
    tagHi: 'सूर्य के साथ तालमेल में',
    title: 'Surya Kriya',
    titleHi: 'सूर्य क्रिया',
    image: 'assets/images/practice-surya-kriya.webp',
    cardDesc: 'Traditionally available only to select groups of people, Surya Kriya is being offered by Sadhguru for the hectic pace of today\'s world. A holistic process for health, wellness and inner well-being. Fee: ₹3,500.',
    cardDescHi: 'परंपरागत रूप से केवल चुनिंदा लोगों के लिए उपलब्ध, सूर्य क्रिया को सद्गुरु आज की व्यस्त दुनिया के लिए प्रदान कर रहे हैं। स्वास्थ्य, कल्याण और आंतरिक शांति के लिए एक समग्र प्रक्रिया। शुल्क: ₹3,500।',
    cardBenefits: ['Develop mental clarity, focus and concentration', 'Reduce stress and overthinking', 'Boost energy levels', 'Balance hormonal levels (PCOS/PCOD/thyroid)', 'Prepare for deeper meditative states'],
    cardDuration: '⏱ 3 days · 2 hrs each',
    cardTarget: 'Age 14+',
    heroLabel: 'Duration: 3 days · 2 hrs each | Fee: ₹3,500',
    heroLabelHi: 'अवधि: 3 दिन · प्रत्येक 2 घंटे | शुल्क: ₹3,500',
    price: '₹3,500',
    priceHi: '₹3,500',
    subtitle: 'Being in Sync with the Sun',
    subtitleHi: 'सूर्य के साथ तालमेल में',
    pageDesc: 'Traditionally available only to select groups of people, Surya Kriya is being offered by Sadhguru for the hectic pace of today\'s world. A holistic process for health, wellness and complete inner well-being.\n\n🏷️ Program Fee: ₹3,500 (Includes workshop & review)',
    pageDescHi: 'परंपरागत रूप से केवल चुनिंदा लोगों के लिए उपलब्ध, सूर्य क्रिया को सद्गुरु आज की व्यस्त दुनिया के लिए प्रदान कर रहे हैं। स्वास्थ्य, कल्याण और आंतरिक शांति के लिए एक समग्र प्रक्रिया।\n\n🏷️ कार्यक्रम शुल्क: ₹3,500',
    benefits: ['Develop mental clarity, focus and concentration', 'Reduce stress and overthinking', 'Boost energy levels', 'Balance hormonal levels', 'Prepare for deeper meditative states'],
    link: 'programs/surya-kriya.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'yogasanas',
    tag: 'Being in tune with the Existence',
    tagHi: 'अस्तित्व के साथ तालमेल में',
    title: 'Yogasanas',
    titleHi: 'योगासन',
    image: 'assets/images/practice-yogasanas.webp',
    cardDesc: 'An asana is a dynamic way of meditating. Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing. Fee: ₹5,500.',
    cardDescHi: 'एक आसन ध्यान का एक गतिशील तरीका है। योगासन के माध्यम से, शरीर और मन को परम कल्याण की संभावना में रूपांतरित किया जा सकता है। शुल्क: ₹5,500।',
    cardBenefits: ['Improve physical health', 'Bring mental clarity and emotional balance', 'Create inner stillness and ease', 'Prepare the body for meditation'],
    cardDuration: '⏱ 4 days · 2.5 hrs each',
    cardTarget: 'Age 15+',
    heroLabel: 'Duration: 4 days · 2.5 hrs each | Fee: ₹5,500',
    heroLabelHi: 'अवधि: 4 दिन · प्रत्येक 2.5 घंटे | शुल्क: ₹5,500',
    price: '₹5,500',
    priceHi: '₹5,500',
    subtitle: 'Being in tune with the Existence',
    subtitleHi: 'अस्तित्व के साथ तालमेल में',
    pageDesc: 'An asana is a dynamic way of meditating. Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing. These practices, transmitted in their classical form by Sadhguru, work at a level far deeper than physical exercise.\n\n🏷️ Program Fee: ₹5,500',
    pageDescHi: 'एक आसन ध्यान का एक गतिशील तरीका है। योगासन के माध्यम से, शरीर और मन को परम कल्याण की संभावना में रूपांतरित किया जा सकता है। सद्गुरु द्वारा अपने शास्त्रीय रूप में प्रसारित ये अभ्यास, शारीरिक व्यायाम से कहीं गहरे स्तर पर काम करते हैं।\n\n🏷️ कार्यक्रम शुल्क: ₹5,500',
    benefits: [
      'Improve physical health',
      'Bring mental clarity and emotional balance',
      'Create inner stillness and ease',
      'Prepare the body for meditation',
    ],
    benefitsHi: [
      'शारीरिक स्वास्थ्य में सुधार',
      'मानसिक स्पष्टता और भावनात्मक संतुलन',
      'आंतरिक स्थिरता और सहजता',
      'ध्यान के लिए शरीर को तैयार करना',
    ],
    link: 'programs/yogasanas.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'bhuta-shuddhi',
    tag: 'Elemental Cleansing',
    tagHi: 'तत्व शुद्धि',
    title: 'Bhuta Shuddhi',
    titleHi: 'भूत शुद्धि',
    image: 'assets/images/practice-bhuta-shuddhi.webp',
    cardDesc: 'A process of cleansing the five fundamental elements — earth, water, fire, air, and space — within the human system. Laying the foundation for deeper health and higher yogic practices. Fee: ₹1,100 (+ Copper kit worth ₹2,100).',
    cardDescHi: 'मानव शरीर के भीतर पाँच मूलभूत तत्वों — पृथ्वी, जल, अग्नि, वायु और आकाश — को शुद्ध करने की प्रक्रिया। शुल्क: ₹1,100 (+ तांबे की किट मूल्य ₹2,100)।',
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+ · Purification · Chronic Ailments',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: ₹1,100 (+ copper kit worth ₹2,100)',
    heroLabelHi: 'अवधि: 1 दिन · 1.5 घंटे | शुल्क: ₹1,100 (+ तांबे की किट मूल्य ₹2,100)',
    price: '₹1,100 (+ Copper kit worth ₹2,100)',
    priceHi: '₹1,100 (+ तांबे की किट मूल्य ₹2,100)',
    subtitle: 'Elemental Cleansing',
    subtitleHi: 'तत्व शुद्धि',
    pageDesc: 'A process of cleansing the five fundamental elements — earth, water, fire, air, and space — within the human system. Laying the foundation for deeper health and higher yogic practices.\n\n🏷️ Program Fee: ₹1,100 (+ Copper kit worth ₹2,100)',
    pageDescHi: 'मानव शरीर के भीतर पाँच मूलभूत तत्वों — पृथ्वी, जल, अग्नि, वायु और आकाश — को शुद्ध करने की प्रक्रिया। गहरे स्वास्थ्य और उच्चतर योगिक अभ्यासों की नींव रखना।\n\n🏷️ कार्यक्रम शुल्क: ₹1,100 (+ तांबे की किट मूल्य ₹2,100)',
    benefits: ['Purify the five elements in the body', 'Rejuvenate the system on a cellular level', 'Create harmony between body and mind', 'Lay the foundation for deeper yogic practices'],
    benefitsHi: ['शरीर के पाँच तत्वों को शुद्ध करें', 'कोशिकीय स्तर पर तंत्र को पुनर्जीवित करें', 'शरीर और मन के बीच सांमजस्य स्थापित करें', 'गहरे योगिक अभ्यासों की नींव रखें'],
    link: 'programs/bhuta-shuddhi.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'shanmukhi-mudra',
    tag: 'Sensory Cleansing',
    tagHi: 'इंद्रिय शुद्धि',
    title: 'Shanmukhi Mudra',
    titleHi: 'षण्मुखी मुद्रा',
    image: 'assets/images/practice-shanmukhi-mudra.webp',
    cardDesc: 'A meditative mudra that brings awareness to the eyes, ears, and nose simultaneously — cleansing and restoring the sensory system. Fee: ₹1,500.',
    cardDescHi: 'एक ध्यानात्मक मुद्रा जो आंखों, कानों और नाक को एक साथ जागृत करती है — इंद्रिय तंत्र को शुद्ध और पुनर्स्थापित करती है। शुल्क: ₹1,500।',
    cardBenefits: ['Helps with ailments of the ears, eyes, and nose', 'Brings a natural glow to the face', 'Improves vision', 'Enhances meditativeness — helps turn inward'],
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: ₹1,500',
    heroLabelHi: 'अवधि: 1 दिन · 1.5 घंटे | शुल्क: ₹1,500',
    price: '₹1,500',
    priceHi: '₹1,500',
    subtitle: 'Sensory Cleansing',
    subtitleHi: 'इंद्रिय शुद्धि',
    pageDesc: 'A meditative mudra that brings awareness to the eyes, ears, and nose simultaneously — cleansing and restoring the sensory system.\n\n🏷️ Program Fee: ₹1,500',
    pageDescHi: 'एक ध्यानात्मक मुद्रा जो आंखों, कानों और नाक को एक साथ जागृत करती है — इंद्रिय तंत्र को शुद्ध और पुनर्स्थापित करती है।\n\n🏷️ कार्यक्रम शुल्क: ₹1,500',
    benefits: ['Helps with ailments of the ears, eyes, and nose', 'Brings a natural glow to the face', 'Improves vision', 'Enhances meditativeness — helps turn inward'],
    benefitsHi: ['कान, आँख और नाक की समस्याओं में सहायक', 'चेहरे पर प्राकृतिक चमक लाती है', 'दृष्टि में सुधार', 'ध्यान क्षमता बढ़ाती है — अंतर्मुखी होने में सहायक'],
    link: 'programs/shanmukhi-mudra.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'eye-care-practices',
    tag: 'Eye Health',
    tagHi: 'नेत्र स्वास्थ्य',
    title: 'Eye Care Practices',
    titleHi: 'नेत्र देखभाल अभ्यास',
    image: 'assets/images/practice-eye-care-practices.webp',
    cardDesc: 'A specialised set of yogic exercises for the eyes. Especially beneficial for long-sightedness and short-sightedness — aimed at relieving dependency on glasses over time. Fee: ₹2,500.',
    cardDescHi: 'आंखों के लिए योगिक अभ्यासों का एक विशेष संचयन। दूरदृष्टि और निकटदृष्टि के लिए विशेष रूप से लाभदायक — समय के साथ चश्मे पर निर्भरता कम करने का लक्ष्य। शुल्क: ₹2,500।',
    cardBenefits: ['Relieve strain from screens and long hours', 'Improve and support better vision', 'Lubricate and strengthen the ocular muscles', 'Prevent long-term eye fatigue'],
    cardDuration: '⏱ 2 days · 1 hr 15 mins each',
    cardTarget: 'Age 8+',
    heroLabel: 'Duration: 2 days · 1 hr 15 mins each | Fee: ₹2,500',
    heroLabelHi: 'अवधि: 2 दिन · प्रत्येक 1 घंटा 15 मिनट | शुल्क: ₹2,500',
    price: '₹2,500',
    priceHi: '₹2,500',
    subtitle: 'Eye Health',
    subtitleHi: 'नेत्र स्वास्थ्य',
    pageDesc: 'A specialised set of yogic exercises for the eyes. Especially beneficial for long-sightedness and short-sightedness — aimed at relieving dependency on glasses over time.\n\n🏷️ Program Fee: ₹2,500',
    pageDescHi: 'आंखों के लिए योगिक अभ्यासों का एक विशेष संचयन। दूरदृष्टि और निकटदृष्टि के लिए विशेष रूप से लाभदायक — समय के साथ चश्मे पर निर्भरता कम करने का लक्ष्य।\n\n🏷️ कार्यक्रम शुल्क: ₹2,500',
    benefits: ['Relieve strain from screens and long hours', 'Improve and support better vision', 'Lubricate and strengthen the ocular muscles', 'Prevent long-term eye fatigue'],
    benefitsHi: ['स्क्रीन और लंबे घंटों से आंखों की थकान कम करें', 'दृष्टि में सुधार और समर्थन', 'नेत्र की मांसपेशियों को लुब्रिकेट और मजबूत करें', 'दीर्घकालिक आंखों की थकान रोकें'],
    link: 'programs/eye-care-practices.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'bhastrika-kriya',
    tag: 'Respiratory',
    tagHi: 'श्वसन तंत्र',
    title: 'Bhastrika Kriya',
    titleHi: 'भस्त्रिका क्रिया',
    image: 'assets/images/practice-bhastrika-kriya.webp',
    cardDesc: 'A powerful breathing kriya that dramatically increases lung capacity, oxygenates the blood, and is particularly effective for respiratory problems, asthma, and low energy states. Fee: ₹1,500.',
    cardDescHi: 'एक शक्तिशाली श्वास क्रिया जो फेफड़ां की क्षमता नाटकीय रूप से बढ़ाती है, रक्त को ऑक्सीजनेट करती है, और श्वसन तंत्र संबंधी समस्याओं, दमा और कम ऊर्जा के लिए विशेष रूप से प्रभावी है। शुल्क: ₹1,500।',
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+ · Respiratory · Meditation',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: ₹1,500',
    heroLabelHi: 'अवधि: 1 दिन · 1.5 घंटे | शुल्क: ₹1,500',
    price: '₹1,500',
    priceHi: '₹1,500',
    subtitle: 'Respiratory',
    subtitleHi: 'श्वसन तंत्र',
    pageDesc: 'A powerful breathing kriya that dramatically increases lung capacity, oxygenates the blood, and is particularly effective for respiratory problems, asthma, and low energy states.\n\n🏷️ Program Fee: ₹1,500',
    pageDescHi: 'एक शक्तिशाली श्वास क्रिया जो फेफड़ां की क्षमता नाटकीय रूप से बढ़ाती है, रक्त को ऑक्सीजनेट करती है, और श्वसन तंत्र संबंधी समस्याओं, दमा और कम ऊर्जा के लिए विशेष रूप से प्रभावी है।\n\n🏷️ कार्यक्रम शुल्क: ₹1,500',
    benefits: ['Increase lung capacity dramatically', 'Oxygenate the blood efficiently', 'Relieve asthma and respiratory issues', 'Boost overall energy levels'],
    benefitsHi: ['फेफड़ां की क्षमता नाटकीय रूप से बढ़ाएं', 'रक्त को कुशलता से ऑक्सीजनेट करें', 'दमा और श्वसन संबंधी समस्याओं से राहत', 'समग्र ऊर्जा स्तर में वृद्धि'],
    link: 'programs/bhastrika-kriya.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'jala-neti',
    tag: 'ENT Health',
    tagHi: 'कान-नाक-गला स्वास्थ्य',
    title: 'Jala Neti',
    titleHi: 'जल नेति',
    image: 'assets/images/practice-jala-neti.webp',
    cardDesc: 'A classical nasal cleansing practice using saline water. Clears the nasal passage, sinuses, and ear-nose-throat pathways. Highly beneficial for allergies, sinusitis, and ENT concerns. Fee: ₹850 (+ Copper pot worth ₹1,150).',
    cardDescHi: 'नमक वाले पानी से नाक साफ़ करने की एक शास्त्रीय प्रक्रिया। नासिका मार्ग, साइनस और ENT नालिकाओं को साफ़ करती है। शुल्क: ₹850 (+ तांबे का पॉट मूल्य ₹1,150)।',
    cardDuration: '⏱ 1 day · 1 hr',
    cardTarget: 'Age 14+ · Ears · Nose · Throat',
    heroLabel: 'Duration: 1 day · 1 hr | Fee: ₹850 (+ copper pot worth ₹1,150)',
    heroLabelHi: 'अवधि: 1 दिन · 1 घंटा | शुल्क: ₹850 (+ तांबे का पॉट मूल्य ₹1,150)',
    price: '₹850 (+ Copper pot worth ₹1,150)',
    priceHi: '₹850 (+ तांबे का पॉट मूल्य ₹1,150)',
    subtitle: 'ENT Health',
    subtitleHi: 'कान-नाक-गला स्वास्थ्य',
    pageDesc: 'A classical nasal cleansing practice using saline water. Clears the nasal passage, sinuses, and ear-nose-throat pathways. Highly beneficial for allergies, sinusitis, and ENT concerns.\n\n🏷️ Program Fee: ₹850 (+ Copper pot worth ₹1,150)',
    pageDescHi: 'नमक वाले पानी से नाक साफ़ करने की एक शास्त्रीय प्रक्रिया। नासिका मार्ग, साइनस और ENT नालिकाओं को साफ़ करती है। एलर्जी, साइनसाइटिस और ENT संबंधी समस्याओं के लिए अत्यंत लाभदायक।\n\n🏷️ कार्यक्रम शुल्क: ₹850 (+ तांबे का पॉट मूल्य ₹1,150)',
    benefits: ['Clear the nasal passage and sinuses', 'Relieve allergies and sinusitis', 'Improve breathing quality', 'Enhance overall ENT health'],
    benefitsHi: ['नासिका मार्ग और साइनस साफ़ करें', 'एलर्जी और साइनसाइटिस से राहत', 'साँस लेने की गुणवत्ता में सुधार', 'समग्र ENT स्वास्थ्य में वृद्धि'],
    link: 'programs/jala-neti.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
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
    tagHi: 'क्लासिकल हठ योग',
    title: 'Workshops',
    titleHi: 'वर्कशॉप',
    image: 'assets/images/offering-workshops.webp',
    cardDesc: 'We offer workshops such as Angamardana, Surya Kriya, and Yogasanas ranging from one to five days. Each is dedicated to teaching a specific yogic practice in a way that enables you to continue it independently. These powerful programs have been structured by Sadhguru.',
    cardDescHi: 'हम अंगमर्दन, सूर्य क्रिया और योगासन जैसे वर्कशॉप प्रदान करते हैं जो एक से पाँच दिन तक चलते हैं। प्रत्येक एक विशिष्ट योगिक अभ्यास सिखाने के लिए समर्पित है। ये शक्तिशाली कार्यक्रम सद्गुरु द्वारा संरचित किए गए हैं।',
    cardDuration: '⏱ 1 to 5 days',
    cardTarget: 'In-person',
    link: 'programs/workshops.html',
    linkText: 'Know More / Explore Workshops',
    linkTextHi: 'अधिक जानें / वर्कशॉप देखें',
    featured: false,
    active: true,
  },
  {
    id: 'maitreyi',
    tag: '✦ One-on-One · Personalised',
    tagHi: '✦ एक-से-एक · व्यक्तिगत',
    title: 'Maitreyi (One-on-One Online)',
    titleHi: 'मैत्रेयी (एक-से-एक ऑनलाइन)',
    image: 'assets/images/practice-maitreyi.webp',
    cardDesc: 'Maitreyi is a personalised Online Classical Hatha Yoga offering designed to support your individual needs and aspirations. Through one-on-one guidance, the practices are carefully selected and adapted based on your current health condition, lifestyle, and goals.',
    cardDescHi: 'मैत्रेयी एक व्यक्तिगत ऑनलाइन क्लासिकल हठ योग सेवा है जो आपकी व्यक्तिगत ज़रूरतों के अनुसार डिज़ाइन की गई है। एक-से-एक मार्गदर्शन के माध्यम से, अभ्यास आपकी वर्तमान स्वास्थ्य स्थिति, जीवनशैली और लक्ष्यों के आधार पर चुने और ढाले जाते हैं।',
    cardDuration: '⏱ Online · Flexible',
    cardTarget: 'All ages · Personalised',
    heroLabel: 'One-on-One · Personalised · Live Online',
    subtitle: 'Classical Hatha Yoga, crafted for you',
    subtitleHi: 'आपके लिए प्रतिधर्शित, क्लासिकल हठ योग',
    heroFeatures: [
      'One-on-one personalised sessions',
      'Practices selected for your health & goals',
      'Ongoing guidance and assessment',
      'Suitable for complete beginners',
    ],
    pageDesc: 'Maitreyi is a personalised Online Classical Hatha Yoga offering designed to support your individual needs and aspirations. Through one-on-one guidance, the practices are carefully selected and adapted based on your current health condition, lifestyle, and goals.\n\nNo two people are the same. Your yoga programme should not be either.',
    pageDescHi: 'मैत्रेयी एक व्यक्तिगत ऑनलाइन क्लासिकल हठ योग सेवा है जो आपकी व्यक्तिगत ज़रूरतों और आकांक्षाओं के अनुसार डिज़ाइन की गई है।\n\nकोई दो व्यक्ति एक जैसे नहीं होते। आपका योग कार्यक्रम भी नहीं होना चाहिए।',
    benefits: [
      { icon: '🧘', text: 'Classical Hatha Yoga practices — not generic fitness yoga' },
      { icon: '🎯', text: 'Customised guidance based on your individual requirements' },
      { icon: '📈', text: 'Ongoing assessment and support as you progress' },
      { icon: '🌱', text: 'Suitable for beginners — no prior experience required' },
    ],
    benefitsHi: [
      { icon: '🧘', text: 'क्लासिकल हठ योग अभ्यास — सामान्य फिटनेस योग नहीं' },
      { icon: '🎯', text: 'आपकी व्यक्तिगत ज़रूरतों के आधार पर अनुकूलित मार्गदर्शन' },
      { icon: '📈', text: 'निरंतर मूल्यांकन और समर्थन' },
      { icon: '🌱', text: 'शुरुआती लोगों के लिए उपयुक्त — कोई पूर्व अनुभव आवश्यक नहीं' },
    ],
    benefitsLabel: 'About the Programme',
    link: 'programs/maitreyi.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    featured: true,
    isFree: false,
    active: true,
  },

  {
    id: 'pre-natal-yoga',
    tag: 'Motherhood',
    tagHi: 'मातृत्व',
    title: 'Pre-Natal Yoga',
    titleHi: 'प्रसव पूर्व योग',
    image: 'assets/images/practice-pre-natal-yoga.webp',
    cardDesc: 'A specially curated sequence of gentle yogic practices for expecting mothers — supporting physical comfort, emotional balance, and spiritual preparation for the journey of motherhood.',
    cardDescHi: 'गर्भवती माताओं के लिए कोमल योगिक अभ्यासों का एक विशेष रूप से चयनित क्रम — शारीरिक आराम, भावनात्मक संतुलन और मातृत्व की यात्रा के लिए आध्यात्मिक तैयारी का समर्थन करता है।',
    cardBenefits: [
      'Deals with physiological changes of pregnancy',
      'Reduces stress, fatigue & anxiety',
      'Prepares the body for natural birth',
      'Post-childbirth quick recovery support'
    ],
    cardDuration: '⏱ 3-day Workshop · In-person or Online',
    cardTarget: '3+ Months Pregnant · Max 2–3',
    heroLabel: 'Duration: 3-day In-person or Online | Fee: ₹6,500',
    subtitle: 'Motherhood',
    subtitleHi: 'मातृत्व',
    pageDesc: 'A specially curated sequence of gentle yogic practices for expecting mothers — supporting physical comfort, emotional balance, and spiritual preparation for the journey of motherhood.',
    pageDescHi: 'गर्भवती माताओं के लिए कोमल योगिक अभ्यासों का एक विशेष रूप से चयनित क्रम — शारीरिक आराम, भावनात्मक संतुलन और मातृत्व की यात्रा के लिए आध्यात्मिक तैयारी का समर्थन करता है।',
    benefits: ['Support physical comfort during pregnancy', 'Maintain emotional balance', 'Prepare spiritually for motherhood', 'Connect with other expecting mothers'],
    benefitsHi: ['गर्भावस्था में शारीरिक आराम का समर्थन', 'भावनात्मक संतुलन बनाए रखें', 'मातृत्व के लिए आध्यात्मिक तैयारी', 'अन्य गर्भवती माताओं से जुड़ें'],
    link: 'programs/pre-natal-yoga.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    featured: false,
    isFree: false,
    active: true,
  },
  {
    id: 'childrens-yoga',
    tag: '🌿 Kids · Every Sunday · Online',
    tagHi: '🌿 बच्चे · हर रविवार · ऑनलाइन',
    title: "Children's Yoga",
    titleHi: 'बाल योग',
    image: 'assets/images/childrens-yoga-class.webp',
    imgContain: true,
    cardDesc: 'Give your child the gift of a healthy body, a focused mind, and emotional well-being! Classical Hatha Yoga for children aged 7–13. Every Sunday, 11 AM – 12 PM, Live Zoom.',
    cardDescHi: 'अपने बच्चे को स्वस्थ शरीर, एकाग्र मन और भावनात्मक कल्याण का उपहार दें! 7–13 वर्ष के बच्चों के लिए क्लासिकल हठ योग। हर रविवार, सुबह 11 – दोपहर 12 बजे, लाइव ज़ूम।',
    cardBenefits: ['Improves memory & concentration', 'Strengthens the spine', 'Boosts energy & immunity', 'Enhances emotional well-being'],
    cardDuration: '⏱ Every Sunday · 11 AM – 12 PM',
    cardTarget: 'Ages 7–13 · Live Zoom',
    heroLabel: 'Every Sunday | 11:00 AM – 12:00 PM | Live Zoom | Ages 7–13 | Pre-registration mandatory',
    subtitle: 'Every Sunday | 11 AM – 12 PM | Live Zoom',
    subtitleHi: 'हर रविवार | सुबह 11 – दोपहर 12 बजे | लाइव ज़ूम',
    pageDesc: 'Classical Hatha Yoga for Children 🧘\n\nGive your child the gift of a healthy body, a focused mind, and emotional well-being!\n\n📅 Every Sunday | 11:00 AM – 12:00 PM\n💻 Live Zoom Session\n👧 Age Group: 7–13 years\n\nGuided by a trained Sadhguru Gurukulam Hatha Yoga Teacher.\n\n🌱 A safe space for them to just BE (and grow)!\n\n📌 Pre-registration mandatory | Maximum of 5-6 children\n📲 Call/WhatsApp: +91 8950867190',
    pageDescHi: 'बच्चों के लिए क्लासिकल हठ योग 🧘\n\nअपने बच्चे को स्वस्थ शरीर, एकाग्र मन और भावनात्मक कल्याण का उपहार दें!\n\n📅 हर रविवार | सुबह 11:00 – दोपहर 12:00 बजे\n💻 लाइव ज़ूम सत्र\n👧 आयु वर्ग: 7–13 वर्ष\n\nप्रशिक्षित सद्गुरु गुरुकulam हठ योग शिक्षक द्वारा संचालित।\n\n🌱 उनके लिए बस होने (और बढ़ने) का एक सुरक्षित स्थान!\n\n📌 पूर्व-पंजीकरण अनिवार्य | केवल 5-6 सीटें उपलब्ध\n📲 कॉल/व्हाट्सएप: +91 8950867190',
    benefits: ['Improves memory & concentration', 'Strengthens the spine', 'Boosts energy & immunity', 'Enhances emotional well-being'],
    benefitsHi: ['स्मरण शक्ति और एकाग्रता में सुधार', 'रीढ़ की हड्डी को मज़बूत करता है', 'ऊर्जा और प्रतिरक्षा को बढ़ाता है', 'भावनात्मक कल्याण को बढ़ाता है'],
    link: 'programs/childrens-yoga.html',
    linkText: 'Register for Children\'s Yoga',
    linkTextHi: 'बाल योग के लिए पंजीकरण करें',
    featured: false,
    isFree: false,
    active: true,
  },
  {
    id: 'cervical-back-pain',
    tag: '✦ Spinal Health · Live Online',
    tagHi: '✦ रीढ़ की हड्डी का स्वास्थ्य · लाइव ऑनलाइन',
    title: 'Cervical & Back Pain Yoga',
    titleHi: 'सर्वाइकल और पीठ दर्द योग',
    image: 'assets/images/cervical-back-pain-workshop.webp',
    imgContain: true,
    cardDesc: 'A live online workshop on cervical and back pain, featuring a 10-minute practice structured by Sadhguru to relieve neck, shoulder, and back discomfort and strengthen the spine.',
    cardDescHi: 'सद्गुरु द्वारा संरचित 10 मिनट के अभ्यास के साथ सर्वाइकल और पीठ दर्द पर एक लाइव ऑनलाइन कार्यशाला। गर्दन, कंधे और पीठ के दर्द से राहत और रीढ़ को मजबूती।',
    cardBenefits: [
      '10-minute practice structured by Sadhguru',
      'Relieves neck, cervical & back discomfort',
      'Strengthens the spine & core muscles',
      'Live Q&A with Classical Yoga teacher'
    ],
    cardDuration: '⏱ 1 Hour · Live Online',
    cardTarget: 'Ages 14+',
    heroLabel: 'Live Online Workshop · 1 Hour · Ages 14+',
    subtitle: 'Strengthen the spine before it gets too late',
    subtitleHi: 'बहुत देर होने से पहले रीढ़ को मजबूत करें',
    pageDesc: 'A live online workshop on cervical and back pain, with a 10-minute practice structured by Sadhguru.',
    pageDescHi: 'सद्गुरु द्वारा संरचित 10 मिनट के अभ्यास के साथ सर्वाइकल और पीठ दर्द पर एक लाइव ऑनलाइन कार्यशाला।',
    benefits: [
      'Learn a practice structured by Sadhguru',
      'Live Q&A with a trained Classical Hatha Yoga teacher',
      'Free participation for next 3 months as post-programme support',
      'Relief from cervical, neck, and back stiffness'
    ],
    benefitsHi: [
      'सद्गुरु द्वारा संरचित अभ्यास सीखें',
      'प्रशिक्षित क्लासिकल हठ योग शिक्षक के साथ लाइव प्रश्नोत्तर',
      'पोस्ट-प्रोग्राम सहायता के रूप में अगले 3 महीनों के लिए मुफ्त भागीदारी',
      'सर्वाइकल, गर्दन और पीठ की अकड़न से राहत'
    ],
    link: 'programs/yoga-cervical-back-pain-workshop.html',
    linkText: 'Explore Workshop',
    linkTextHi: 'अधिक जानें / देखें',
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
function applyEmailLinks(root) {
  if (typeof SITE_CONFIG === 'undefined' || !SITE_CONFIG.email) return;
  (root || document).querySelectorAll('[data-email]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = `mailto:${SITE_CONFIG.email}`;
    }
    el.textContent = SITE_CONFIG.email;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyWaLinks();
  applyEmailLinks();
});
