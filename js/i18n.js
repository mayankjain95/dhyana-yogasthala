/**
 * js/i18n.js — Dhyana Yogasthala
 * Language toggle: English ↔ Hindi (हिंदी)
 *
 * Usage:
 *   • Add data-i18n="key"          to any static element whose textContent/innerHTML should swap.
 *   • Add data-i18n-placeholder="key" to inputs/textareas whose placeholder should swap.
 *   • Use t(en, hi) inside JS-rendered templates to pick the right string at render time.
 *   • Dispatch a custom 'langchange' event via document to re-render dynamic sections.
 */

const TRANSLATIONS = {
  hi: {
    // ── NAV ──────────────────────────────────────────────────────────────────
    'nav.what-is-yoga': 'क्लासिकल हठ योग क्या है',
    'nav.offerings':    'कार्यक्रम',
    'nav.teacher':      'शिक्षक',
    'nav.locations':    'स्थान',
    'nav.consult':      '🌿 शिक्षक से मिलें',
    'nav.enquire':      'पूछताछ करें',
    'nav.back':         '← मुख्य साइट पर वापस',

    // ── HERO ─────────────────────────────────────────────────────────────────
    'hero.label':           'क्लासिकल हठ योग · ईशा सर्टिफाइड',
    'hero.title':           'जहाँ शरीर बनता है<br>एक <em>पवित्र</em><br>यंत्र',
    'hero.sub':             'प्राचीन योगिक अभ्यास अपने शुद्धतम रूप में। सोनीपत, गुरुग्राम और पूरे भारत में ऑनलाइन सत्र।',
    'hero.explore':         'कार्यक्रम देखें',
    'hero.book':            'सत्र बुक करें',
    'hero.wa':              '🌿 शिक्षक से मिलें',
    'hero.badge.certified': '<strong>ईशा</strong>सर्टिफाइड शिक्षक',
    'hero.badge.practices': '<strong>10+</strong>अभ्यास',

    // ── UPCOMING PROGRAMS ─────────────────────────────────────────────────────
    'upcoming.label': 'मिस न करें',
    'upcoming.title': 'आगामी कार्यक्रम',
    'upcoming.empty': 'अभी कोई आगामी कार्यक्रम नहीं है। जल्द ही वापस देखें।',

    // ── WHAT IS YOGA ─────────────────────────────────────────────────────────
    'yoga.section.label':   'एक महत्वपूर्ण प्रश्न',
    'yoga.headline.line1':  'योग जीवन की हर<br>समस्या का हल नहीं है।',
    'yoga.headline.line2':  'योग ठीक वही हो सकता है<br>जो आपको अभी चाहिए।',
    'yoga.question':        'क्या आप इसे आज़माना चाहेंगे?',
    'yoga.para1':           'योग है क्या, सबसे पहले? सोचिए — आपको क्या लगता है यह है? जब आप "योग" शब्द बोलते हैं, तो हर किसी के मन में एक धारणा होती है कि यह क्या है या क्या होना चाहिए। <strong>लोग सोचते हैं योग का मतलब है सिर के बल खड़े होना,</strong> और सामान्य का मतलब है पैरों के बल।',
    'yoga.para2':           'योग शब्द का अर्थ है <strong>मिलन</strong> — या हम कह सकते हैं, अस्तित्व के साथ तालमेल में होना। अभी, आप स्वयं को शरीर और मन के रूप में अनुभव करते हैं। शरीर शारीरिक बीमारियों से गुज़र रहा है, या मन तनाव और अत्यधिक सोच से — यह सब इसलिए हो रहा है क्योंकि ये दोनों अस्तित्व के साथ तालमेल में नहीं हैं।',
    'yoga.animal':          'क्या आपने कभी किसी जानवर को तनाव में देखा है या घुटनों के दर्द से पीड़ित देखा है? नहीं — क्योंकि वे प्रकृति के साथ तालमेल में हैं। केवल इंसान ही दुखी हैं। प्राचीन योगियों द्वारा बनाया गया योग, बस उस प्राकृतिक तालमेल को वापस लाता है। शारीरिक स्वास्थ्य, मानसिक कल्याण, आनंद — ये स्वाभाविक परिणाम बन जाते हैं।',
    'yoga.cta':             'सरल फिर भी शक्तिशाली उपकरण।<br>आपके पास पहले से ही वह सब कुछ है जो आपको चाहिए।',

    // ── ABOUT CLASSICAL HATHA YOGA ───────────────────────────────────────────
    'about.label':      'प्राचीन विज्ञान',
    'about.title':      'क्लासिकल<br>हठ योग क्या है?',
    'about.quote':      '"आपका शारीरिक स्वास्थ्य, आपका मनोवैज्ञानिक कल्याण, और आपकी आध्यात्मिक संभावना इस बात पर निर्भर करती है कि आप अस्तित्व के साथ कितने संरेखित हैं। मूलतः, हठ योग इस संरेखण को स्थापित करने की दिशा में है।"',
    'about.quote.cite': '— सद्गुरु',
    'about.p1':         'क्लासिकल हठ योग एक सुव्यवस्थित विज्ञान है — व्यायाम नहीं, स्ट्रेचिंग नहीं, बल्कि शरीर, मन और ऊर्जा को अस्तित्व के नियमों के साथ संरेखित करने की एक सटीक तकनीक। हजारों वर्षों से अपनी शुद्धता में संरक्षित एक परंपरा में निहित, यह शारीरिक फिटनेस से बहुत परे स्वास्थ्य, आनंद और आंतरिक कल्याण का मार्ग प्रदान करता है।',
    'about.p2':         'ध्याना योगस्थल में, हर अभ्यास ठीक वैसे ही प्रदान किया जाता है जैसा <strong>सद्गुरु गुरुकुलम के माध्यम से सद्गुरु द्वारा प्रसारित किया गया</strong> है — दुनिया के सबसे कठोर योग शिक्षक प्रशिक्षण कार्यक्रमों में से एक। फिटनेस कोरियोग्राफी के रूप में नहीं, बल्कि परिवर्तन की एक पवित्र प्रक्रिया के रूप में।',
    'about.p3':         'ये विश्वास या दर्शन नहीं हैं। ये ऐसी तकनीकें हैं जो <strong>काम करती हैं, अगर आप इन पर काम करें।</strong>',

    // ── OFFERINGS ────────────────────────────────────────────────────────────
    'offerings.label': 'हम क्या प्रदान करते हैं',
    'offerings.title': 'कार्यक्रम',
    'offerings.intro': 'हमारे विविध कार्यक्रमों का अन्वेषण करें — गहन वर्कशॉप से लेकर गहन रिट्रीट तक।',

    // ── WORKSHOPS ────────────────────────────────────────────────────────────
    'workshops.title': 'वर्कशॉप',
    'workshops.desc': 'हम अंगमर्दन, सूर्य क्रिया और योगासन जैसे वर्कशॉप प्रदान करते हैं जो एक से पाँच दिन तक चलते हैं। प्रत्येक एक विशिष्ट योगिक अभ्यास सिखाने के लिए समर्पित है जिससे आप इसे स्वतंत्र रूप से जारी रख सकें, बिना किसी शिक्षक के निरंतर मार्गदर्शन के। ये शक्तिशाली कार्यक्रम सद्गुरु द्वारा संरचित किए गए हैं।',

    // ── TESTIMONIALS ─────────────────────────────────────────────────────────
    'testi.label':       'लोग क्या कहते हैं',
    'testi.title':       'उनसे जिन्होंने अभ्यास किया है',
    'testi.1.text':      'सूर्य क्रिया मुझे पूरे दिन बहुत ऊर्जावान और जीवंत रखती है।',
    'testi.1.author':    '— कल्पना',
    'testi.2.text':      'मैं अब अधिक समय तक ध्यान केंद्रित कर पाती हूँ।',
    'testi.2.author':    '— सिमोन, संयुक्त राज्य अमेरिका',
    'testi.3.text':      'केवल शारीरिक कल्याण ही नहीं — अभ्यासों ने स्पष्टता और आंतरिक संतुलन बनाया।',
    'testi.3.author':    '— कार्यक्रम प्रतिभागी',
    'testi.4.text':      'सबसे तात्कालिक प्रभावों में से एक जो मैंने देखा है वह है तनाव के स्तर में महत्वपूर्ण कमी। ऐसा लगता है मानो हर योग सत्र के साथ, एक बोझ उठ जाता है, और मैं हल्का और अधिक सहज महसूस करता हूँ।',
    'testi.4.author':    '— कार्यक्रम प्रतिभागी',

    // ── TEACHER ──────────────────────────────────────────────────────────────
    'teacher.section.label': 'शिक्षक',
    'teacher.name':          'श्रुति जैन',
    'teacher.title.line':    'सीए · क्लासिकल हठ योग शिक्षक · ईशा सर्टिफाइड',
    'teacher.bio1':          'श्रुति जैन की यात्रा उन दुनियाओं को जोड़ती है जिन्हें अधिकांश लोग असंबंधित मानते हैं — चार्टर्ड अकाउंटेंसी, कॉर्पोरेट जीवन, और क्लासिकल हठ योग का प्राचीन विज्ञान। सीए की योग्यता के बाद, उन्होंने <strong>PricewaterhouseCoopers</strong> और <strong>MaxLife Insurance</strong> जैसी संस्थाओं के साथ <strong>लगभग पाँच साल</strong> कॉर्पोरेट जगत में बिताए — और फिर एक गहरी पुकार का अनुसरण किया। इसके बाद उन्होंने <strong>ईशा योग केंद्र, कोयंबटूर में 24+ महीने</strong> बिताए, सद्गुरु गुरुकुलम में 21 सप्ताह का गहन शिक्षक प्रशिक्षण पूरा करते हुए।',
    'teacher.bio2':          'वर्षों में उन्होंने असाधारण रूप से विविध लोगों के साथ इन अभ्यासों को साझा किया है: छोटे बच्चों से लेकर भारतीय सेना के अधिकारियों तक, गृहिणियों से लेकर प्रमुख संगठनों के CEOs तक। वे प्रत्येक कक्षा में एक CA की सटीकता और एक समर्पित साधक की संवेदनशीलता लाती हैं।',
    'teacher.bio3':          'श्रुति <strong>सोनीपत और गुरुग्राम</strong> में पढ़ाती हैं और ऑनलाइन सत्र प्रदान करती हैं — क्लासिकल हठ योग को उन लोगों तक लाती हैं जिन्हें इसकी सबसे अधिक आवश्यकता है।',
    'teacher.pill.certified': 'ईशा सर्टिफाइड',
    'teacher.pill.ca':        'सीए पृष्ठभूमि',
    'teacher.pill.training':  '21-सप्ताह शिक्षक प्रशिक्षण',
    'teacher.pill.sonepat':   'सोनीपत',
    'teacher.pill.gurgaon':   'गुरुग्राम',
    'teacher.pill.online':    'ऑनलाइन',

    // ── LOCATIONS ────────────────────────────────────────────────────────────
    'locations.label':     'हमें खोजें',
    'locations.title':     'हम कहाँ पढ़ाते हैं',
    'loc.sonepat.name':    'सोनीपत',
    'loc.sonepat.detail':  'ध्याना योगस्थल के केंद्र में व्यक्तिगत वर्कशॉप और नियमित कक्षाएं।<br><br>812, सेक्टर 15, सोनीपत,<br>हरियाणा, भारत',
    'loc.gurgaon.name':    'गुरुग्राम',
    'loc.gurgaon.detail':  'व्यक्तिगत वर्कशॉप और नियमित कक्षाएं। सप्ताहदिनों और सप्ताहांत में उपलब्ध।<br><br>सेक्टर 54, गुरुग्राम,<br>हरियाणा, भारत',
    'loc.online.name':     'ऑनलाइन',
    'loc.online.detail':   'लचीले बैच समय के साथ लाइव सत्र — सुबह और शाम के विकल्प उपलब्ध।<br><br><em>भारत में कहीं भी</em>',

    // ── CONTACT ──────────────────────────────────────────────────────────────
    'contact.label':         'जुड़ें',
    'contact.title':         'हमसे संपर्क करें',
    'contact.address.label': 'पता',
    'contact.phone.label':   'फोन / व्हाट्सएप',
    'contact.email.label':   'ईमेल',
    'contact.wa.btn':        '🌿 शिक्षक से परामर्श करें',
    'contact.form.submit':   'पूछताछ भेजें →',
    'contact.success':       'आपकी रुचि के लिए धन्यवाद। श्रुति जल्द ही आपसे संपर्क करेंगी। 🙏',

    // ── FOOTER ───────────────────────────────────────────────────────────────
    'footer.tagline':        'क्लासिकल हठ योग · ईशा सर्टिफाइड',
    'footer.what-is-yoga':   'क्लासिकल हठ योग क्या है',
    'footer.offerings':      'कार्यक्रम',
    'footer.teacher':        'शिक्षक',
    'footer.contact':        'संपर्क',

    // ── PROGRAM PAGE STRINGS (used by program-page.js via t()) ───────────────
    'prog.form.label': 'पंजीकरण',
    'prog.form.title.free':  'निशुल्क सत्र के लिए पंजीकरण करें',
    'prog.form.title.paid':  'पंजीकरण करें',
    'prog.form.sub.free':    'यह सत्र पूरी तरह निशुल्क है। सीटें सीमित हैं — जल्दी पंजीकरण करें। सत्र से पहले आपको व्हाट्सएप या ईमेल पर जानकारी मिलेगी।',
    'prog.form.sub.paid':    'कृपया नीचे विवरण भरें। श्रुति 24 घंटे के भीतर आपके पंजीकरण की पुष्टि करेंगी।',
    'prog.submit.free':      'निशुल्क सत्र के लिए पंजीकरण करें →',
    'prog.submit.paid':      'पंजीकरण जमा करें →',
    'prog.submit.note.free': 'यह सत्र पूरी तरह निशुल्क है। सत्र से पहले आपको व्हाट्सएप या ईमेल पर जानकारी मिलेगी।',
    'prog.submit.note.paid': 'जमा करने के बाद, QR कोड के साथ भुगतान स्क्रीन दिखेगी। UPI ऐप से भुगतान करें। श्रुति 24 घंटे में पुष्टि करेंगी।',
    'prog.hero.book':        'पंजीकरण करें →',

    // ── PAYMENT & SUCCESS OVERLAYS ───────────────────────────────────────────
    'pay.title': 'अपना भुगतान पूरा करें',
    'pay.step1': 'Google Pay, PhonePe, Paytm, या किसी भी UPI ऐप से नीचे दिए गए QR कोड को स्कैन करें',
    'pay.step2': 'अपने चुने हुए कार्यक्रम के लिए भुगतान करें',
    'pay.step3': '"मैंने भुगतान कर दिया है" पर क्लिक करें — श्रुति 24 घंटे में पुष्टि करेंगी',
    'pay.upi.help': 'किसी भी UPI ऐप से स्कैन करें · श्रुति के साथ खोजें',
    'pay.btn': '✓ मैंने भुगतान कर दिया है — पंजीकरण पूरा करें',
    'success.title': 'आप पंजीकृत हैं!',
    'success.text1': 'के लिए आपका पंजीकरण प्राप्त हो गया है।',
    'success.text2': 'श्रुति 24 घंटे के भीतर आपके पंजीकरण की पुष्टि करने के लिए <strong>व्हाट्सएप या ईमेल</strong> के माध्यम से आपसे संपर्क करेंगी।',
    'success.text3': 'हम आपके साथ अभ्यास करने के लिए उत्सुक हैं।',
    'success.btn': 'होम पर वापस आएं',

    // ── FORM LABELS & PLACEHOLDERS ───────────────────────────────────────────
    'form.personal.title': 'व्यक्तिगत विवरण',
    'form.name.label': 'नाम <span class="req">*</span>',
    'form.name.ph': 'आपका पूरा नाम',
    'form.age.label': 'आयु <span class="req">*</span>',
    'form.age.ph': 'आपकी आयु',
    'form.gender.label': 'लिंग <span class="req">*</span>',
    'form.gender.male': 'पुरुष',
    'form.gender.female': 'महिला',
    'form.phone.label': 'मोबाइल / व्हाट्सएप नंबर <span class="req">*</span>',
    'form.phone.ph': '+91 XXXXX XXXXX',
    'form.email.label': 'ईमेल आईडी <span class="req">*</span>',
    'form.email.ph': 'आपका@email.com',
    'form.city.label': 'शहर और देश <span class="req">*</span>',
    'form.city.ph': 'उदा. दिल्ली, भारत',
    'form.emergency.label': 'आपातकालीन संपर्क नाम, संबंध और मोबाइल नंबर <span class="req">*</span>',
    'form.emergency.ph': 'उदा. प्रिया (बहन) — +91 98765 43210',
    'form.goal.title': 'आप योग के माध्यम से क्या प्राप्त करने की उम्मीद कर रहे हैं?',
    'form.goal.physical': 'शारीरिक कल्याण',
    'form.goal.stress': 'तनाव प्रबंधन',
    'form.goal.overall': 'समग्र स्वास्थ्य और आंतरिक कल्याण',
    'form.goal.mental': 'मानसिक और भावनात्मक कल्याण',
    'form.goal.spiritual': 'आध्यात्मिक विकास',
    'form.bg.title': 'पृष्ठभूमि',
    'form.bg.practiced': 'क्या आपने पहले योग का अभ्यास किया है?',
    'form.yes': 'हाँ',
    'form.no': 'नहीं',
    'form.na': 'लागू नहीं',
    'form.health.title': 'स्वास्थ्य संबंधी जानकारी',
    'form.health.preg': 'महिलाओं के लिए, क्या आप वर्तमान में गर्भवती हैं, गर्भावस्था की योजना बना रही हैं या पिछले 3 महीनों में जन्म दिया है? <span class="req">*</span>',
    'form.health.ailments': 'कृपया बताएं कि क्या आपको वर्तमान में या पहले कोई शारीरिक या मानसिक बीमारी हुई है। प्रकृति, अवधि और किसी भी उपचार का विवरण दें। <span class="req">*</span>',
    'form.health.ailments.hint': 'उदा. — गर्दन/पीठ दर्द, जोड़ों की समस्या, पुराना दर्द, अवसाद, मधुमेह, हृदय की स्थिति, उच्च/निम्न रक्तचाप, हर्निया',
    'form.health.ailments.ph': 'कृपया अपनी स्थिति(यों) का वर्णन करें, या \'कोई नहीं\' लिखें',
    'form.health.confidential': 'सभी जानकारी पूरी तरह से गोपनीय है और इसका उपयोग केवल आपके कार्यक्रम को वैयक्तिकृत करने के लिए किया जाता है।',
    'form.health.injury': 'यदि आपको पिछले 3 वर्षों में कोई गंभीर बीमारी, चोट या सर्जरी हुई है, तो कृपया विवरण दें। <span class="req">*</span>',
    'form.health.injury.ph': 'कृपया वर्णन करें, या \'कोई नहीं\' लिखें',
    'form.terms.title': 'घोषणा और शर्तें',
    'form.terms.consent': 'मैं एतद्द्वारा इस कार्यक्रम को पूरी तरह से करने का इच्छुक हूं। मैं समझता हूं कि योग प्रथाओं में भागीदारी स्वैच्छिक है। मैं कार्यक्रम की सामग्री को प्रत्यक्ष/अप्रत्यक्ष रूप से किसी और को संप्रेषित नहीं करूंगा। मैं समय पर सत्र में भाग लेने के लिए प्रतिबद्ध हूं। मैं एतद्द्वारा घोषणा करता हूं कि उपरोक्त जानकारी मेरे सर्वोत्तम ज्ञान के अनुसार सत्य, सटीक और पूर्ण है।',
    'form.terms.payment': '<strong style="color:var(--gold);">भुगतान और रद्दीकरण शर्तें:</strong> लागू शुल्क प्राप्त होने पर आपका पंजीकरण पूरा हो जाएगा। आवर्ती कार्यक्रमों के लिए, शुल्क का भुगतान मासिक आधार पर अग्रिम रूप से किया जाना चाहिए। उपलब्धता के अधीन पुनर्निर्धारण अनुरोधों को समायोजित किया जाता है।',
    'form.terms.payment.yes': 'हाँ, मैं समझता हूँ',
    'form.notes.title': 'और कुछ?',
    'form.notes.label': 'क्या कुछ और है जो आप चाहते हैं कि सत्र से पहले प्रशिक्षक को पता चले?',
    'form.notes.ph': 'आपके प्रश्न, अपेक्षाएं, या कुछ भी जो श्रुति को आपको बेहतर समर्थन देने में मदद करेगा...',
    
    // ── BACK LINK (subpage) ──────────────────────────────────────────────────
    'back.home': '← होम पर वापस',
  }
};

