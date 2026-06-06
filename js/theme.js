// Header scroll shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Modal
function openModal(e) {
  if (e) e.preventDefault();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Forms
function handleSubscribe(e) {
  e.preventDefault();
  alert(currentLang === 'ka' ? 'გმადლობთ! თქვენ გამოიწერეთ.' : "Thank you! You're subscribed.");
  e.target.reset();
}

function handleBooking(e) {
  e.preventDefault();
  alert(currentLang === 'ka' ? 'მოთხოვნა გაიგზავნა! 24 საათში დაგიკავშირდებით.' : "Your request has been sent! We'll be in touch within 24 hours.");
  closeModal();
  e.target.reset();
}

// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.querySelector('nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// ── Language dropdown ────────────────────────────────────────

function toggleLangDropdown(e) {
  e.stopPropagation();
  document.querySelector('.lang-dropdown').classList.toggle('open');
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelector('.lang-current').childNodes[0].textContent = lang.toUpperCase() + ' ';
  document.querySelectorAll('.lang-options li').forEach(li => {
    li.classList.toggle('active', li.textContent.trim().toLowerCase() === lang);
  });
  document.querySelector('.lang-dropdown').classList.remove('open');
  applyTranslations(lang);
}

document.addEventListener('click', () => {
  document.querySelector('.lang-dropdown')?.classList.remove('open');
});

// ── Translations ─────────────────────────────────────────────

const translations = {
  en: {
    'nav-about': 'About',
    'nav-adventures': 'Adventures',
    'nav-hikes': 'Trips',
    'nav-reviews': 'Reviews',
    'nav-newsletter': 'Newsletter',
    'btn-cta': 'Go Out',
    'hero-tag': 'Outdoor Adventures',
    'hero-h1': 'We do <em>big</em> and small adventures',
    'hero-p': 'Exploring the world around us, with a conscious and responsible attitude toward our own one and only, best possible life.',
    'btn-hikes': 'See Trips',
    'btn-story': 'Our Story',
    'hikes-tag': 'Featured Routes',
    'hikes-title': 'Upcoming Trips',
    'hikes-subtitle': 'Carefully curated routes for every level of adventurer.',
    'hikes-view-all': 'View All Routes',
    'link-learn-more': 'Learn more',
    'hike-mravaltskaro-name': 'Mravaltskaro',
    'hike-mravaltskaro-desc': 'Georgia\'s "Martian" landscape — red-and-yellow hills reflected in a still reservoir, deep in the Gareji semi-desert of Kvemo Kartli.',
    'hike-kazbegi-name': 'Kazbegi Ridge',
    'hike-kazbegi-desc': 'High-altitude traverse with views of Gergeti Trinity Church and the Greater Caucasus.',
    'hike-svaneti-name': 'Svaneti Traverse',
    'hike-svaneti-desc': 'Classic Mestia–Ushguli route through medieval tower villages and alpine meadows.',
    'hike-martvili-name': 'Martvili Canyon',
    'hike-martvili-desc': 'A limestone canyon carved by the Abasha River in western Georgia — 700m trail with bridges, viewpoints, and boat tours along emerald-green waters.',
    'hike-tusheti-name': 'Tusheti High Road',
    'hike-tusheti-desc': 'Remote wilderness route through the wildest and most remote corner of Georgia.',
    'hike-sup-name': 'Tbilisi Sea SUP',
    'hike-sup-desc': 'Rent a SUP board, drift across still water, and watch the sun sink behind the Caucasus hills in one of Tbilisi\'s most dramatic sunsets.',
    'hike-vardzia-name': 'Vardzia',
    'hike-vardzia-desc': 'A 12th-century cave city carved into Erusheti Mountain — over 300 interconnected chambers across 13 levels, built during Queen Tamar\'s reign with frescoes and a water system still intact.',
    'hike-kakheti-name': 'Kakheti Wine Tour',
    'hike-kakheti-desc': 'Georgia\'s wine heartland — ancient qvevri cellars, the 11th-century Alaverdi Cathedral, and sun-drenched Alazani Valley vineyards at harvest season.',
    'stat-1-label': 'People trust us and come back for more adventures',
    'stat-2-label': 'Checked and well-known routes in our library',
    'stat-3-label': 'Smiles and wow-s in our adventures',
    'story-tag': 'Our Story',
    'story-h2': 'It started as a <em>bet</em><br>in the mountains',
    'story-p1': 'In the summer of 2019, Nino Kalandadze — a Tbilisi-based biologist with an unhealthy obsession with topographic maps — convinced seven friends to spend a week in Tusheti. No itinerary, no gear list, just a hand-drawn route and a bag full of churchkhela. They got rained on for three days straight, a horse ate someone\'s jacket liner on day four, and by the last night around the fire, everyone agreed it was the best week of their lives.',
    'story-p2': 'By 2021, the group chats asking "when\'s the next one?" had gotten out of hand. Nino spent six months walking every route she planned to offer — Kazbegi ridges at 5am, the Svaneti traverse in September snow, the semi-desert around Mravaltskaro she\'d been visiting since childhood. Then she launched Geotripster with one rule: every trip must be something she\'d genuinely want to go on herself.',
    'story-p3': 'Today there are four of us: a mountain guide from Mestia who grew up speaking Svan, a cook who believes camp food should be embarrassingly good, a logistics person who somehow makes the impossible happen in the most remote corners of Georgia — and Nino, still with too many maps. We walk every new route before opening bookings. We eat the same food as our guests. We carry our own packs.',
    'philosophy-tag': 'Our Approach',
    'philosophy-title': 'Meticulous organization,<br><em>delicious food</em>, and a friendly vibe',
    'philosophy-subtitle': 'We believe every trip should feel effortless for you — that means sweating the logistics so you can just show up, breathe the mountain air, and be present.',
    'feature-safety-title': 'Safety First',
    'feature-safety-text': 'Every route is scouted, weather-monitored, and equipped with first-aid and emergency protocols.',
    'feature-groups-title': 'Small Groups',
    'feature-groups-text': 'Groups of 6–12 people mean a personal experience, flexible pace, and real connection.',
    'feature-vibes-title': 'Good Vibes Only',
    'feature-vibes-text': 'Camp cooking, camp fires, honest conversations — the best friendships start on a trail.',
    'reviews-tag': 'Testimonials',
    'reviews-title': 'What our guests say',
    'review-1-text': '"The organization was flawless — route, food, gear, pace. I\'ve been on other trips where the guide clearly winged it, but here every detail was thought through. The views from the ridge on day two genuinely made me cry. I booked the next trip before we even got back to Tbilisi."',
    'review-1-trip': 'Borjomi–Kharagauli, May 2025',
    'review-2-text': '"I was worried as a solo traveler — I didn\'t know anyone. By the second evening around the fire, it felt like I\'d known the group for years. The guides read the group\'s energy perfectly and adjusted the pace without ever making it feel like a compromise."',
    'review-2-trip': 'Kazbegi Ridge, August 2025',
    'review-3-text': '"The Svaneti traverse is already a legendary route, but what made it special was the team. Local food at every stop, fascinating stories about the villages, and no rush — we actually had time to sit and absorb each place. Absolutely life-changing."',
    'review-3-trip': 'Svaneti Traverse, July 2025',
    'review-4-text': '"I\'m not a hardcore hiker — I was nervous about keeping up. The team was incredibly supportive without being patronizing. Camp dinners were genuinely restaurant-level. I left feeling like I could take on anything. Already planning to come back for Tusheti."',
    'review-4-trip': 'Lagodekhi, September 2025',
    'newsletter-tag': 'Stay Updated',
    'newsletter-title': 'Get the next adventure<br>in your inbox',
    'newsletter-p': 'New routes, early-bird spots, and field notes — straight from the trail to you.',
    'newsletter-btn': 'Subscribe',
    'newsletter-policy': 'I agree to the ',
    'footer-tagline': 'Conscious adventures in the wild places of the world.',
    'footer-explore': 'Explore',
    'footer-home': 'Home',
    'footer-hikes-link': 'Trips',
    'footer-adventures-link': 'Adventures',
    'footer-company': 'Company',
    'footer-about-link': 'About Us',
    'footer-reviews-link': 'Reviews',
    'footer-terms': 'Terms',
    'footer-privacy': 'Privacy',
    'footer-contact': 'Contact',
    'footer-instagram': 'Instagram',
    'footer-telegram': 'Telegram',
    'footer-email': 'Email Us',
    'footer-book': 'Book Now',
    'footer-copyright': '© 2026 Geotripster. All rights reserved.',
    'modal-title': 'Book Your Adventure',
    'modal-p': 'Fill in the form and we\'ll get back to you within 24 hours.',
    'modal-name-label': 'Your Name',
    'modal-email-label': 'Email',
    'modal-route-label': 'Choose a Route',
    'modal-message-label': 'Message (optional)',
    'modal-submit': 'Send Request',
    'ph-newsletter-email': 'your@email.com',
    'ph-modal-name': 'Jane Smith',
    'ph-modal-email': 'jane@example.com',
    'ph-modal-message': 'Any questions or special requests…',
  },
  ka: {
    'nav-about': 'ჩვენ შესახებ',
    'nav-adventures': 'თავგადასავლები',
    'nav-hikes': 'ტურები',
    'nav-reviews': 'შეფასებები',
    'nav-newsletter': 'სიახლეები',
    'btn-cta': 'გასვლა',
    'hero-tag': 'გარე თავგადასავლები',
    'hero-h1': 'ვაკეთებთ <em>დიდ</em> და პატარა თავგადასავლებს',
    'hero-p': 'ვიკვლევთ ჩვენ გარშემო სამყაროს — გაცნობიერებული და პასუხისმგებლური დამოკიდებულებით ჩვენი ერთადერთი, ყველაზე საუკეთესო ცხოვრების მიმართ.',
    'btn-hikes': 'ტურები',
    'btn-story': 'ჩვენი ისტორია',
    'hikes-tag': 'რჩეული მარშრუტები',
    'hikes-title': 'მომავალი ტურები',
    'hikes-subtitle': 'გულდასმით შერჩეული მარშრუტები ყველა დონის მოგზაურისთვის.',
    'hikes-view-all': 'ყველა მარშრუტი',
    'link-learn-more': 'გაიგე მეტი',
    'hike-mravaltskaro-name': 'მრავალწყარო',
    'hike-mravaltskaro-desc': '„ქართული მარსი" — წითელ-ყვითელი ბორცვები გარეჯის ნახევარ-უდაბნოში, წყალსაცავში აირეკლება.',
    'hike-kazbegi-name': 'ყაზბეგის ქედი',
    'hike-kazbegi-desc': 'მაღალმთიანი გადასვლა გერგეტის სამების ეკლესიის და დიდი კავკასიონის ხედებით.',
    'hike-svaneti-name': 'სვანეთის გადაკვეთა',
    'hike-svaneti-desc': 'კლასიკური მესტია–უშგულის მარშრუტი შუა საუკუნეების კოშკის სოფლებით და ალპური მდელოებით.',
    'hike-martvili-name': 'მარტვილის კანიონი',
    'hike-martvili-desc': 'კირქვის კანიონი, ამოკვეთილი აბაშა მდინარის მიერ — 700მ ბილიკი ხიდებით, სათვალთვალო მოედნებით და ნავების ტური მწვანე წყლებზე.',
    'hike-tusheti-name': 'თუშეთის მთავარი გზა',
    'hike-tusheti-desc': 'შორეული ველური მარშრუტი საქართველოს ყველაზე ველური და მიუდგომელი კუთხით.',
    'hike-sup-name': 'თბილისის ზღვა SUP',
    'hike-sup-desc': 'SUP დაფა, წყნარი წყალი და კავკასიის გორებს მიღმა ჩამავალი მზე — თბილისის ყველაზე შთამბეჭდავი მზის ჩასვლა.',
    'hike-vardzia-name': 'ვარძია',
    'hike-vardzia-desc': 'XII საუკუნის მღვიმის ქალაქი ერუშეთის მთაში — 300-ზე მეტი დამაკავშირებელი ოთახი 13 დონეზე, დედოფალ თამარის ეპოქის ფრესკებით.',
    'hike-kakheti-name': 'კახეთის ღვინის ტური',
    'hike-kakheti-desc': 'საქართველოს ღვინის გული — უძველესი ქვევრის მარნები, XI საუკუნის ალავერდის ტაძარი და ყურძნის მოსავლის სეზონი.',
    'stat-1-label': 'ადამიანი გვენდობა და ახალ თავგადასავლებზე ბრუნდება',
    'stat-2-label': 'შემოწმებული მარშრუტი ჩვენს ბიბლიოთეკაში',
    'stat-3-label': 'ღიმილი და აღფრთოვანება ჩვენს ლაშქრობებში',
    'story-tag': 'ჩვენი ისტორია',
    'story-h2': 'ეს მთებში <em>ფსონით</em><br>დაიწყო',
    'story-p1': '2019 წლის ზაფხულში, ნინო კალანდაძემ — თბილისელმა ბიოლოგმა, ტოპოგრაფიული რუქებისადმი ჯანსაღი შეყვარებულობით — შვიდი მეგობარი დაარწმუნა ერთი კვირა თუშეთში გაეტარებინა. გეგმა? ხელნაწერი მარშრუტი და ჩანთა სავსე ჩურჩხელით. სამი დღე წვიმაში, მეოთხე დღეს ცხენმა ვიღაცის ქურთუკი შეჭამა — და ბოლო ღამეს კოცონთან ყველამ ერთხმად განაცხადა: ყველაზე კარგი კვირა ცხოვრებაში.',
    'story-p2': '2021 წლისთვის ჯგუფური ჩათები „როდის იქნება მომდევნო?" კითხვებით გადაჭარბებული გახდა. ნინომ ექვსი თვე გაატარა ყველა გეგმიური მარშრუტის გავლაში — კაზბეგის ქედებზე გამთენიისას, სვანეთის გადაკვეთა სექტემბრის თოვლში, მრავალწყარო, სადაც ბავშვობიდან დადიოდა. შემდეგ ერთი წესით დააარსა Geotripster: ყოველი ლაშქრობა ისეთი უნდა იყოს, რომ თავადაც სიამოვნებით წახვიდეს.',
    'story-p3': 'დღეს ოთხნი ვართ: მესტიელი მეგზური, რომელიც სვანურ ენაზე გაიზარდა; მზარეული, რომელიც ფიქრობს, რომ ბანაკის საჭმელი გასაოცრად გემრიელი უნდა იყოს; ლოჯისტიკის სპეციალისტი, რომელიც შეუძლებელს ახდენს — და ნინო, კვლავ ძალიან ბევრი რუქით. ყოველ ახალ მარშრუტს ჯავშნის გახსნამდე ვდივართ. ჩვენ იმავე საჭმელს ვჭამთ. ჩვენი ჩანთები ჩვენ გვაქვს.',
    'philosophy-tag': 'ჩვენი მიდგომა',
    'philosophy-title': 'გულდასმითი ორგანიზება,<br><em>გემრიელი საჭმელი</em> და მეგობრული განწყობა',
    'philosophy-subtitle': 'ჩვენ გვჯერა, რომ ყოველი მოგზაურობა შენთვის უზრუნველყოფილი უნდა იყოს — ჩვენ ვზრუნავთ ლოჯისტიკაზე, შენ კი უბრალოდ მოდი, ისუნთქე მთის ჰაერი და იყავი ამ მომენტში.',
    'feature-safety-title': 'უსაფრთხოება პირველია',
    'feature-safety-text': 'ყოველი მარშრუტი შემოწმებულია, ამინდი მონიტორინდება, პირველი დახმარება და საგანგებო პროტოკოლები მზადაა.',
    'feature-groups-title': 'პატარა ჯგუფები',
    'feature-groups-text': '6–12 კაციანი ჯგუფი ნიშნავს პირად გამოცდილებას, მოქნილ ტემპს და ნამდვილ კავშირს.',
    'feature-vibes-title': 'მხოლოდ კარგი განწყობა',
    'feature-vibes-text': 'ბანაკის სამზარეულო, კოცონი, გულწრფელი საუბრები — საუკეთესო მეგობრობა ბილიკზე იწყება.',
    'reviews-tag': 'მიმოხილვები',
    'reviews-title': 'რას ამბობენ ჩვენი სტუმრები',
    'review-1-text': '„ორგანიზება უნაკლო იყო — მარშრუტი, საჭმელი, აღჭურვილობა, ტემპი. ქედზე მეორე დღეს ხედმა ცრემლები მომგვარა. სანამ თბილისში დავბრუნდი, შემდეგ ლაშქრობა უკვე დავჯავშნე."',
    'review-1-trip': 'ბორჯომი–ხარაგაული, 2025 მაისი',
    'review-2-text': '„მარტო მოვდიოდი და ვღელავდი. მეორე საღამოს კოცონთან ვიგრძენი, თითქოს ამ ხალხს წლებია ვიცნობ. მეგზურებმა ჯგუფის განწყობა სრულყოფილად წაიკითხეს."',
    'review-2-trip': 'ყაზბეგის ქედი, 2025 აგვისტო',
    'review-3-text': '„სვანეთის გადაკვეთა უკვე ლეგენდარული მარშრუტია, მაგრამ გამოსაჩენი გახადა გუნდი. ყველა გაჩერებაზე ადგილობრივი საჭმელი, სოფლების ამბები — ცხოვრებაშეცვლელი გამოცდილება."',
    'review-3-trip': 'სვანეთის გადაკვეთა, 2025 ივლისი',
    'review-4-text': '„კატეგორიული მოლაშქრე არ ვარ და ვნერვიულობდი. გუნდი წარმოუდგენლად მხარდამჭერი იყო. ბანაკის სადილი რესტორანის დონეზე იყო. სახლში ვიგრძენი, რომ ყველაფრის გაკეთება შემიძლია."',
    'review-4-trip': 'ლაგოდეხი, 2025 სექტემბერი',
    'newsletter-tag': 'შეიტყვე სიახლეები',
    'newsletter-title': 'მომდევნო თავგადასავალი<br>შენს ფოსტაში',
    'newsletter-p': 'ახალი მარშრუტები, ადრეული ადგილები და საველე შენიშვნები — პირდაპირ ბილიკიდან შენამდე.',
    'newsletter-btn': 'გამოიწერე',
    'newsletter-policy': 'ვეთანხმები ',
    'footer-tagline': 'გაცნობიერებული თავგადასავლები სამყაროს ველური ადგილებში.',
    'footer-explore': 'გამოიკვლიე',
    'footer-home': 'მთავარი',
    'footer-hikes-link': 'ტურები',
    'footer-adventures-link': 'თავგადასავლები',
    'footer-company': 'კომპანია',
    'footer-about-link': 'ჩვენ შესახებ',
    'footer-reviews-link': 'შეფასებები',
    'footer-terms': 'პირობები',
    'footer-privacy': 'კონფიდენციალობა',
    'footer-contact': 'კონტაქტი',
    'footer-instagram': 'ინსტაგრამი',
    'footer-telegram': 'ტელეგრამი',
    'footer-email': 'დაგვიკავშირდი',
    'footer-book': 'დაჯავშნე',
    'footer-copyright': '© 2026 Geotripster. ყველა უფლება დაცულია.',
    'modal-title': 'დაჯავშნე თავგადასავალი',
    'modal-p': 'შეავსე ფორმა და 24 საათში დაგიკავშირდებით.',
    'modal-name-label': 'შენი სახელი',
    'modal-email-label': 'ელფოსტა',
    'modal-route-label': 'აირჩიე მარშრუტი',
    'modal-message-label': 'შეტყობინება (სურვილისამებრ)',
    'modal-submit': 'გაგზავნე მოთხოვნა',
    'ph-newsletter-email': 'შენი@ელფოსტა.ge',
    'ph-modal-name': 'მარიამ ბერიძე',
    'ph-modal-email': 'mariam@email.ge',
    'ph-modal-message': 'შეკითხვები ან სპეციალური მოთხოვნები…',
  }
};

let currentLang = 'en';

function applyTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  document.querySelectorAll('[data-name-en]').forEach(el => {
    el.textContent = lang === 'ka' ? (el.dataset.nameKa || el.dataset.nameEn) : el.dataset.nameEn;
  });
  document.querySelectorAll('[data-desc-en]').forEach(el => {
    el.textContent = lang === 'ka' ? (el.dataset.descKa || el.dataset.descEn) : el.dataset.descEn;
  });
  refreshWeatherLabels(lang);
}

