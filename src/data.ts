import { Destination, TourPackage, Testimonial, BlogArticle } from './types';

export const destinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Santorini',
    country: 'Greece',
    price: 1200,
    rating: 4.9,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Famed for its dramatic views, whitewashed houses with blue domes, and active volcano, Santorini is the jewel of the Aegean Sea.',
    highlights: ['Breathtaking Sunset in Oia', 'Wine Tasting Tour', 'Black Sand Beaches', 'Catamaran Cruise']
  },
  {
    id: 'dest-2',
    name: 'Maldives',
    country: 'Indian Ocean',
    price: 1500,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    description: 'A tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands.',
    highlights: ['Overwater Bungalow Stay', 'Snorkeling with Manta Rays', 'Private Sandbank Dinner', 'Underwater Spa']
  },
  {
    id: 'dest-3',
    name: 'Paris',
    country: 'France',
    price: 1100,
    rating: 4.8,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'France\'s capital is a major European city and a global center for art, fashion, gastronomy, and culture.',
    highlights: ['Eiffel Tower Summit Access', 'Louvre Museum Guided Tour', 'Seine River Dinner Cruise', 'Macaron Making Class']
  },
  {
    id: 'dest-4',
    name: 'Dubai',
    country: 'UAE',
    price: 1000,
    rating: 4.7,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    description: 'Dubai is a city and emirate in the United Arab Emirates luxury shopping, ultramodern architecture and a lively nightlife scene.',
    highlights: ['Burj Khalifa 148th Floor', 'Desert Safari & BBQ Dinner', 'Dubai Mall Fountain Show', 'Palm Jumeirah Helicopter Tour']
  }
];

