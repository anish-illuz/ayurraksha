import { Product, ProductCategory } from "../types/woocommerce";
import { RankMathMetadata } from "../types/rankmath";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  /** WordPress permalink (live posts) — used to key Rank Math lookups. */
  link?: string;
  rankMath?: RankMathMetadata;
}

export const HEALTH_CONCERNS = [
  { id: "digestion", name: "Digestion & Gut Health", icon: "Flame", count: 14, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80" },
  { id: "immunity", name: "Immunity & Protection", icon: "Shield", count: 18, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80" },
  { id: "stress-sleep", name: "Stress & Sleep", icon: "Moon", count: 12, image: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=600&q=80" },
  { id: "joint-muscle", name: "Joint & Muscle Care", icon: "Activity", count: 10, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80" },
  { id: "skin-care", name: "Skin Care & Glow", icon: "Sparkles", count: 16, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
  { id: "hair-care", name: "Hair Care & Growth", icon: "Feather", count: 9, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80" },
  { id: "womens-wellness", name: "Women's Wellness", icon: "Heart", count: 11, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" },
  { id: "mens-vitality", name: "Men's Vitality", icon: "Zap", count: 8, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" },
  { id: "general-wellness", name: "Daily General Wellness", icon: "Sun", count: 22, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" },
];

export const MOCK_CATEGORIES: ProductCategory[] = [
  { id: "herbal-capsules", name: "Herbal Capsules & Tablets", slug: "herbal-capsules", description: "Standardized organic botanical extracts formulated according to classic Ayurvedic text specifications.", count: 24, image: { src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80" } },
  { id: "classical-avalehas", name: "Classical Avalehas & Rasayanas", slug: "classical-avalehas", description: "Authentic herbal jams and nutritive pastes prepared with wild honey and Amla.", count: 12, image: { src: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80" } },
  { id: "medicated-oils", name: "Tailam & Medicated Oils", slug: "medicated-oils", description: "Cold-pressed sesame and coconut base oils slow-infused with traditional Ayurvedic herbs.", count: 15, image: { src: "https://images.unsplash.com/photo-1608248597260-610196884638?auto=format&fit=crop&w=600&q=80" } },
  { id: "pure-resins", name: "Pure Herbal Resins", slug: "pure-resins", description: "High-altitude purified Shilajit resin and guggulu formulations.", count: 6, image: { src: "https://images.unsplash.com/photo-1546852199-2d5863ab113d?auto=format&fit=crop&w=600&q=80" } },
  { id: "syrups-elixirs", name: "Arishtas & Herbal Syrups", slug: "syrups-elixirs", description: "Self-fermented herbal tonics for rapid absorption and digestive bio-availability.", count: 18, image: { src: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80" } },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "AyurRaksha Organic Triphala Rasayana Capsules",
    slug: "triphala-digestive-care",
    featured: true,
    description: "AyurRaksha Organic Triphala Capsules combine equal parts of wild-harvested Haritaki, Bibhitaki, and Amalaki fruits. Prepared through traditional low-temperature extraction, this classical blend purifies the digestive tract, promotes natural bowel regularity, and balances all three Doshas.",
    short_description: "Gentle daily digestive detox and bowel regularity formula. Balances Tridosha.",
    price: 499,
    regular_price: 599,
    sale_price: 499,
    on_sale: true,
    stock_status: "instock",
    average_rating: 4.9,
    rating_count: 142,
    categories: [MOCK_CATEGORIES[0]],
    images: [
      { id: 1, src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80", alt: "AyurRaksha Triphala Bottle" },
      { id: 2, src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", alt: "Ayurvedic Herbs Preparation" }
    ],
    acf: {
      short_description: "Gentle daily digestive detox and bowel regularity formula. Balances Tridosha.",
      key_benefits: [
        "Soothes sluggish digestion and relieves bloating within days",
        "Supports natural daily colon cleansing without cramping",
        "Rich in natural Vitamin C and antioxidant flavonoids",
        "Restores natural Agni (digestive fire) and gut microbial harmony"
      ],
      ingredients: [
        { name: "Amalaki (Emblica officinalis)", description: "Rich source of natural Vitamin C; nourishes tissues and pacifies Pitta.", ayurvedic_role: "Rasayana / Rejuvenator" },
        { name: "Haritaki (Terminalia chebula)", description: "Scavenges metabolic toxins (Ama) and enhances gut peristalsis.", ayurvedic_role: "Anulomana / Laxative" },
        { name: "Bibhitaki (Terminalia bellirica)", description: "Reduces excess Kapha, balances mucus production, and cleanses blood.", ayurvedic_role: "Kaphahara" }
      ],
      how_to_use: "Take 1-2 capsules daily before bedtime with warm water or milk, or as recommended by an Ayurvedic physician.",
      suitable_for: ["Adults experiencing bloating or constipation", "Daily gentle detox routines", "Vata and Kapha imbalances"],
      not_suitable_for: ["Pregnant women without physician supervision", "Severe acute diarrhea sufferers"],
      health_concerns: ["Digestion & Gut Health", "Daily General Wellness"],
      ayurvedic_properties: {
        dosha_balance: "Tridoshic (Balances Vata, Pitta, and Kapha)",
        rasa: "Kashaya (Astringent), Tikta (Bitter), Madhura (Sweet)",
        virya: "Anushnasheeta (Slightly cooling)",
        vipaka: "Madhura (Sweet post-digestive effect)"
      },
      product_highlights: ["100% Organic USDA Certified", "Heavy Metal Lab Tested", "Zero Fillers or Synthetic Binders"],
      dosage: "1-2 Capsules Daily",
      recommended_duration: "30 to 90 days for optimal digestive restoration",
      expert_note: "Take with warm water right before sleep for effective morning elimination.",
      frequently_bought_together: ["ashwagandha-stress-relief", "chyawanprash-immunity"],
      product_badges: ["Bestseller", "100% Organic", "Doctor Formulated"],
      faqs: [
        { question: "Can I take Triphala every day?", answer: "Yes, classical Triphala is a Rasayana (rejuvenator) formulated for safe daily long-term use without dependency." },
        { question: "When will I see results?", answer: "Improved digestive comfort and regular bowel movement are usually experienced within 24-72 hours." }
      ]
    },
    reviews: [
      { id: 101, date_created: "2026-07-15", reviewer: "Dr. Rajesh K.", review: "As an Ayurvedic practitioner, I regularly prescribe AyurRaksha Triphala. The purity and potency are exceptional.", rating: 5, verified: true },
      { id: 102, date_created: "2026-08-02", reviewer: "Ananya Sharma", review: "Resolved my chronic morning acidity and bloating completely. Highly recommended!", rating: 5, verified: true }
    ]
  },
  {
    id: "prod-2",
    name: "KSM-66® Ashwagandha Gold Vitality Capsules",
    slug: "ashwagandha-stress-relief",
    featured: true,
    description: "AyurRaksha Ashwagandha Gold utilizes premium organic KSM-66 root extract standardized to 5% withanolides. Formulated with Pipali (black pepper extract) for 4x higher bio-absorption, it calms the nervous system, lowers cortisol levels, and restores natural stamina.",
    short_description: "Full-spectrum adaptogen for deep stress relief, restful sleep, and physical vigor.",
    price: 649,
    regular_price: 799,
    sale_price: 649,
    on_sale: true,
    stock_status: "instock",
    average_rating: 4.8,
    rating_count: 98,
    categories: [MOCK_CATEGORIES[0]],
    images: [
      { id: 3, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", alt: "Ashwagandha Capsules" }
    ],
    acf: {
      short_description: "Full-spectrum adaptogen for deep stress relief, restful sleep, and physical vigor.",
      key_benefits: [
        "Clinically shown to reduce mental fatigue and serum cortisol levels",
        "Enhances sleep depth and natural sleep architecture",
        "Boosts physical endurance, muscle recovery, and stamina",
        "Supports cognitive performance under high workload"
      ],
      ingredients: [
        { name: "Organic Ashwagandha (Withania somnifera)", description: "High concentration full-spectrum root extract (5% Withanolides).", ayurvedic_role: "Balya & Medhya" },
        { name: "Pippali Extract (Piper longum)", description: "Bio-availability enhancer that unlocks cellular uptake.", ayurvedic_role: "Yogavahi" }
      ],
      how_to_use: "Take 1 capsule twice daily after meals with warm water or milk.",
      suitable_for: ["Working professionals facing burnout", "Athletes & fitness enthusiasts", "High-stress individuals"],
      not_suitable_for: ["Uncontrolled hyperthyroidism patients"],
      health_concerns: ["Stress & Sleep", "Men's Vitality", "Daily General Wellness"],
      ayurvedic_properties: {
        dosha_balance: "Pacifies Vata & Kapha",
        rasa: "Tikta (Bitter), Kashaya (Astringent)",
        virya: "Ushna (Heating)",
        vipaka: "Madhura"
      },
      product_highlights: ["KSM-66 Standardized Extract", "4x Bioavailability with Pippali", "Non-GMO & Vegan Capsules"],
      dosage: "1 Capsule Twice Daily",
      recommended_duration: "60 to 90 days",
      frequently_bought_together: ["triphala-digestive-care", "shilajit-vitality-resin"],
      product_badges: ["Clinical Grade", "Top Seller", "Vegan"],
      faqs: [
        { question: "Does Ashwagandha cause drowsiness during the day?", answer: "No, Ashwagandha is an adaptogen. It calms stress during daytime while promoting natural rest at night." }
      ]
    },
    reviews: [
      { id: 103, date_created: "2026-08-10", reviewer: "Siddharth Verma", review: "My stress levels dropped significantly within a week. I wake up feeling genuinely rested.", rating: 5, verified: true }
    ]
  },
  {
    id: "prod-3",
    name: "Curcumin & Shallaki Joint Guard Complex",
    slug: "curcumin-joint-care",
    featured: true,
    description: "Synergistic botanical formulation uniting 95% Standardized Curcuminoids, Boswellia Serrata (Shallaki), and Hadjod (Cissus quadrangularis). Designed to relieve joint stiffness, protect cartilage, and restore comfortable mobility.",
    short_description: "Targeted Ayurvedic joint care relief formula for knees, back, and muscular flexibility.",
    price: 799,
    regular_price: 950,
    sale_price: 799,
    on_sale: true,
    stock_status: "instock",
    average_rating: 4.9,
    rating_count: 86,
    categories: [MOCK_CATEGORIES[0]],
    images: [
      { id: 4, src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80", alt: "Joint Guard Box" }
    ],
    acf: {
      short_description: "Targeted Ayurvedic joint care relief formula for knees, back, and muscular flexibility.",
      key_benefits: [
        "Reduces morning joint stiffness and inflammation",
        "Supports synovial fluid lubrication and cartilage elasticity",
        "Improves walking range of motion and joint flexibility",
        "Gentle on stomach lining compared to synthetic analgesics"
      ],
      ingredients: [
        { name: "95% Curcumin Extract (Turmeric)", description: "Potent natural anti-inflammatory agent.", ayurvedic_role: "Shothahara" },
        { name: "Shallaki (Boswellia serrata)", description: "Classical resin that inhibits pro-inflammatory enzymes.", ayurvedic_role: "Sandhaniya" },
        { name: "Hadjod (Cissus quadrangularis)", description: "Accelerates bone mineral density and tendon repair.", ayurvedic_role: "Asthichruna" }
      ],
      how_to_use: "Take 1 tablet after breakfast and 1 after dinner with warm water.",
      suitable_for: ["Seniors with knee discomfort", "Active adults with post-exercise joint soreness"],
      health_concerns: ["Joint & Muscle Care"],
      ayurvedic_properties: {
        dosha_balance: "Pacifies Vata & Kapha",
        rasa: "Tikta, Katu",
        virya: "Ushna"
      },
      product_highlights: ["95% Active Curcuminoids", "Boswellia Certified Grade", "Gentle Gastric Profile"],
      dosage: "1 Tablet Twice Daily",
      recommended_duration: "90 days",
      frequently_bought_together: ["triphala-digestive-care"],
      product_badges: ["Doctor Recommended", "High Potency"]
    },
    reviews: [
      { id: 104, date_created: "2026-08-14", reviewer: "Mrs. Meenakshi Sundaram", review: "My knee pain during stairs has reduced substantially in 3 weeks. Very satisfied.", rating: 5, verified: true }
    ]
  },
  {
    id: "prod-4",
    name: "Himalayan Gold Pure Shilajit Resin (20g)",
    slug: "shilajit-vitality-resin",
    featured: true,
    description: "Authentic Grade A Himalayan Shilajit resin harvested above 18,000 feet. Purified using traditional Shodhana methods with herbal decoctions. Contains >75% Fulvic Acid and 84+ essential ionic trace minerals.",
    short_description: "Pure Himalayan mineral pitch resin for peak physical stamina, cellular energy, and male vitality.",
    price: 999,
    regular_price: 1299,
    sale_price: 999,
    on_sale: true,
    stock_status: "instock",
    average_rating: 4.95,
    rating_count: 215,
    categories: [MOCK_CATEGORIES[3]],
    images: [
      { id: 5, src: "https://images.unsplash.com/photo-1546852199-2d5863ab113d?auto=format&fit=crop&w=800&q=80", alt: "Pure Shilajit Glass Jar" }
    ],
    acf: {
      short_description: "Pure Himalayan mineral pitch resin for peak physical stamina, cellular energy, and male vitality.",
      key_benefits: [
        "Rich in >75% Fulvic Acid for cellular ATP nutrient transport",
        "Supports natural testosterone production and stamina",
        "Combats chronic fatigue and physical exhaustion",
        "Third-party lab tested for heavy metals and purity"
      ],
      ingredients: [
        { name: "Purified Shuddha Shilajit", description: "Authentic mineral pitch harvested from Himalayan rocks.", ayurvedic_role: "Rasayana & Vajikarana" }
      ],
      how_to_use: "Dissolve a pea-sized resin portion (approx 250-500mg) in lukewarm milk or water once daily in the morning.",
      suitable_for: ["Men seeking stamina and physical endurance", "Fitness enthusiasts", "People with low energy"],
      health_concerns: ["Men's Vitality", "Daily General Wellness"],
      ayurvedic_properties: {
        dosha_balance: "Pacifies Kapha and Vata",
        rasa: "Katu (Pungent), Tikta (Bitter)",
        virya: "Ushna"
      },
      product_highlights: ["Harvested at 18,000+ Ft", ">75% Fulvic Acid", "NABL Lab Test Certificate Included"],
      dosage: "Pea-sized portion (300mg)",
      frequently_bought_together: ["ashwagandha-stress-relief"],
      product_badges: ["Lab Certified", "Grade A Pure"]
    },
    reviews: [
      { id: 105, date_created: "2026-08-18", reviewer: "Vikram Rathore", review: "100% genuine Shilajit. The energy surge throughout the workday is remarkable.", rating: 5, verified: true }
    ]
  },
  {
    id: "prod-5",
    name: "Kumkumadi Tailam Radiance Facial Oil (30ml)",
    slug: "kumkumadi-radiance-oil",
    featured: false,
    description: "Formulated according to classic Ashtanga Hrudaya text. Infused with Kashmiri Saffron (Kesar), Red Sandalwood, Lotus, and 26 precious botanicals in pure cold-pressed goat milk sesame oil base.",
    short_description: "Classical saffron-infused night beauty elixr for glowing, luminous skin tone and anti-pigmentation.",
    price: 899,
    regular_price: 1100,
    sale_price: 899,
    on_sale: true,
    stock_status: "instock",
    average_rating: 4.85,
    rating_count: 64,
    categories: [MOCK_CATEGORIES[2]],
    images: [
      { id: 6, src: "https://images.unsplash.com/photo-1608248597260-610196884638?auto=format&fit=crop&w=800&q=80", alt: "Kumkumadi Dropper Bottle" }
    ],
    acf: {
      short_description: "Classical saffron-infused night beauty elixr for glowing, luminous skin tone and anti-pigmentation.",
      key_benefits: [
        "Fades dark spots, blemishes, and hyperpigmentation",
        "Improves skin elasticity and natural golden glow",
        "Smooths fine lines and locks in deep facial hydration"
      ],
      ingredients: [
        { name: "Kashmiri Saffron (Kumkuma)", description: "Brightens complexions and reduces melanin spots.", ayurvedic_role: "Varnya / Complexion Enhancer" },
        { name: "Chandan (Red Sandalwood)", description: "Cools skin inflammation and refines pores.", ayurvedic_role: "Pittahara" }
      ],
      how_to_use: "Apply 3-4 drops onto cleansed damp face at night. Gently massage in upward circular motions.",
      suitable_for: ["All skin types", "Dull complexion", "Uneven skin tone"],
      health_concerns: ["Skin Care & Glow"],
      ayurvedic_properties: {
        dosha_balance: "Balances Pitta & Vata",
        virya: "Sheeta (Cooling)"
      },
      product_highlights: ["Pure Kashmiri Saffron", "No Mineral Oils or Silicones", "Cruelty-Free"],
      dosage: "3-4 Drops Nightly",
      product_badges: ["Ayurvedic Beauty Icon", "100% Botanical"]
    },
    reviews: [
      { id: 106, date_created: "2026-08-20", reviewer: "Pooja Hegde", review: "Gave my skin a healthy radiant glow without feeling sticky. Incredible aroma!", rating: 5, verified: true }
    ]
  },
  {
    id: "prod-6",
    name: "Shatavari Balance Drops for Women's Health",
    slug: "shatavari-female-wellness",
    featured: false,
    description: "Pure wild Shatavari root elixir. Shatavari translates to 'she who possesses a hundred husbands', reflecting its traditional standing as the supreme female reproductive and hormonal restorative herb in Ayurveda.",
    short_description: "Hormonal equilibrium, menstrual comfort, and vitality formula for women across all stages of life.",
    price: 549,
    regular_price: 650,
    sale_price: 549,
    on_sale: true,
    stock_status: "instock",
    average_rating: 4.9,
    rating_count: 51,
    categories: [MOCK_CATEGORIES[4]],
    images: [
      { id: 7, src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80", alt: "Shatavari Bottle" }
    ],
    acf: {
      short_description: "Hormonal equilibrium, menstrual comfort, and vitality formula for women across all stages of life.",
      key_benefits: [
        "Eases PMS cramping, mood swings, and bloating",
        "Supports natural endocrine balance and ovulation health",
        "Nourishes female reproductive tissues and lactation"
      ],
      ingredients: [
        { name: "Shatavari (Asparagus racemosus)", description: "Primary female Rasayana tonic.", ayurvedic_role: "Stanya & Vayasthapana" }
      ],
      how_to_use: "Take 15-20 drops twice daily mixed in half a cup of warm water or milk.",
      suitable_for: ["Women experiencing hormonal fluctuations", "Postpartum recovery", "Perimenopause comfort"],
      health_concerns: ["Women's Wellness"],
      ayurvedic_properties: {
        dosha_balance: "Pacifies Pitta & Vata",
        rasa: "Madhura (Sweet), Tikta (Bitter)"
      },
      product_highlights: ["Alcohol-Free Extract", "Wild Harvested Root", "Doctor Formulated"],
      dosage: "15-20 Drops Twice Daily"
    },
    reviews: []
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Understanding Your Prakriti: The Ultimate Guide to Vata, Pitta, and Kapha",
    slug: "understanding-your-prakriti-doshas",
    excerpt: "Discover your unique Ayurvedic body constitution and learn how balancing your internal Doshas leads to effortless health and longevity.",
    content: `
      <h2>What is Prakriti in Ayurveda?</h2>
      <p>In classical Ayurveda, health is defined as the perfect state of balance between your body's three functional energies: <strong>Vata</strong> (Air & Ether), <strong>Pitta</strong> (Fire & Water), and <strong>Kapha</strong> (Earth & Water).</p>
      <h3>The Three Doshas Explained</h3>
      <ul>
        <li><strong>Vata:</strong> Governs movement, respiration, and nervous impulses. When imbalanced, causes anxiety, dry skin, and constipation.</li>
        <li><strong>Pitta:</strong> Governs digestion, metabolism, and body temperature. Imbalances lead to acidity, skin rashes, and irritability.</li>
        <li><strong>Kapha:</strong> Governs structure, hydration, and immunity. Imbalances manifest as weight gain, lethargy, and sinus congestion.</li>
      </ul>
      <h3>How to Maintain Daily Equilibrium</h3>
      <p>Eating warm cooked foods, establishing a consistent daily sleep schedule (Dinacharya), and utilizing targeted Ayurvedic botanicals like Ashwagandha and Triphala restore vitality at the root level.</p>
    `,
    category: "Ayurvedic Foundations",
    author: "Dr. Vaidya K. Sharma, BAMS",
    date: "August 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    rankMath: {
      title: "Understanding Your Prakriti: Vata, Pitta, Kapha Guide | AyurRaksha",
      description: "Learn how to identify your Ayurvedic body constitution (Prakriti) and balance your Doshas for optimal digestion and wellness.",
      canonical: "https://ayurrakshaonline.com/blog/understanding-your-prakriti-doshas"
    }
  },
  {
    id: "post-2",
    title: "Triphala: The Ancient 3-Fruit Formula Modern Science is Now Validating",
    slug: "triphala-ancient-formula-modern-science",
    excerpt: "Explore why modern gastroenterologists are paying attention to Triphala's microbiome-modulating and gut barrier restoration properties.",
    content: `
      <h2>The Synergistic Power of Three Fruits</h2>
      <p>Triphala is composed of Haritaki, Bibhitaki, and Amalaki. Classical texts describe it as a universal Rasayana that cleanses toxins without stripping essential gut flora.</p>
      <h3>Recent Clinical Studies on Gut Health</h3>
      <p>Research published in medical journals shows Triphala acts as a natural prebiotic, promoting beneficial Bifidobacteria and Lactobacillus populations while inhibiting pathogens.</p>
    `,
    category: "Herbal Science",
    author: "Dr. Ananya Roy, PhD",
    date: "August 18, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    rankMath: {
      title: "Triphala Benefits: Science & Ayurvedic Usage | AyurRaksha",
      description: "Discover the scientific evidence behind Triphala's gut cleansing and digestive health benefits.",
      canonical: "https://ayurrakshaonline.com/blog/triphala-ancient-formula-modern-science"
    }
  }
];