// ── Weather API ──────────────────────────────────────────────────────────────

const wmoIcons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️',
  77: '🌨️', 80: '🌦️', 81: '🌧️', 82: '⛈️',
  85: '🌨️', 86: '❄️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
};

const wmoText = {
  0:  { en: 'Clear sky',          ka: 'მოწმენდილი' },
  1:  { en: 'Mainly clear',       ka: 'ძირითადად맑음' },
  2:  { en: 'Partly cloudy',      ka: 'ნაწილობრივ მოღრუბლული' },
  3:  { en: 'Overcast',           ka: 'მოღრუბლული' },
  45: { en: 'Foggy',              ka: 'ნისლიანი' },
  48: { en: 'Icy fog',            ka: 'ყინვიანი ნისლი' },
  51: { en: 'Light drizzle',      ka: 'მსუბუქი წვიმა' },
  53: { en: 'Drizzle',            ka: 'წვიმა' },
  55: { en: 'Heavy drizzle',      ka: 'ძლიერი წვიმა' },
  61: { en: 'Light rain',         ka: 'მსუბუქი წვიმა' },
  63: { en: 'Rain',               ka: 'წვიმა' },
  65: { en: 'Heavy rain',         ka: 'ძლიერი წვიმა' },
  71: { en: 'Light snow',         ka: 'მსუბუქი თოვა' },
  73: { en: 'Snow',               ka: 'თოვა' },
  75: { en: 'Heavy snow',         ka: 'ძლიერი თოვა' },
  77: { en: 'Snow grains',        ka: 'თოვლის მარცვლები' },
  80: { en: 'Light showers',      ka: 'მსუბუქი ნალექი' },
  81: { en: 'Showers',            ka: 'ნალექი' },
  82: { en: 'Heavy showers',      ka: 'ძლიერი ნალექი' },
  85: { en: 'Snow showers',       ka: 'თოვლის ნალექი' },
  86: { en: 'Heavy snow showers', ka: 'ძლიერი თოვლის ნალექი' },
  95: { en: 'Thunderstorm',       ka: 'ჭექა-ქუხილი' },
  96: { en: 'Thunderstorm + hail',ka: 'ჭექა-ქუხილი სეტყვით' },
  99: { en: 'Thunderstorm + hail',ka: 'ჭექა-ქუხილი სეტყვით' },
};