export const tourPackages: TourPackage[] = [
  {
    id: 'pkg-1',
    name: 'Bali Spiritual & Adventure Escape',
    location: 'Bali, Indonesia',
    duration: '5 Days / 4 Nights',
    price: 800,
    oldPrice: 1000,
    rating: 4.8,
    reviewsCount: 120,
    discountText: '-20% OFF',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse yourself in Balinese culture, visit sacred water temples, swing over lush rice terraces, and relax on pristine beaches.',
    highlights: ['Ubud Monkey Forest Visit', 'Tegalalang Rice Terrace Swing', 'Mount Batur Sunrise Trek', 'Uluwatu Temple Sunset Dance']
  },
  {
    id: 'pkg-2',
    name: 'Swiss Alps Luxury Scenic Journey',
    location: 'Zermatt & Lucerne, Switzerland',
    duration: '6 Days / 5 Nights',
    price: 1200,
    oldPrice: 1400,
    rating: 4.9,
    reviewsCount: 95,
    discountText: '-15% OFF',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    description: 'Travel through the heart of the Swiss Alps on the Glacier Express, explore alpine villages, and take in the majestic Matterhorn.',
    highlights: ['Glacier Express Scenic Train', 'Matterhorn Glacier Paradise', 'Lake Lucerne Private Boat Cruise', 'Mount Pilatus Cogwheel Railway']
  },
  {
    id: 'pkg-3',
    name: 'Thailand Tropical Paradise Tour',
    location: 'Phuket & Phi Phi Islands, Thailand',
    duration: '4 Days / 3 Nights',
    price: 600,
    oldPrice: 800,
    rating: 4.7,
    reviewsCount: 80,
    discountText: '-10% OFF',
    image: 'https://images.unsplash.com/photo-1528181304800-2f0904a9829d?auto=format&fit=crop&w=800&q=80',
    description: 'Sail across the emerald waters of Phang Nga Bay, discover secret limestone caves, snorkel in Phi Phi, and enjoy vibrant nightlife.',
    highlights: ['James Bond Island Longtail Boat Tour', 'Maya Bay Beach Snorkeling', 'Phuket Old Town Cultural Walk', 'Sunset Beach Dinner & Fire Show']
  },
  {
    id: 'pkg-4',
    name: 'New York Skyline & Broadway Explorer',
    location: 'Manhattan, New York, USA',
    duration: '7 Days / 6 Nights',
    price: 1500,
    oldPrice: 2000,
    rating: 4.9,
    reviewsCount: 110,
    discountText: '-25% OFF',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    description: 'Experience the electric energy of NYC. Climb architectural wonders, stroll Central Park, and watch an award-winning Broadway show.',
    highlights: ['SUMMIT One Vanderbilt Access', 'Broadway Show Premium Seats', 'Statue of Liberty Ferry Cruise', 'High Line & Chelsea Market Food Tour']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Emily Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'TravelGo made our dream vacation to Santorini absolutely flawless! Everything from the luxury transfers to the winery bookings was perfectly coordinated. The client support responded to my late-night questions within minutes!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    name: 'David Smith',
    location: 'London, UK',
    rating: 5,
    text: 'Best travel booking platform hands down. I booked the Swiss Alps package and was blown away by the service. The itinerary was highly engaging but allowed plenty of leisure time. Will be booking all my future vacations here!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Sophia Brown',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'Seamless planning and execution! The tropical tour in Thailand was spectacular. We saved at least 20% compared to booking the hotels and activities separately. The local tour guides were extremely knowledgeable and friendly.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  }
];

export const blogArticles: BlogArticle[] = [
  {
    id: 'blog-1',
    title: '10 Most Beautiful Places to Visit in Switzerland',
    date: 'May 10, 2024',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    category: 'Adventure',
    readTime: '6 Min Read',
    summary: 'Discover Switzerland\'s hidden valleys, high-altitude alpine lakes, and world-renowned peak views that belong on every traveler\'s bucket list.',
    author: 'Elena Rostova',
    content: [
      'Switzerland is a country of unrivaled landscapes, characterized by dramatic Alpine ridges, crystal-clear glacial lakes, and fairytale-like villages. If you are planning an expedition, selecting the absolute best spots can be daunting.',
      '1. Lauterbrunnen Valley: Known as the valley of 72 waterfalls, this mesmerizing gorge is surrounded by towering vertical rock faces. The Staubbach Falls plunges almost 300 meters, misting the entire green village below.',
      '2. The Gornergrat, Zermatt: Take Europe\'s highest open-air cogwheel railway up to 3,089 meters. The panoramic view covers 29 peaks over 4,000 meters, including the imposing, asymmetric pyramid of the Matterhorn.',
      '3. Lake Oeschinen: Situated above Kandersteg, this turquoise lake fed by glacial brooks is surrounded by 3,000-meter cliffs. It\'s a perfect haven for swimming, rowing, and panoramic hiking.',
      '4. Grindelwald First: If you seek adrenaline, walk the First Cliff Walk—a suspended steel path hugging the cliffside—or fly down the zipline towards the Eiger Nordwand.',
      'Whether you are visiting in the snow-draped winter or the wildflower-perfumed summer, Switzerland delivers a magical, timeless adventure.'
    ]
  },
  {
    id: 'blog-2',
    title: 'A Complete Luxury Guide to the Maldives in 2024',
    date: 'May 12, 2024',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    category: 'Luxury',
    readTime: '8 Min Read',
    summary: 'Everything you need to know about planning a luxury escape, selecting the perfect overwater villa, and experiencing world-class dining underwater.',
    author: 'Marcus Vance',
    content: [
      'The Maldives has long been synonymous with secluded luxury. Spanning over a thousand coral islands, this ocean sanctuary offers some of the most exclusive resort experiences in the entire world.',
      'Choosing the Right Atoll: Depending on your interests, select your atoll carefully. Baa Atoll, a UNESCO Biosphere Reserve, is unparalleled for marine life, particularly if you want to swim with hundreds of manta rays in Hanifaru Bay.',
      'The Overwater Villa Experience: Opt for villas with private infinity pools, direct lagoon ladders, and glass floor panels to observe the reef below your feet. Many premium properties now offer slides connecting the master suite directly to the turquoise sea.',
      'Underwater Gastronomy: Dine five meters below the sea surface at world-famous glass underwater restaurants. Savor five-star tasting menus surrounded by 360-degree views of coral gardens, reef sharks, and sea turtles.',
      'Eco-Conscious Travel: Ensure your resort practices sustainable tourism. Many luxury islands now feature coral propagation nurseries where guests can sponsor and plant their own reef fragments.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Top 5 Budget-Friendly Countries to Travel This Year',
    date: 'May 15, 2024',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=800&q=80',
    category: 'Budget Travel',
    readTime: '5 Min Read',
    summary: 'Travel far and wide without breaking the bank. These five destinations offer rich culture, breathtaking scenery, and incredible value.',
    author: 'Sarah Jenkins',
    content: [
      'Traveling does not require spending your life savings. Some of the world\'s most vibrant destinations offer incredibly affordable lodging, delicious street food, and rich historical exploration for under $40 a day.',
      '1. Vietnam: A backpacker\'s dream. You can eat world-renowned street food like Pho or Banh Mi for $1.50, ride comfortable sleeper buses across the country, and book gorgeous homestays in Hoi An or Sapa for less than $15 per night.',
      '2. Colombia: Offering diverse topography from Amazonian rainforests to pristine Caribbean beaches. Explore the colorful streets of Medellín, hike the towering wax palms of Cocora Valley, and enjoy delicious local coffees, all on a modest budget.',
      '3. Georgia (The Country): Nestled at the intersection of Europe and Asia, Georgia offers dramatic Caucasus mountains, legendary hospitality, and some of the oldest winemaking traditions in the world. Airbnb rentals and hearty meals are exceptionally affordable.',
      '4. Indonesia (Beyond Bali): Islands like Lombok, Java, and Flores offer stunning active volcanoes, pink beaches, and rich cultural temples at a fraction of the cost of their popular neighbor, Bali.',
      '5. Turkey: Combining East-West cultures beautifully. Budget-friendly flights make moving from Istanbul\'s historical mosques to Cappadocia\'s valleys highly accessible, and delicious local kebabs and mezze are cheap and delicious.'
    ]
  }
];

export const itineraryTemplates: Record<string, { days: number; itinerary: { day: number; title: string; activities: string[]; meals: string[]; tip: string }[] }> = {
  'santorini': {
    days: 3,
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Fira to Oia Cliff Walk',
        activities: ['Check in to boutique caldera hotel', 'Hike the scenic cliffside trail from Fira to Oia', 'Witness the iconic golden sunset from the Byzantine Castle ruins', 'Enjoy fresh seafood at Ammoudi Bay'],
        meals: ['Lunch: Traditional taverna in Imerovigli', 'Dinner: Sunset seafood dining in Ammoudi'],
        tip: 'Wear sturdy sneakers for the cliff hike; it takes about 3 hours but offers the best island panoramic photos!'
      },
      {
        day: 2,
        title: 'Volcano Cruise & Black Sand Beach',
        activities: ['Board a wooden sailing boat to Nea Kameni volcanic crater', 'Swim in the sulfurous hot springs of Palea Kameni', 'Relax on the volcanic black sands of Perissa Beach', 'Wine tasting at a local winery overlooking the sunset'],
        meals: ['Breakfast: Greek yogurt & local honey', 'Lunch: Gyros on Perissa Beach', 'Dinner: Mediterranean fine dining with wine pairing'],
        tip: 'Don\'t wear white swimwear when visiting the hot springs, as the iron-rich clay can leave light stains.'
      },
      {
        day: 3,
        title: 'Akrotiri Archaeological Site & Catamaran',
        activities: ['Explore the prehistoric Bronze Age city of Akrotiri', 'View the spectacular Red Beach cliffs', 'Embark on a luxury sunset catamaran cruise with snorkeling', 'Open bar & Greek BBQ on board'],
        meals: ['Lunch: Light snacks on board', 'Dinner: Catamaran freshly grilled BBQ buffet'],
        tip: 'Book the catamaran cruise in advance as they are limited to small groups and sell out quickly.'
      }
    ]
  },
  'maldives': {
    days: 4,
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Overwater Settling',
        activities: ['Scenic seaplane transfer to your private island resort', 'Check in to a luxurious overwater villa with direct ocean access', 'Reef snorkeling straight from your private villa deck', 'Sunset beach cocktail reception'],
        meals: ['Lunch: Island grill beachside buffet', 'Dinner: Organic oceanfront fine dining'],
        tip: 'Seaplanes only fly during daylight hours, so try to schedule your international flight arrival before 3:00 PM.'
      },
      {
        day: 2,
        title: 'Manta Ray Snorkeling & Sandbank Escape',
        activities: ['Speedboat excursion to a marine protected area to snorkel with manta rays', 'Castaway picnic experience on an uninhabited, private sandbank', 'Paddleboarding on the calm lagoon', 'Traditional Maldivian night with live Bodu Beru drumming'],
        meals: ['Breakfast: Floating villa pool breakfast', 'Lunch: Private sandbank picnic', 'Dinner: Traditional Maldivian buffet'],
        tip: 'Apply coral-safe sunscreen generously; the sun reflection on the pure white sandbanks is extremely intense.'
      },
      {
        day: 3,
        title: 'Dolphin Cruise & Spa Sanctuary',
        activities: ['Morning yoga session on the overwater pavilion', 'Pampering couple\'s massage at the glass-floor underwater spa', 'Sunset dhoni cruise to spot wild spinner dolphins jumping in the wake', 'Romantic candlelit beach dining under the stars'],
        meals: ['Breakfast: Health wellness smoothie bowls', 'Lunch: Overwater lagoon bistro', 'Dinner: Chef\'s table private beach dinner'],
        tip: 'Keep your camera ready during the sunset cruise; spinner dolphins are highly active and playful!'
      },
      {
        day: 4,
        title: 'Coral Planting & Farewell',
        activities: ['Participate in the resort\'s marine biology reef restoration program', 'Kayaking around the island perimeter', 'Last swim in the crystal turquoise lagoon', 'Seaplane departure transfer'],
        meals: ['Breakfast: Extravagant international buffet', 'Lunch: Wood-fired beach pizza'],
        tip: 'Take advantage of complimentary non-motorized water sports (snorkels, kayaks) provided by most resorts.'
      }
    ]
  },
  'bali': {
    days: 4,
    itinerary: [
      {
        day: 1,
        title: 'Ubud Cultural Heart & Monkey Forest',
        activities: ['Check in to jungle-view resort in Ubud', 'Stroll through the sacred Ubud Monkey Forest', 'Visit the historical Ubud Palace and shop at Ubud Art Market', 'Watch traditional Legong dance performance'],
        meals: ['Lunch: Authentic Bebek Bengil (Crispy Duck)', 'Dinner: Modern Indonesian farm-to-table culinary experience'],
        tip: 'Secure all loose items like glasses, hats, and phone straps before entering the monkey forest!'
      },
      {
        day: 2,
        title: 'Tegalalang Rice Terrace & Volcano Views',
        activities: ['Walk through the iconic terraced rice fields of Tegalalang', 'Fly high on a jungle swing overlooking the valley', 'Drive up to Kintamani for sweeping views of active Mount Batur', 'Soak in natural volcanic hot springs next to the crater lake'],
        meals: ['Breakfast: Jungle-view tropical fruit & pancakes', 'Lunch: Buffet lunch in Kintamani with volcano panoramic views', 'Dinner: Cozy organic café dining in Ubud'],
        tip: 'Arrive at Tegalalang by 8:00 AM to beat the crowds, catch the gorgeous soft morning sunrays filtering through palms.'
      },
      {
        day: 3,
        title: 'Temple Pilgrimage & Waterfall Trek',
        activities: ['Purification ritual at Tirta Empul holy water temple', 'Hike down to the majestic, mist-veiled Leke Leke Waterfall', 'Visit Ulun Danu Bratan lake temple', 'Enjoy a traditional Luwak coffee tasting session'],
        meals: ['Lunch: Riverside organic café', 'Dinner: Balinese suckling pig (Babi Guling) or vegetarian feast'],
        tip: 'Wear a sarong (usually provided) and dress modestly when entering any Balinese temple.'
      },
      {
        day: 4,
        title: 'Sunset Cliffs & Fire Dance',
        activities: ['Travel to coastal Uluwatu', 'Walk along the dramatic 70-meter high cliff cliffs', 'Watch the spellbinding Kecak Fire Dance at sunset overlooking the sea', 'Candlelit seafood dinner on Jimbaran Beach sand'],
        meals: ['Breakfast: Acai bowls & artisanal coffee', 'Lunch: Cliffside surf café', 'Dinner: Jimbaran Beach BBQ lobster & red snapper'],
        tip: 'Arrive at the Kecak theater at least 45 minutes early as seats are first-come first-served for the sunset.'
      }
    ]
  }
};
