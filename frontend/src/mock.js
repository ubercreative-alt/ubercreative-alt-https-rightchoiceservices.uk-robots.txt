// Mock data for JK PRO Builders (Fixhome clone). Frontend-only demo data.

export const brand = {
  name: "JK PRO Builders",
  website: "www.jkprobuilders.co.uk",
  websiteUrl: "https://www.jkprobuilders.co.uk",
  email: "info@jkprobuilders.co.uk",
  phone: "07872 164 350",
  hours: "Mon - Sat 8:00 am - 7:00 pm",
  address: "142 High Street, London, EC1A 4HN",
  welcome: "Welcome to Expert Home Renovation Services",
};

export const socials = [
  { label: "Facebook", icon: "facebook", href: "https://facebook.com" },
  { label: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { label: "Twitter", icon: "twitter", href: "https://twitter.com" },
  { label: "Linkedin", icon: "linkedin", href: "https://linkedin.com" },
];

export const nav = [
  { label: "Home", to: "/fixhome" },
  { label: "About Us", to: "/about" },
  {
    label: "Services", to: "/services", children: [
      { label: "Kitchen Remodeling", to: "/services/kitchen-remodeling" },
      { label: "Bathroom Renovation", to: "/services/bathroom-renovation" },
      { label: "Interior Design", to: "/services/interior-design" },
      { label: "Flooring & Tiling", to: "/services/flooring-tiling" },
      { label: "Roofing & Guttering", to: "/services/roofing" },
    ],
  },
  {
    label: "Projects", to: "/projects", children: [
      { label: "All Projects", to: "/projects" },
      { label: "Residential", to: "/projects" },
      { label: "Commercial", to: "/projects" },
    ],
  },
  {
    label: "Pages", to: "/about", children: [
      { label: "About Us", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Projects", to: "/projects" },
      { label: "Contact", to: "/contact" },
    ],
  },
  { label: "Blog", to: "/blog", children: [
      { label: "All Articles", to: "/blog" },
      { label: "Renovation Tips", to: "/blog" },
      { label: "Home Ideas", to: "/blog" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

const IMG = {
  worker1: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?crop=entropy&cs=srgb&auto=format&fit=crop&q=72&w=1600",
  worker2: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  reno1: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  reno2: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  reno3: "https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  kitchen: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  bath1: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  bath2: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  interior1: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  floor1: "https://images.unsplash.com/photo-1613621792067-8e28d16b735c?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  floor2: "https://images.unsplash.com/photo-1706629503586-2731f65587ae?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  exterior1: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  exterior2: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  exterior3: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  remodel1: "https://images.unsplash.com/photo-1656733911001-16912b79d2bf?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  remodel2: "https://images.unsplash.com/photo-1674649207083-281c2517ab49?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  paint1: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  intreno1: "https://images.unsplash.com/photo-1649083048770-82e8ffd80431?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  intreno2: "https://images.unsplash.com/photo-1604159848821-104723525eb4?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  roof1: "https://images.unsplash.com/photo-1726589004565-bedfba94d3a2?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  roof2: "https://images.unsplash.com/photo-1635424709845-3a85ad5e1f5e?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  roof3: "https://images.unsplash.com/photo-1633759593085-1eaeb724fc88?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  roof4: "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  progress1: "https://images.unsplash.com/photo-1618832515490-e181c4794a45?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  progress2: "https://images.unsplash.com/photo-1543525324-26e03b510586?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  progress3: "https://images.unsplash.com/photo-1444419988131-046ed4e5ffd6?crop=entropy&cs=srgb&auto=format&fit=crop&q=68&w=1000",
  progress4: "https://images.pexels.com/photos/15105588/pexels-photo-15105588.png?auto=compress&w=1200",
  avatar1: "https://images.unsplash.com/photo-1504199367641-aba8151af406?crop=faces&fit=crop&cs=srgb&auto=format&q=70&w=150&h=150",
  avatar2: "https://images.unsplash.com/photo-1629747490241-624f07d70e1e?crop=faces&fit=crop&cs=srgb&auto=format&q=70&w=150&h=150",
  avatar3: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=faces&fit=crop&cs=srgb&auto=format&q=70&w=150&h=150",
  avatar4: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?crop=faces&fit=crop&cs=srgb&auto=format&q=70&w=150&h=150",
};
export const images = IMG;

export const hero = {
  eyebrow: "[ BEST RENOVATION SERVICES ]",
  title: "Expert Renovation Services Designed Around Your Lifestyle",
  bg: IMG.worker1,
  card: IMG.intreno2,
  stat: { value: "200+", label: "Project Complete" },
};

export const about = {
  eyebrow: "ABOUT COMPANY",
  title: "Trusted Experts For Home Renovation And Services",
  text: "For over two decades JK PRO Builders has transformed houses into dream homes across the UK. From full property refurbishments to bespoke kitchens and bathrooms, our craftsmen deliver quality you can trust.",
  image: IMG.reno1,
  experience: { value: "25", suffix: "+", label: "Years Experience" },
  points: [
    { title: "Expert Team", text: "Skilled, certified tradespeople for every trade under one roof." },
    { title: "On-Time Delivery", text: "Projects planned and completed to agreed schedules." },
  ],
};

export const services = {
  eyebrow: "OUR SERVICES",
  title: "Tailored Renovation Services for Every Space",
  items: [
    {
      slug: "kitchen-remodeling", title: "Kitchen Remodeling", image: IMG.kitchen,
      desc: "Bespoke kitchen design, fitting and worktops built around how you live.",
      overview: "We design and build kitchens that work as beautifully as they look \u2013 from clever storage and durable worktops to integrated appliances and statement islands. Every project is planned around your routine and finished to an exacting standard.",
      features: ["Bespoke cabinetry & islands", "Quartz, granite & solid worktops", "Integrated appliance fitting", "Plumbing, electrics & lighting", "Tiling, splashbacks & flooring"],
      gallery: [IMG.kitchen, IMG.interior1, IMG.intreno2],
    },
    {
      slug: "bathroom-renovation", title: "Bathroom Renovation", image: IMG.bath1,
      desc: "Luxurious wet rooms and family bathrooms finished to the highest standard.",
      overview: "From compact cloakrooms to spa-style wet rooms, we handle every element of your bathroom \u2013 waterproofing, plumbing, underfloor heating, tiling and finishing \u2013 to create a space that feels like a private retreat.",
      features: ["Walk-in showers & wet rooms", "Freestanding & fitted baths", "Underfloor heating", "Full tanking & waterproofing", "Large-format tiling"],
      gallery: [IMG.bath1, IMG.bath2, IMG.floor2],
    },
    {
      slug: "interior-design", title: "Interior Design", image: IMG.interior1,
      desc: "Complete interior makeovers that balance style, comfort and function.",
      overview: "Our interior specialists reimagine how your home looks and flows \u2013 combining materials, lighting and colour into a cohesive scheme that suits your lifestyle and adds lasting value.",
      features: ["Space planning & layouts", "Bespoke joinery & storage", "Lighting design", "Colour & material schemes", "Full project management"],
      gallery: [IMG.interior1, IMG.intreno1, IMG.intreno2],
    },
    {
      slug: "flooring-tiling", title: "Flooring & Tiling", image: IMG.floor1,
      desc: "Hardwood, laminate, tiling and screed laid with precision and care.",
      overview: "A perfect floor starts with meticulous preparation. We level, screed and lay every type of flooring \u2013 from engineered hardwood to porcelain tiling \u2013 for a flawless, hard-wearing finish.",
      features: ["Engineered & solid hardwood", "Luxury vinyl & laminate", "Porcelain & natural stone tiling", "Self-levelling screeds", "Underfloor heating compatible"],
      gallery: [IMG.floor1, IMG.floor2, IMG.kitchen],
    },
    {
      slug: "roofing", title: "Roofing & Guttering", image: IMG.roof1,
      desc: "Complete roofing, guttering and roofline services built to last.",
      overview: "From fast repairs to full re-roofs, our roofing division protects your home from the top down. We install and maintain pitched, flat and slate roofs and look after every part of your roofline \u2013 guttering, fascias, soffits and chimneys.",
      features: ["Free roof survey & quotation", "Fully insured & guaranteed workmanship", "Emergency leak & storm repairs", "Premium materials", "Residential & commercial"],
      gallery: [IMG.roof1, IMG.roof2, IMG.roof3],
      isRoofing: true,
    },
  ],
};

export const roofingServices = {
  eyebrow: "EXPLORE OUR ROOFING SERVICES",
  title: "Trusted Roofing & Guttering Services",
  items: [
    { title: "New Roof Installations", image: IMG.roof1, text: "Durable, high-quality new roofs built to last \u2013 precise, safe installations using premium materials and modern techniques." },
    { title: "Roof Repairs", image: IMG.roof2, text: "From minor leaks to storm damage, we assess the problem, give clear guidance and restore your roof's integrity fast." },
    { title: "Pitched Roofing", image: IMG.roof3, text: "Traditional pitched roofs with excellent drainage, airflow and structural strength, designed to last for decades." },
    { title: "Flat Roofing", image: IMG.exterior2, text: "GRP, EPDM and torch-on felt systems for garages, extensions and modern homes \u2013 weather-resistant and low-maintenance." },
    { title: "Slate Roofing", image: IMG.roof4, text: "Timeless slate roofing installed and repaired with precision for lasting protection and enhanced kerb appeal." },
    { title: "Chimney Services", image: IMG.exterior3, text: "Complete chimney repairs, repointing and rebuilds to keep your home safe, ventilated and energy efficient." },
    { title: "Guttering Services", image: IMG.reno2, text: "Installation, maintenance and repair of guttering for efficient drainage and long-term protection from water damage." },
    { title: "Fascia Services", image: IMG.exterior1, text: "Durable fascias that safeguard your roofline and lift your property's appearance \u2013 fitted with care and precision." },
    { title: "Soffit Services", image: IMG.progress4, text: "Soffit installations and repairs that improve airflow, protect your roof structure and add a clean, finished look." },
  ],
};

export const processStats = {
  eyebrow: "WORK PROCESS",
  title: "Our Simple Renovation Process",
  steps: [
    "Free consultation & site survey",
    "Design, planning & fixed quotation",
    "Skilled build & project management",
  ],
  stats: [
    { value: "500+", label: "Projects Delivered" },
    { value: "90+", label: "Expert Craftsmen" },
  ],
  images: [IMG.remodel1, IMG.worker2],
};

export const challenges = {
  eyebrow: "WHY CHOOSE US",
  title: "Modern Building Challenges & Construction",
  text: "We combine traditional craftsmanship with modern building methods to overcome any renovation challenge \u2013 from structural changes to energy-efficient upgrades.",
  badge: { value: "07", suffix: "+", label: "Awards Won" },
  image: IMG.reno2,
  bullets: [
    "Quality materials with manufacturer guarantees",
    "Fully insured & accredited tradespeople",
    "Transparent, fixed-price quotations",
  ],
};

export const story = {
  eyebrow: "OUR STORY",
  title: "Every Renovation Tells a Better Story",
  image: IMG.remodel2,
  stats: [
    { value: "1250", label: "Happy Clients" },
    { value: "15K", label: "Sq Ft Renovated" },
  ],
};

export const projects = {
  eyebrow: "RECENT PROJECTS",
  title: "Recent Renovation Work",
  items: [
    {
      slug: "modern-kitchen-makeover",
      title: "Modern Kitchen Makeover",
      category: "Kitchen",
      image: IMG.kitchen,
      client: "The Whitfield Family",
      location: "Islington, London",
      duration: "5 Weeks",
      year: "2025",
      overview: "A dated, closed-off kitchen was reimagined as a bright, open-plan hub with bespoke cabinetry, quartz worktops and a large island for family life.",
      phases: {
        before: { image: IMG.progress1, text: "The original kitchen was cramped and poorly lit, with tired units, worn flooring and a wall separating it from the dining area." },
        during: { image: IMG.progress2, text: "We removed the dividing wall, installed a steel beam, re-ran plumbing and electrics, then fitted bespoke cabinetry and new services." },
        after: { image: IMG.kitchen, text: "The finished kitchen is a light, sociable space with an island, integrated appliances, quartz worktops and durable engineered flooring." },
      },
    },
    {
      slug: "spa-style-bathroom-suite",
      title: "Spa-Style Bathroom Suite",
      category: "Bathroom",
      image: IMG.bath2,
      client: "Mr & Mrs Okoye",
      location: "Guildford, Surrey",
      duration: "3 Weeks",
      year: "2025",
      overview: "A functional family bathroom transformed into a calming spa-style retreat with a walk-in rainfall shower, freestanding bath and underfloor heating.",
      phases: {
        before: { image: IMG.progress3, text: "The existing bathroom had dated tiling, a bulky bathtub and poor ventilation that left the room feeling cold and cramped." },
        during: { image: IMG.progress2, text: "We stripped the room back, upgraded the plumbing, tanked the wet area and laid underfloor heating before large-format tiling." },
        after: { image: IMG.bath2, text: "A serene suite with a freestanding bath, frameless walk-in shower and warm, softly-lit finishes throughout." },
      },
    },
    {
      slug: "open-plan-living-space",
      title: "Open-Plan Living Space",
      category: "Interior",
      image: IMG.intreno1,
      client: "The Sharma Residence",
      location: "Didsbury, Manchester",
      duration: "7 Weeks",
      year: "2024",
      overview: "Two dark, disconnected rooms were combined into one flowing open-plan living and dining space filled with natural light.",
      phases: {
        before: { image: IMG.progress4, text: "Separate, dated reception rooms felt closed-in, with low light levels and awkward circulation between spaces." },
        during: { image: IMG.progress1, text: "Structural openings were formed, new flooring screeded, and lighting and heating re-designed for the combined layout." },
        after: { image: IMG.intreno1, text: "A bright, contemporary open-plan space with zoned living and dining areas and seamless flooring throughout." },
      },
    },
    {
      slug: "roofing-replacement-repair",
      title: "Roofing Replacement & Repair",
      category: "Roofing",
      image: IMG.roof1,
      client: "Heritage Terrace Owners",
      location: "Bath, Somerset",
      duration: "4 Weeks",
      year: "2025",
      overview: "A failing, leaking roof was fully stripped, re-felted and re-tiled with new insulation, restoring weather-tightness and energy efficiency.",
      phases: {
        before: { image: IMG.roof2, text: "The original roof suffered from slipped tiles, damaged flashing and water ingress, putting the property at risk of damp." },
        during: { image: IMG.roof3, text: "Scaffolding was erected and the roof stripped to the rafters, with new membrane, battens, insulation and leadwork installed." },
        after: { image: IMG.roof4, text: "A fully re-tiled, weather-tight roof with upgraded insulation, new guttering and a 20-year workmanship guarantee." },
      },
    },
    {
      slug: "loft-conversion",
      title: "Loft Conversion",
      category: "Extension",
      image: IMG.remodel1,
      client: "The Bennett Family",
      location: "Clifton, Bristol",
      duration: "9 Weeks",
      year: "2024",
      overview: "An unused loft was converted into a stunning master bedroom with en-suite and dormer windows, adding valuable living space.",
      phases: {
        before: { image: IMG.progress4, text: "The loft was an empty, uninsulated storage space with limited head height and no access other than a hatch." },
        during: { image: IMG.remodel2, text: "We installed steels, a new staircase, dormer structure, insulation and full first-fix before plastering and finishing." },
        after: { image: IMG.remodel1, text: "A light-filled master suite with a stylish en-suite, built-in storage and far-reaching views from the dormer windows." },
      },
    },
    {
      slug: "feature-wall-painting",
      title: "Feature Wall & Painting",
      category: "Decorating",
      image: IMG.paint1,
      client: "The Carter Home",
      location: "Leeds, West Yorkshire",
      duration: "1 Week",
      year: "2025",
      overview: "A full-home redecoration with a bold statement feature wall, refreshed woodwork and a cohesive, contemporary colour palette.",
      phases: {
        before: { image: IMG.progress3, text: "Walls were marked and dated with peeling paint, mismatched colours and tired, yellowed woodwork throughout." },
        during: { image: IMG.paint1, text: "Surfaces were filled, sanded and primed, with careful cutting-in and multiple coats applied for a flawless finish." },
        after: { image: IMG.intreno2, text: "A beautifully redecorated home with a striking feature wall and crisp, hard-wearing finishes in every room." },
      },
    },
  ],
};

export const testimonials = {
  eyebrow: "TESTIMONIALS",
  title: "Find Our Successful Client Stories",
  rating: "4.9",
  totalReviews: "320+ Reviews",
  items: [
    { name: "Sarah Whitfield", role: "Homeowner, London", rating: 5, avatar: IMG.avatar3, text: "JK PRO Builders transformed our tired kitchen into the heart of our home. Immaculate finish and a team you can trust." },
    { name: "Daniel Okoye", role: "Homeowner, Surrey", rating: 5, avatar: IMG.avatar1, text: "From survey to snagging, everything was on time and on budget. Our bathroom looks like a boutique hotel." },
    { name: "Priya Sharma", role: "Landlord, Manchester", rating: 5, avatar: IMG.avatar4, text: "Professional, tidy and genuinely skilled. They handled our whole-house refurb without a single hiccup." },
  ],
};

export const reviews = {
  eyebrow: "GOOGLE REVIEWS",
  title: "Loved by Homeowners Across the UK",
  rating: "4.9",
  totalReviews: "320+ verified reviews",
  items: [
    { name: "Sarah Whitfield", role: "Islington, London", rating: 5, avatar: IMG.avatar3, date: "2 weeks ago", text: "JK PRO Builders transformed our tired kitchen into the heart of our home. The craftsmanship is immaculate and the whole team was a pleasure to have in the house." },
    { name: "Daniel Okoye", role: "Guildford, Surrey", rating: 5, avatar: IMG.avatar1, date: "1 month ago", text: "From the first survey to the final snagging, everything ran on time and on budget. Our new bathroom genuinely looks like a boutique hotel suite." },
    { name: "Priya Sharma", role: "Didsbury, Manchester", rating: 5, avatar: IMG.avatar4, date: "1 month ago", text: "Professional, tidy and seriously skilled. They managed our whole-house refurb end to end without a single hiccup. I recommend them to everyone." },
    { name: "James Bennett", role: "Clifton, Bristol", rating: 5, avatar: IMG.avatar2, date: "2 months ago", text: "Our loft conversion added a stunning master suite and real value to the house. Clear pricing, brilliant communication and a flawless finish." },
    { name: "Emily Carter", role: "Leeds, West Yorkshire", rating: 5, avatar: IMG.avatar3, date: "3 months ago", text: "They redecorated our entire home and created a gorgeous feature wall. Punctual, careful and the results speak for themselves." },
    { name: "Michael Turner", role: "Bath, Somerset", rating: 5, avatar: IMG.avatar1, date: "3 months ago", text: "A full re-roof completed in four weeks with zero fuss. The roofline looks fantastic and we have a 20-year workmanship guarantee." },
  ],
};

export const faqs = {
  eyebrow: "FAQ'S",
  title: "Everything You Need to Know Before You Begin",
  image: IMG.floor2,
  items: [
    { q: "How long does a typical renovation take?", a: "Timelines depend on scope \u2013 a bathroom takes 2\u20133 weeks, a full-house refurb 8\u201316 weeks. We provide a detailed schedule before we start." },
    { q: "Do you provide free quotations?", a: "Yes. We offer a free, no-obligation site survey and a fixed written quotation so you know exactly what to expect." },
    { q: "Are your tradespeople insured and accredited?", a: "Absolutely. All our craftsmen are fully insured, DBS-checked and hold the relevant trade accreditations." },
    { q: "Can I stay in my home during the works?", a: "In most cases, yes. We plan works in phases and keep the site clean and safe to minimise disruption." },
  ],
};

export const steps = {
  eyebrow: "HOW IT WORKS",
  title: "Our Simple Renovation Process",
  image: IMG.reno3,
  items: [
    { no: "01", title: "Consultation", text: "We listen to your vision and survey the space in detail." },
    { no: "02", title: "Design & Quote", text: "A tailored design with a transparent, fixed-price quotation." },
    { no: "03", title: "Build & Manage", text: "Skilled trades deliver the work under expert project management." },
    { no: "04", title: "Handover", text: "A thorough clean, snagging and walkthrough of your new space." },
  ],
};

export const blog = {
  eyebrow: "OUR BLOG",
  title: "Renovation Tips & Home Ideas",
  items: [
    {
      slug: "10-kitchen-layout-ideas",
      title: "10 Kitchen Layout Ideas That Actually Work",
      date: "12 July 2025", category: "Kitchen", image: IMG.kitchen, author: "JK PRO Builders",
      excerpt: "The layout is the backbone of any great kitchen. Here are ten tried-and-tested arrangements that balance flow, storage and sociability.",
      content: [
        "A kitchen lives or dies by its layout. Before you fall in love with a finish or an appliance, it pays to get the fundamentals right \u2013 how you move, where you prep and how the space connects to the rest of your home.",
        "Islands remain the most requested feature we fit, and for good reason. A well-placed island adds worktop space, casual seating and valuable storage, while keeping the cook connected to family and guests.",
        "For narrower rooms, a galley layout is hard to beat. Two parallel runs keep everything within easy reach and make brilliant use of tight footprints \u2013 just be sure to allow enough clearance to pass comfortably.",
        "Whatever the shape of your room, plan around the classic working triangle between sink, hob and fridge. Keep those journeys short and unobstructed and the kitchen will feel effortless to use every single day.",
      ],
    },
    {
      slug: "stress-free-bathroom-renovation",
      title: "How to Plan a Stress-Free Bathroom Renovation",
      date: "04 July 2025", category: "Bathroom", image: IMG.bath1, author: "JK PRO Builders",
      excerpt: "A little planning goes a long way. Follow these steps to keep your bathroom project calm, on budget and beautifully finished.",
      content: [
        "Bathrooms are among the most rewarding rooms to renovate \u2013 and among the trickiest, because so much happens behind the walls. Getting the sequence right is the secret to a smooth project.",
        "Start with a realistic budget that includes a contingency for the unexpected. Older homes in particular can hide surprises once tiling and panels come off, so a sensible buffer keeps stress to a minimum.",
        "Decide on your layout early. Moving soil pipes and drainage is possible but costly, so where practical we design around existing services to keep your investment in the finishes you'll actually see.",
        "Finally, invest in proper waterproofing. Tanking wet areas correctly is the single most important step for a bathroom that stays pristine for years to come.",
      ],
    },
    {
      slug: "choosing-the-right-flooring",
      title: "Choosing the Right Flooring for Every Room",
      date: "28 June 2025", category: "Flooring", image: IMG.floor1, author: "JK PRO Builders",
      excerpt: "From cosy bedrooms to busy hallways, the right floor changes everything. Here's how to match materials to how you live.",
      content: [
        "Flooring sets the tone for a room and takes more punishment than almost any other surface. Choosing the right material for each space is a balance of looks, comfort, durability and budget.",
        "Engineered hardwood brings warmth and character to living areas and is far more stable than solid timber, making it a great match for underfloor heating.",
        "In kitchens, bathrooms and hallways, porcelain tiles and quality luxury vinyl shrug off spills and heavy footfall while still looking fantastic.",
        "Whatever you choose, preparation is everything. A level, well-prepared subfloor is what separates a floor that looks good on day one from one that still looks good a decade later.",
      ],
    },
  ],
};

export const marquee = ["Best Home Renovation Services in World", "Trusted Craftsmanship Since 1999", "Quality You Can Live In"];
