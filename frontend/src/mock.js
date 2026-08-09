// Mock data for JK PRO Builders (Fixhome clone). Frontend-only demo data.

export const brand = {
  name: "JK PRO Builders",
  website: "www.jkprobuilders.co.uk",
  websiteUrl: "https://www.jkprobuilders.co.uk",
  email: "info@jkprobuilders.co.uk",
  phone: "+44 20 3488 1290",
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
  { label: "Blog", to: "/fixhome#blog", children: [
      { label: "Renovation Tips", to: "/fixhome#blog" },
      { label: "Home Ideas", to: "/fixhome#blog" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

const IMG = {
  worker1: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  worker2: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  reno1: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  reno2: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  reno3: "https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  kitchen: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  bath1: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  bath2: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  interior1: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  floor1: "https://images.unsplash.com/photo-1613621792067-8e28d16b735c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  floor2: "https://images.unsplash.com/photo-1706629503586-2731f65587ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  exterior1: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  exterior2: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  exterior3: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  remodel1: "https://images.unsplash.com/photo-1656733911001-16912b79d2bf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  remodel2: "https://images.unsplash.com/photo-1674649207083-281c2517ab49?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  paint1: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  intreno1: "https://images.unsplash.com/photo-1649083048770-82e8ffd80431?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  intreno2: "https://images.unsplash.com/photo-1604159848821-104723525eb4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
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
    { slug: "kitchen-remodeling", title: "Kitchen Remodeling", desc: "Bespoke kitchen design, fitting and worktops built around how you live.", image: IMG.kitchen },
    { slug: "bathroom-renovation", title: "Bathroom Renovation", desc: "Luxurious wet rooms and family bathrooms finished to the highest standard.", image: IMG.bath1 },
    { slug: "interior-design", title: "Interior Design", desc: "Complete interior makeovers that balance style, comfort and function.", image: IMG.interior1 },
    { slug: "flooring-tiling", title: "Flooring & Tiling", desc: "Hardwood, laminate, tiling and screed laid with precision and care.", image: IMG.floor1 },
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
    { title: "Modern Kitchen Makeover", category: "Kitchen", image: IMG.kitchen },
    { title: "Spa-Style Bathroom Suite", category: "Bathroom", image: IMG.bath2 },
    { title: "Open-Plan Living Space", category: "Interior", image: IMG.intreno1 },
    { title: "Heritage Home Refurb", category: "Full House", image: IMG.exterior1 },
    { title: "Loft Conversion", category: "Extension", image: IMG.remodel1 },
    { title: "Feature Wall & Painting", category: "Decorating", image: IMG.paint1 },
  ],
};

export const testimonials = {
  eyebrow: "TESTIMONIALS",
  title: "Find Our Successful Client Stories",
  rating: "4.9",
  totalReviews: "320+ Reviews",
  items: [
    { name: "Sarah Whitfield", role: "Homeowner, London", rating: 5, text: "JK PRO Builders transformed our tired kitchen into the heart of our home. Immaculate finish and a team you can trust." },
    { name: "Daniel Okoye", role: "Homeowner, Surrey", rating: 5, text: "From survey to snagging, everything was on time and on budget. Our bathroom looks like a boutique hotel." },
    { name: "Priya Sharma", role: "Landlord, Manchester", rating: 5, text: "Professional, tidy and genuinely skilled. They handled our whole-house refurb without a single hiccup." },
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
    { title: "10 Kitchen Layout Ideas That Actually Work", date: "12 July 2025", category: "Kitchen", image: IMG.kitchen },
    { title: "How to Plan a Stress-Free Bathroom Renovation", date: "04 July 2025", category: "Bathroom", image: IMG.bath1 },
    { title: "Choosing the Right Flooring for Every Room", date: "28 June 2025", category: "Flooring", image: IMG.floor1 },
  ],
};

export const marquee = ["Best Home Renovation Services in World", "Trusted Craftsmanship Since 1999", "Quality You Can Live In"];