const weatherCache = {};

async function loadTripWeather(card) {
  const { lat, lon, start, end } = card.dataset;
  if (!lat || !lon || !start || !end) return;

  const cacheKey = `${lat},${lon},${start},${end}`;
  let data = weatherCache[cacheKey];

  if (!data) {
    try {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
      const res = await fetch(url);
      data = await res.json();
      weatherCache[cacheKey] = data;
    } catch {
      return;
    }
  }

  const daily = data.daily;
  if (!daily || !daily.weathercode) return;

  const codes = daily.weathercode;
  const maxTemps = daily.temperature_2m_max;
  const minTemps = daily.temperature_2m_min;

  const avgMax = Math.round(maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length);
  const avgMin = Math.round(minTemps.reduce((a, b) => a + b, 0) / minTemps.length);
  const dominantCode = codes.sort((a, b) =>
    codes.filter(v => v === b).length - codes.filter(v => v === a).length
  )[0];

  card.dataset.weatherCode = dominantCode;
  card.dataset.weatherMax = avgMax;
  card.dataset.weatherMin = avgMin;

  renderWeather(card, currentLang);
}

function renderWeather(card, lang) {
  const code = parseInt(card.dataset.weatherCode);
  const max = card.dataset.weatherMax;
  const min = card.dataset.weatherMin;
  if (isNaN(code) || max === undefined) return;

  const icon = wmoIcons[code] || '🌡️';
  const desc = (wmoText[code] || { en: '', ka: '' })[lang] || '';

  let el = card.querySelector('.trip-weather');
  if (!el) {
    el = document.createElement('div');
    el.className = 'trip-weather';
    const datesEl = card.querySelector('.hike-dates');
    datesEl.insertAdjacentElement('afterend', el);
  }

  el.innerHTML = `<span class="weather-icon">${icon}</span><span class="weather-temp">${max}° / ${min}°</span><span class="weather-desc">${desc}</span>`;
}

function refreshWeatherLabels(lang) {
  document.querySelectorAll('[data-weather]').forEach(card => {
    if (card.dataset.weatherCode !== undefined) {
      renderWeather(card, lang);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-weather]').forEach(card => loadTripWeather(card));
});