// ── Core helpers ──────────────────────────────────────────────────────────────

/** Returns current language: 'en' or 'hi' */
window.currentLang = function () {
  return localStorage.getItem('dy-lang') || 'en';
};

/**
 * Returns the right string based on the current language.
 * Use this inside any JS template literal: t('English text', 'हिंदी पाठ')
 */
window.t = function (en, hi) {
  return (currentLang() === 'hi' && hi) ? hi : en;
};

/** Returns a translation by key; falls back to the provided English default. */
window.tr = function (key, enFallback) {
  if (currentLang() === 'hi' && TRANSLATIONS.hi[key]) return TRANSLATIONS.hi[key];
  return enFallback || key;
};

// ── DOM patching ──────────────────────────────────────────────────────────────

/** Cache original English innerHTML before the very first swap. */
function cacheEnglish() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.dataset.i18nEn === undefined) el.dataset.i18nEn = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    if (el.dataset.i18nPlaceholderEn === undefined) el.dataset.i18nPlaceholderEn = el.placeholder || '';
  });
}

/** Applies a language to all data-i18n / data-i18n-placeholder elements. */
window.applyLang = function (lang) {
  localStorage.setItem('dy-lang', lang);
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';

  // Update toggle button visual state
  document.querySelectorAll('.lang-toggle .lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  const dict = TRANSLATIONS[lang] || {};

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang === 'hi' && dict[key] !== undefined) {
      el.innerHTML = dict[key];
    } else {
      if (el.dataset.i18nEn !== undefined) el.innerHTML = el.dataset.i18nEn;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (lang === 'hi' && dict[key] !== undefined) {
      el.placeholder = dict[key];
    } else {
      if (el.dataset.i18nPlaceholderEn !== undefined) el.placeholder = el.dataset.i18nPlaceholderEn;
    }
  });

  // Signal JS-rendered sections to re-render with the new language
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
};

/** Toggle between 'en' and 'hi', or force a specific lang. */
window.toggleLang = function (lang) {
  const next = lang || (currentLang() === 'en' ? 'hi' : 'en');
  applyLang(next);
};

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  cacheEnglish();
  const saved = localStorage.getItem('dy-lang');
  if (saved && saved !== 'en') {
    applyLang(saved);
  } else {
    // Just sync toggle button state for 'en'
    document.querySelectorAll('.lang-toggle .lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === 'en');
    });
  }
});
