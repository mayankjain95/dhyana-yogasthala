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
    tagHi: '✦ कैथल',
    title: 'Classical Hatha Yoga in Kaithal',
    titleHi: 'कैथल में क्लासिकल हठ योग',
    image: 'assets/images/hero-bg.webp',
    cardDesc: 'Yogasanas, Bhuta Shuddhi & Surya Kriya Review are coming to Kaithal! Join us from 14th - 16th August.',
    cardDescHi: 'योगासन, भूत शुद्धि और सूर्य क्रिया रिव्यू कैथल में आ रहे हैं! 14 से 16 अगस्त तक हमसे जुड़ें।',
    pageDesc: 'Namaskaram,\n\nClassical Hatha Yoga Programs are coming to Kaithal! 🙏\n\n🧘Yogasanas\n📅 14 Aug (Fri): 6:00 PM – 8:30 PM\n📅 15 Aug (Sat): 11:00 AM – 1:30 PM & 6:00 PM – 8:30 PM\n📅 16 Aug (Sun): 11:00 AM – 1:30 PM\n\n🔥 Bhuta Shuddhi\n📅 16 Aug (Sun): 3:00 PM – 4:15 PM\n\n☀️ Surya Kriya Review (for those already initiated into Surya Kriya)\n📅 16 Aug (Sun): 6:00 PM – 7:30 PM',
    pageDescHi: 'नमस्कारम्,\n\nक्लासिकल हठ योग कार्यक्रम कैथल में आ रहे हैं! 🙏\n\n🧘 योगासन\n📅 14 अगस्त (शुक्र): शाम 6:00 – 8:30 बजे\n📅 15 अगस्त (शनि): सुबह 11:00 – 1:30 बजे और शाम 6:00 – 8:30 बजे\n📅 16 अगस्त (रवि): सुबह 11:00 – 1:30 बजे\n\n🔥 भूत शुद्धि\n📅 16 अगस्त (रवि): दोपहर 3:00 – 4:15 बजे\n\n☀️ सूर्य क्रिया रिव्यू (जो पहले से सूर्य क्रिया में दीक्षित हैं उनके लिए)\n📅 16 अगस्त (रवि): शाम 6:00 – 7:30 बजे',
    subtitle: '14 - 16 Aug | Kaithal',
    subtitleHi: '14 - 16 अगस्त | कैथल',
    benefits: [
      'Yogasanas',
      'Bhuta Shuddhi',
      'Surya Kriya Review'
    ],
    benefitsHi: [
      'योगासन',
      'भूत शुद्धि',
      'सूर्य क्रिया रिव्यू'
    ],
    date: '14th–16th August',
    time: 'Multiple Timings',
    location: 'Pant nagar, Near Suncity, Kaithal',
    link: 'programs/kaithal.html',
    linkText: 'Know More / Register',
    linkTextHi: 'अधिक जानें / पंजीकरण करें',
    isFree: false,
    active: true,
  },
  {
    id: 'yogasanas',
    tag: '✦ Workshop',
    tagHi: '✦ वर्कशॉप',
    title: 'Yogasanas',
    titleHi: 'योगासन',
    image: 'assets/images/practice-yogasanas.webp',
    cardDesc: 'Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing.',
    cardDescHi: 'योगासन के माध्यम से, शरीर और मन को परम कल्याण की संभावना में रूपांतरित किया जा सकता है।',
    pageDesc: 'An asana is a dynamic way of meditating. Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing. These practices, transmitted in their classical form by Sadhguru, work at a level far deeper than physical exercise.',
    pageDescHi: 'एक आसन ध्यान का एक गतिशील तरीका है। योगासन के माध्यम से, शरीर और मन को परम कल्याण की संभावना में रूपांतरित किया जा सकता है। सद्गुरु द्वारा अपने शास्त्रीय रूप में प्रसारित ये अभ्यास, शारीरिक व्यायाम से कहीं गहरे स्तर पर काम करते हैं।',
    subtitle: 'Being in tune with the Existence',
    subtitleHi: 'अस्तित्व के साथ तालमेल में',
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
    date: '21st–24th July',
    time: '6:45 PM – 9:15 PM',
    location: 'Sec-15, Sonipat',
    link: 'programs/yogasanas.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: false,
  },
  {
    id: 'cervical-back-pain',
    tag: '✦ Free · Online Session',
    tagHi: '✦ निशुल्क · ऑनलाइन सत्र',
    title: 'Yoga for Cervical and Back Pain',
    titleHi: 'सर्वाइकल और पीठ दर्द के लिए योग',
    image: 'assets/images/practice-yoga-cervical-back-pain.webp',
    cardDesc: 'Discover how a few simple yet powerful yoga practices, designed by Sadhguru, can help relieve chronic neck and back pain and support long-term spinal health.',
    cardDescHi: 'जानें कैसे सद्गुरु द्वारा डिज़ाइन किए गए कुछ सरल लेकिन शक्तिशाली योग अभ्यास पुरानी गर्दन और पीठ दर्द में राहत दिला सकते हैं और दीर्घकालिक रीढ़ की हड्डी के स्वास्थ्य का समर्थन करते हैं।',
    pageDesc: 'Sometimes, the most complicated problems have surprisingly simple solutions.\n\nThe chronic neck and back pain you\'ve lived with for months—or years—may ease with a few simple, powerful yoga practices. These time-tested techniques, designed by Sadhguru, are easy to learn and can support spinal health, improve flexibility, and bring lasting relief with consistent practice.\n\nI know this pain firsthand—I\'ve lived through it myself. That\'s why I\'m offering this program for free.\n\nLooking forward to seeing you.',
    pageDescHi: 'कभी-कभी, सबसे जटिल समस्याओं के आश्चर्यजनक रूप से सरल समाधान होते हैं।\n\nजो पुराना गर्दन और पीठ दर्द आप महीनों — या वर्षों से झेल रहे हैं — वह कुछ सरल, शक्तिशाली योग अभ्यासों से कम हो सकता है। सद्गुरु द्वारा डिज़ाइन की गई ये समय-परीक्षित तकनीकें सीखना आसान हैं और नियमित अभ्यास से रीढ़ की हड्डी का समर्थन कर सकती हैं।\n\nमुझे यह दर्द खुद पता है — मैंने खुद इसे जिया है। इसीलिए मैं यह कार्यक्रम मुफ़्त दे रही हूँ।\n\nआपसे मिलने का इंतजार है।',
    subtitle: 'Free Classical Hatha Yoga · Online Session',
    subtitleHi: 'निशुल्क क्लासिकल हठ योग · ऑनलाइन सत्र',
    benefits: [
      'Supports spinal health & flexibility',
      'Techniques designed by Sadhguru',
      'Easy to learn — no prior experience needed',
      'Lasting relief with consistent practice',
      '100% Free — Online Live Session',
    ],
    benefitsHi: [
      'रीढ़ की हड्डी के स्वास्थ्य और लचीलेपन का समर्थन',
      'सद्गुरु द्वारा डिज़ाइन की गई तकनीकें',
      'सीखना आसान — कोई पूर्व अनुभव आवश्यक नहीं',
      'नियमित अभ्यास से स्थायी राहत',
      '100% निशुल्क — ऑनलाइन लाइव सत्र',
    ],
    date: '2 August 2026',
    time: '11:30 AM – 12:30 PM IST',
    location: 'Online (joining link will be shared upon registration)',
    link: 'programs/yoga-cervical-back-pain.html',
    linkText: 'Register Free →',
    linkTextHi: 'निशुल्क पंजीकरण करें →',
    isFree: true,
    active: false,
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
    tagHi: '✦ निशुल्क · व्यक्तिगत सत्र',
    title: 'Yoga for Inner Peace',
    titleHi: 'आंतरिक शांति के लिए योग',
    image: 'assets/images/yoga-inner-peace.webp',
    cardDesc: 'Join us for a rejuvenating hour dedicated to stillness and self-connection. This session will introduce a few simple yet powerful yogic practices designed to release physical tension, calm the mind, and restore natural balance.',
    cardDescHi: 'स्थिरता और आत्म-जुड़ाव को समर्पित एक ताज़गी भरे घंटे में हमसे जुड़ें। यह सत्र शारीरिक तनाव मुक्त करने, मन को शांत करने और प्राकृतिक संतुलन बहाल करने के लिए कुछ सरल लेकिन शक्तिशाली योगिक अभ्यास प्रस्तुत करेगा।',
    pageDesc: 'Join us for a rejuvenating hour dedicated to stillness and self-connection.\n\nThis session will introduce a few simple yet powerful yogic practices designed to release physical tension, calm the mind, and restore natural balance in the body followed by guided meditations that gently quiet the mental chatter, leaving you in a state of deep peace and clarity.\n\nNo prior experience needed.\n\nSeats are limited, so pre-registration is mandatory. Reserve your spot below and take the first step toward a calmer, more centered you.',
    pageDescHi: 'स्थिरता और आत्म-जुड़ाव को समर्पित एक ताज़गी भरे घंटे में हमसे जुड़ें।\n\nयह सत्र कुछ सरल लेकिन शक्तिशाली योगिक अभ्यास प्रस्तुत करेगा जो शारीरिक तनाव को मुक्त करने, मन को शांत करने और शरीर में प्राकृतिक संतुलन बहाल करने के लिए डिज़ाइन किए गए हैं — इसके बाद निर्देशित ध्यान जो मानसिक शोर को धीरे से शांत करता है, आपको गहरी शांति और स्पष्टता की अवस्था में छोड़ता है।\n\nकोई पूर्व अनुभव आवश्यक नहीं।\n\nसीटें सीमित हैं, इसलिए पूर्व-पंजीकरण अनिवार्य है। नीचे अपनी जगह बुक करें।',
    subtitle: 'Free Classical Hatha Yoga Session',
    subtitleHi: 'निशुल्क क्लासिकल हठ योग सत्र',
    benefits: [
      'Release physical tension',
      'Calm the mind',
      'Restore natural balance in the body',
      'Experience deep peace and clarity',
      'No prior experience needed'
    ],
    benefitsHi: [
      'शारीरिक तनाव मुक्त करें',
      'मन को शांत करें',
      'शरीर में प्राकृतिक संतुलन बहाल करें',
      'गहरी शांति और स्पष्टता का अनुभव करें',
      'कोई पूर्व अनुभव आवश्यक नहीं'
    ],
    date: '28th July 2026',
    time: '12:00 – 1:00 PM',
    location: 'Dhyana Yogasthala, 812, Sector-15, Sonepat',
    link: 'programs/yoga-inner-peace.html',
    linkText: 'Register Free →',
    linkTextHi: 'निशुल्क पंजीकरण करें →',
    isFree: true,
    active: false,
  },
  {
    id: 'surya-kriya-free',
    tag: '✦Suited for Beginners',
    tagHi: 'शुरुआती लोगों के लिए उपयुक्त',
    title: 'Surya Kriya',
    titleHi: 'सूर्य क्रिया',
    image: 'assets/images/practice-surya-kriya.webp',
    cardDesc: '"An asana is a dynamic form of meditating" - Sadhguru. Move. Breathe. Meditate. Transform.',
    cardDescHi: '"एक आसन ध्यान का एक गतिशील रूप है" — सद्गुरु। चलें। साँस लें। ध्यान करें। रूपांतरित हों।',
    pageDesc: 'Move. Breathe. Meditate. Transform.\n\n"An asana is a dynamic form of meditating" - Sadhguru\n\nJoin us for this Surya Kriya session. Pre-registration is mandatory and the program is suited for beginners.',
    pageDescHi: 'चलें। साँस लें। ध्यान करें। रूपांतरित हों।\n\n"एक आसन ध्यान का एक गतिशील रूप है" — सद्गुरु\n\nइस सूर्य क्रिया सत्र में हमसे जुड़ें। पूर्व-पंजीकरण अनिवार्य है और यह कार्यक्रम शुरुआती लोगों के लिए उपयुक्त है।',
    subtitle: 'Classical Hatha Yoga Session',
    subtitleHi: 'क्लासिकल हठ योग सत्र',
    benefits: [
      'Relieve Cervical & Back Pain',
      'Improve energy levels',
      'Bring mental clarity and emotional balance',
      'Brings inner stillness and ease',
      'Enhances meditativeness'
    ],
    benefitsHi: [
      'सर्वाइकल और पीठ दर्द से राहत',
      'ऊर्जा स्तर में सुधार',
      'मानसिक स्पष्टता और भावनात्मक संतुलन',
      'आंतरिक स्थिरता और सहजता',
      'ध्यान क्षमता में वृद्धि'
    ],
    date: 'Jul 30 – 1 Aug 2026',
    time: '1:45 – 3:45 PM',
    location: 'Dhyana Yogasthala, 812, Sec-15, Sonepat',
    link: 'programs/surya-kriya.html',
    linkText: 'Know More / Register',
    linkTextHi: 'अधिक जानें / पंजीकरण करें',
    isFree: false,
    active: true,
  },
  {
    id: 'cervical-back-pain-workshop',
    tag: '✦ 2-Day Online Workshop · ₹199',
    tagHi: '✦ 2-दिवसीय ऑनलाइन वर्कशॉप · ₹199',
    title: 'Relieve Cervical & Back Pain Naturally',
    titleHi: 'सर्वाइकल और पीठ दर्द से प्राकृतिक राहत',
    image: 'assets/images/cervical-back-pain-workshop-aug.webp',
    cardDesc: 'Struggling with neck pain, cervical discomfort, or back pain? Join our 2-Day Online Yoga Workshop and learn powerful Classical Hatha Yoga practices designed to support spinal health. Special offer: ₹199.',
    cardDescHi: 'गर्दन दर्द, सर्वाइकल या पीठ दर्द से परेशान हैं? हमारे 2-दिवसीय ऑनलाइन योग वर्कशॉप में शामिल हों और रीढ़ की सेहत के लिए क्लासिकल हठ योग अभ्यास सीखें। विशेष ऑफर: ₹199।',
    pageDesc: 'Struggling with neck pain, cervical discomfort, or back pain due to long hours of sitting, working, or daily stress?\n\nJoin our 2-Day Online Yoga Workshop and learn simple yet powerful Classical Hatha Yoga practices designed to support spinal health and overall well-being.\n\nLooking forward to practising with you. 🙏🌿',
    pageDescHi: 'लंबे समय तक बैठने, काम करने या रोजमर्रा के तनाव से गर्दन दर्द, सर्वाइकल या पीठ दर्द से परेशान हैं?\n\nहमारे 2-दिवसीय ऑनलाइन योग वर्कशॉप में शामिल हों और रीढ़ की सेहत व समग्र कल्याण के लिए सरल लेकिन शक्तिशाली क्लासिकल हठ योग अभ्यास सीखें।',
    subtitle: '8–9 Aug | Live Online | ₹199',
    subtitleHi: '8–9 अगस्त | लाइव ऑनलाइन | ₹199',
    benefits: [
      'Helps release stiffness and tension in the neck, shoulders, and lower back, providing lasting relief from chronic discomfort.',
      'Builds strength in the back and core muscles to support the spine.',
      'Improves Posture & Spinal Alignment helping reduce strain on the cervical and lumbar regions.',
      'Prevents the collapsing of the spine that happens as one ages.',
      'Brings balance and stability to the system and naturally boosts energy and mental alertness.',
    ],
    benefitsHi: [
      'गर्दन, कंधों और पीठ के निचले हिस्से की अकड़न व तनाव को दूर करने में मदद करता है, जिससे पुराने दर्द से स्थायी राहत मिलती है।',
      'पीठ और कोर की मांसपेशियों को मजबूत बनाता है, जो रीढ़ को सहारा देती हैं।',
      'मुद्रा और रीढ़ की हड्डी के संरेखण में सुधार करता है, जिससे सर्वाइकल और लम्बर क्षेत्रों पर दबाव कम होता है।',
      'उम्र के साथ होने वाली रीढ़ की हड्डी के झुकाव को रोकता है।',
      'तंत्र में संतुलन और स्थिरता लाता है और स्वाभाविक रूप से ऊर्जा व मानसिक सतर्कता को बढ़ाता है।',
    ],
    date: '8–9 August (Sat & Sun)',
    time: '3:30 PM – 4:45 PM IST',
    location: 'Live Online',
    link: 'programs/yoga-cervical-back-pain-workshop.html',
    linkText: 'Register Now →',
    linkTextHi: 'अभी पंजीकरण करें →',
    paymentMsg: 'Thank you for sharing your details. Please complete the payment to confirm your registration.',
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
    cardDesc: 'An ancient fitness system rooted in yoga for peak physical and mental wellbeing. No equipment. No gym. Just you and the power of your system.',
    cardDescHi: 'योग में निहित एक प्राचीन फिटनेस प्रणाली — शीर्ष शारीरिक और मानसिक कल्याण के लिए। कोई उपकरण नहीं। कोई जिम नहीं। बस आप और आपके सिस्टम की शक्ति।',
    cardBenefits: ['Build strength and stamina', 'Improve flexibility and agility', 'Strengthen the spine and muscular system', 'Bring lightness to the body'],
    cardDuration: '⏱ 4 days · 2.5 hrs each',
    cardTarget: 'Age 8+',
    heroLabel: 'Duration: 4 days · 2.5 hrs each | Fee: To Be Announced',
    subtitle: 'Yogic Fitness',
    subtitleHi: 'योगिक फिटनेस',
    pageDesc: 'An ancient fitness system rooted in yoga for peak physical and mental wellbeing. No equipment. No gym. Just you and the power of your system.',
    benefits: ['Build strength and stamina', 'Improve flexibility and agility', 'Strengthen the spine and muscular system', 'Bring lightness to the body'],
    link: 'programs/angamardana.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'surya-kriya',
    tag: 'Being in tune with the Sun',
    tagHi: 'सूर्य के साथ तालमेल में',
    title: 'Surya Kriya',
    titleHi: 'सूर्य क्रिया',
    image: 'assets/images/practice-surya-kriya.webp',
    cardDesc: 'Traditionally available only to select groups of yogis, Surya Kriya is being offered by Sadhguru for the hectic pace of today\'s world. A complete spiritual process by itself.',
    cardDescHi: 'परंपरागत रूप से केवल चुनिंदा योगियों के समूहों के लिए उपलब्ध, सूर्य क्रिया को सद्गुरु आज की व्यस्त दुनिया के लिए प्रदान कर रहे हैं। यह अपने आप में एक पूर्ण आध्यात्मिक प्रक्रिया है।',
    cardBenefits: ['Develop mental clarity, focus & concentration', 'Reduce overthinking', 'Boost energy levels', 'Balance hormonal levels', 'Prepare for deeper meditative states'],
    cardDuration: '⏱ 3 days · 2 hrs each',
    cardTarget: 'Age 14+',
    heroLabel: 'Duration: 3 days · 2 hrs each | Fee: To Be Announced',
    subtitle: 'Being in tune with the Sun',
    subtitleHi: 'सूर्य के साथ तालमेल में',
    pageDesc: 'Traditionally available only to select groups of yogis, Surya Kriya is being offered by Sadhguru for the hectic pace of today\'s world. A complete spiritual process by itself.',
    benefits: ['Develop mental clarity, focus & concentration', 'Reduce overthinking', 'Boost energy levels', 'Balance hormonal levels', 'Prepare for deeper meditative states'],
    link: 'programs/surya-kriya.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    isFree: false,
    active: true,
  },
  {
    id: 'yogasanas-workshop',
    tag: 'Being in tune with the Existence',
    tagHi: 'अस्तित्व के साथ तालमेल में',
    title: 'Yogasanas',
    titleHi: 'योगासन',
    image: 'assets/images/practice-yogasanas.webp',
    cardDesc: 'An asana is a dynamic way of meditating. Through Yogasanas, one can transform the body and mind into a possibility for ultimate wellbeing.',
    cardDescHi: 'एक आसन ध्यान का एक गतिशील तरीका है। योगासन के माध्यम से, शरीर और मन को परम कल्याण की संभावना में रूपांतरित किया जा सकता है।',
    cardBenefits: ['Improve physical health', 'Bring mental clarity and emotional balance', 'Create inner stillness and ease', 'Prepare the body for meditation'],
    cardDuration: '⏱ 4 days · 2.5 hrs each',
    cardTarget: 'Age 15+',
    link: 'programs/yogasanas.html',
    linkText: 'Know More / Explore',
    linkTextHi: 'अधिक जानें / देखें',
    active: true,
  },
  {
    id: 'bhuta-shuddhi',
    tag: 'Elemental Cleansing',
    tagHi: 'तत्व शुद्धि',
    title: 'Bhuta Shuddhi',
    titleHi: 'भूत शुद्धि',
    image: 'assets/images/practice-bhuta-shuddhi.webp',
    cardDesc: 'A process of cleansing the five fundamental elements — earth, water, fire, air, and space — within the human system. Laying the foundation for deeper health and higher yogic practices.',
    cardDescHi: 'मानव शरीर के भीतर पाँच मूलभूत तत्वों — पृथ्वी, जल, अग्नि, वायु और आकाश — को शुद्ध करने की प्रक्रिया। गहरे स्वास्थ्य और उच्चतर योगिक अभ्यासों की नींव रखना।',
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+ · Purification · Chronic Ailments',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: To Be Announced',
    subtitle: 'Elemental Cleansing',
    subtitleHi: 'तत्व शुद्धि',
    pageDesc: 'A process of cleansing the five fundamental elements — earth, water, fire, air, and space — within the human system. Laying the foundation for deeper health and higher yogic practices.',
    pageDescHi: 'मानव शरीर के भीतर पाँच मूलभूत तत्वों — पृथ्वी, जल, अग्नि, वायु और आकाश — को शुद्ध करने की प्रक्रिया। गहरे स्वास्थ्य और उच्चतर योगिक अभ्यासों की नींव रखना।',
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
    cardDesc: 'A meditative mudra that brings awareness to the eyes, ears, and nose simultaneously — cleansing and restoring the sensory system.',
    cardDescHi: 'एक ध्यानात्मक मुद्रा जो आंखों, कानों और नाक को एक साथ जागृत करती है — इंद्रिय तंत्र को शुद्ध और पुनर्स्थापित करती है।',
    cardBenefits: ['Helps with ailments of the ears, eyes, and nose', 'Brings a natural glow to the face', 'Improves vision', 'Enhances meditativeness — helps turn inward'],
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: To Be Announced',
    subtitle: 'Sensory Cleansing',
    subtitleHi: 'इंद्रिय शुद्धि',
    pageDesc: 'A meditative mudra that brings awareness to the eyes, ears, and nose simultaneously — cleansing and restoring the sensory system.',
    pageDescHi: 'एक ध्यानात्मक मुद्रा जो आंखों, कानों और नाक को एक साथ जागृत करती है — इंद्रिय तंत्र को शुद्ध और पुनर्स्थापित करती है।',
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
    cardDesc: 'A specialised set of yogic exercises for the eyes. Especially beneficial for long-sightedness and short-sightedness — aimed at relieving dependency on glasses over time.',
    cardDescHi: 'आंखों के लिए योगिक अभ्यासों का एक विशेष संचयन। दूरदृष्टि और निकटदृष्टि के लिए विशेष रूप से लाभदायक — समय के साथ चश्मे पर निर्भरता कम करने का लक्ष्य।',
    cardBenefits: ['Relieve strain from screens and long hours', 'Improve and support better vision', 'Lubricate and strengthen the ocular muscles', 'Prevent long-term eye fatigue'],
    cardDuration: '⏱ 2 days · 1 hr 15 mins each',
    cardTarget: 'Age 8+',
    heroLabel: 'Duration: 2 days · 1 hr 15 mins each | Fee: To Be Announced',
    subtitle: 'Eye Health',
    subtitleHi: 'नेत्र स्वास्थ्य',
    pageDesc: 'A specialised set of yogic exercises for the eyes. Especially beneficial for long-sightedness and short-sightedness — aimed at relieving dependency on glasses over time.',
    pageDescHi: 'आंखों के लिए योगिक अभ्यासों का एक विशेष संचयन। दूरदृष्टि और निकटदृष्टि के लिए विशेष रूप से लाभदायक — समय के साथ चश्मे पर निर्भरता कम करने का लक्ष्य।',
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
    cardDesc: 'A powerful breathing kriya that dramatically increases lung capacity, oxygenates the blood, and is particularly effective for respiratory problems, asthma, and low energy states.',
    cardDescHi: 'एक शक्तिशाली श्वास क्रिया जो फेफड़ां की क्षमता नाटकीय रूप से बढ़ाती है, रक्त को ऑक्सीजनेट करती है, और श्वसन तंत्र संबंधी समस्याओं, दमा और कम ऊर्जा के लिए विशेष रूप से प्रभावी है।',
    cardDuration: '⏱ 1 day · 1.5 hrs',
    cardTarget: 'Age 14+ · Respiratory · Meditation',
    heroLabel: 'Duration: 1 day · 1.5 hrs | Fee: To Be Announced',
    subtitle: 'Respiratory',
    subtitleHi: 'श्वसन तंत्र',
    pageDesc: 'A powerful breathing kriya that dramatically increases lung capacity, oxygenates the blood, and is particularly effective for respiratory problems, asthma, and low energy states.',
    pageDescHi: 'एक शक्तिशाली श्वास क्रिया जो फेफड़ां की क्षमता नाटकीय रूप से बढ़ाती है, रक्त को ऑक्सीजनेट करती है, और श्वसन तंत्र संबंधी समस्याओं, दमा और कम ऊर्जा के लिए विशेष रूप से प्रभावी है।',
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
    cardDesc: 'A classical nasal cleansing practice using saline water. Clears the nasal passage, sinuses, and ear-nose-throat pathways. Highly beneficial for allergies, sinusitis, and ENT concerns.',
    cardDescHi: 'नमक वाले पानी से नाक साफ़ करने की एक शास्त्रीय प्रक्रिया। नासिका मार्ग, साइनस और ENT नालिकाओं को साफ़ करती है। एलर्जी, साइनसाइटिस और ENT संबंधी समस्याओं के लिए अत्यंत लाभदायक।',
    cardDuration: '⏱ 1 day · 1 hr',
    cardTarget: 'Age 14+ · Ears · Nose · Throat',
    heroLabel: 'Duration: 1 day · 1 hr | Fee: To Be Announced',
    subtitle: 'ENT Health',
    subtitleHi: 'कान-नाक-गला स्वास्थ्य',
    pageDesc: 'A classical nasal cleansing practice using saline water. Clears the nasal passage, sinuses, and ear-nose-throat pathways. Highly beneficial for allergies, sinusitis, and ENT concerns.',
    pageDescHi: 'नमक वाले पानी से नाक साफ़ करने की एक शास्त्रीय प्रक्रिया। नासिका मार्ग, साइनस और ENT नालिकाओं को साफ़ करती है। एलर्जी, साइनसाइटिस और ENT संबंधी समस्याओं के लिए अत्यंत लाभदायक।',
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
    id: 'spiritual-retreat',
    tag: '✦ Immersive',
    tagHi: '✦ गहन अनुभव',
    title: 'Spiritual Retreat',
    titleHi: 'आध्यात्मिक रिट्रीट',
    image: 'assets/images/practice-spiritual-retreat.webp',
    cardDesc: 'A multi-day immersive retreat combining Classical Hatha Yoga practices, silence, inner work, and guided contemplation — a rare and deeply joyful opportunity for transformation. Every retreat is a journey — inward and outward.',
    cardDescHi: 'क्लासिकल हठ योग अभ्यास, मौन, आंतरिक कार्य और निर्देशित चिंतन को संयोजित करने वाला एक बहु-दिवसीय गहन रिट्रीट — रूपांतरण का एक दुर्लभ और गहराई से आनंदमय अवसर।',
    cardDuration: '⏱ Multi-day',
    cardTarget: 'Transformation · Depth',
    heroLabel: 'Duration: Multi-day | Fee: To Be Announced',
    subtitle: 'Immersive',
    subtitleHi: 'गहन अनुभव',
    pageDesc: 'A multi-day immersive retreat combining Classical Hatha Yoga practices, silence, inner work, and guided contemplation — a rare and deeply joyful opportunity for transformation. Every retreat is a journey — inward and outward.',
    pageDescHi: 'क्लासिकल हठ योग अभ्यास, मौन, आंतरिक कार्य और निर्देशित चिंतन को संयोजित करने वाला एक बहु-दिवसीय गहन रिट्रीट। प्रत्येक रिट्रीट एक यात्रा है — अंदर की ओर और बाहर की ओर।',
    benefits: ['Immerse in silence and inner work', 'Deepen your yoga and meditation practice', 'Experience guided contemplation', 'Transform your perspective on life'],
    benefitsHi: ['मौन और आंतरिक कार्य में डूबें', 'अपने योग और ध्यान अभ्यास को गहरा करें', 'निर्देशित चिंतन का अनुभव करें', 'जीवन के प्रति अपना नजरिया बदलें'],
    link: 'programs/spiritual-retreat.html',
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
    cardDuration: '⏱ 3-day In-person · Regular Weekend Online Classes',
    cardTarget: 'Pregnancy · Wellness',
    heroLabel: 'Duration: 3-day In-person · Regular Weekend Online Classes | Fee: To Be Announced',
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
    id: 'childrens-yoga-workshop',
    tag: 'Kids',
    tagHi: 'बच्चे',
    title: "Children's Yoga Workshop",
    titleHi: 'बाल योग वर्कशॉप',
    image: 'assets/images/practice-childrens-yoga.webp',
    cardDesc: 'A fun and engaging workshop that introduces children to the fundamentals of Classical Hatha Yoga while nurturing healthy habits, awareness, and joyful participation.',
    cardDescHi: 'एक मज़ेदार और आकर्षक वर्कशॉप जो बच्चों को क्लासिकल हठ योग की मूल बातों से परिचित कराता है, साथ ही स्वस्थ आदतों, जागरूकता और आनंदमय भागीदारी को पोषित करता है।',
    cardBenefits: ['Hatha Yoga Practices', 'Food & Nutrition', 'Games & Activities', 'Connecting with Nature'],
    cardDuration: '',
    cardTarget: '',
    heroLabel: 'Duration: 1 to 5 days | Fee: To Be Announced',
    subtitle: 'Kids',
    subtitleHi: 'बच्चों के लिए',
    pageDesc: 'A fun and engaging workshop that introduces children to the fundamentals of Classical Hatha Yoga while nurturing healthy habits, awareness, and joyful participation.',
    pageDescHi: 'एक मज़ेदार और आकर्षक वर्कशॉप जो बच्चों को क्लासिकल हठ योग की मूल बातों से परिचित कराता है, साथ ही स्वस्थ आदतों, जागरूकता और आनंदमय भागीदारी को पोषित करता है।',
    benefits: ['Hatha Yoga Practices', 'Food & Nutrition', 'Games & Activities', 'Connecting with Nature'],
    benefitsHi: ['हठ योग अभ्यास', 'खाना और पोषण', 'खेल और गतिविधियाँ', 'प्रकृति से जुड़ाव'],
    link: 'programs/childrens-yoga-workshop.html',
    linkText: 'Know More / Explore',
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
