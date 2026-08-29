import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CarFront,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  X,
  Utensils,
  Flame,
} from 'lucide-react';

type MenuProduct = {
  name: string;
  description: string;
  image: string;
  badge?: string;
  prices?: string[];
  sizes?: string[];
  imageClass?: string;
};

type Branch = {
  name: string;
  city: string;
  phone: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const burgers: MenuProduct[] = [
  { name: 'Hilux Fillet', description: 'Signature crispy chicken fillet burger with creamy white sauce and a toasted sesame bun.', image: '/images/image_51ce3e44545.png', imageClass: 'menu-image-burger', badge: 'FLAGSHIP', prices: ['M: Rs 440', 'L: Rs 700'] },
  { name: 'Corolla Zinger', description: 'Crispy fried spicy zinger chicken burger with fresh lettuce and a bold sauce finish.', image: '/images/image_981111fe.png', imageClass: 'menu-image-burger', badge: 'TURBO SPICE', prices: ['M: Rs 440', 'L: Rs 680'] },
  { name: 'Civic Grilled', description: 'Grilled chicken burger layered with fresh greens and a lighter, clean finish.', image: '/images/image_2f7cd01f.png', imageClass: 'menu-image-burger', badge: 'CLEAN RUN', prices: ['M: Rs 440', 'L: Rs 710'] },
  { name: 'Picanto Chapli', description: 'A smaller, flatter crispy chapli-style spiced chicken patty burger with tomato and lettuce.', image: '/images/picanto%20chapli%20007.png', imageClass: 'menu-image-burger', badge: 'LIGHTWEIGHT', prices: ['M: Rs 360', 'L: Rs 600'] },
  { name: 'Alto Patty', description: 'Classic simple crispy chicken patty burger.', image: '/images/image_95be8c45.png', imageClass: 'menu-image-burger', badge: 'HERITAGE', prices: ['M: Rs 320', 'L: Rs 580'] },
];

const wraps: MenuProduct[] = [
  { name: '28-Wheeler', description: 'Heavily loaded creamy fillet chicken wrap.', image: '/images/image_d0dc5330.png', imageClass: 'menu-image-wrap', badge: 'HEAVY DUTY', prices: ['M: Rs 500', 'L: Rs 820'] },
  { name: '24-Wheeler', description: 'Crispy zinger chicken wrap with visible sauce layers.', image: '/images/image_910c9b94.png', imageClass: 'menu-image-wrap', badge: 'FAST LANE', prices: ['M: Rs 500', 'L: Rs 770'] },
  { name: '22-Wheeler', description: 'Premium grilled chicken wrap packed with fresh vegetables.', image: '/images/image_6432d33d.png', imageClass: 'menu-image-wrap', badge: 'GRAND TOURER', prices: ['M: Rs 500', 'L: Rs 780'] },
];

const starters: MenuProduct[] = [
  { name: 'Loaded Fries', description: 'Crispy fries loaded with melted cheese, jalapeños, and signature sauces.', image: '/images/loaded fries.png', imageClass: 'menu-image-fries', prices: ['Mini Rs 700', 'Small Rs 1050', 'Medium Rs 1450', 'Large Rs 1850'] },
  { name: 'French Fries', description: 'Classic golden crispy fries, perfectly seasoned.', image: '/images/french fries.png', imageClass: 'menu-image-fries', prices: ['Small Rs 320', 'Medium Rs 420', 'Large Rs 520'] },
];

const dips: MenuProduct[] = [
  { name: 'Kixx Chipotle', description: 'Rich, smoky chipotle with a warm, lingering heat.', image: '/images/Kixx Chipotle.png', imageClass: 'menu-image-dip' },
  { name: 'Zic Atomic', description: 'Vibrant green herb sauce with explosive atomic kick.', image: '/images/Zic Atomic.png', imageClass: 'menu-image-dip' },
  { name: 'Helix Garlic', description: 'Silky white garlic cream—sharp, smooth, and legendary.', image: '/images/Helix Garlic.png', imageClass: 'menu-image-dip' },
  { name: 'Havoline B.B.Q', description: 'Deep, dark barbecue smoke with bold, charred notes.', image: '/images/Havoline B.B.Q.png', imageClass: 'menu-image-dip' },
];

const fuelUp: MenuProduct[] = [
  { name: 'Peach Ice Tea', description: 'Refreshing peach ice tea, chilled to perfection.', image: '/images/peach ice tea.png', imageClass: 'menu-image-drink', prices: ['Rs 199'] },
  { name: 'Soft Drinks', description: 'Classic choices, perfect with every meal.', image: '/images/soft drinks.png', imageClass: 'menu-image-drink', sizes: ['NR', '1 Litre', '1.5 Litre', 'Water 500ml'] },
];

const branches: Branch[] = [
  { name: 'Rahwali GRW', city: 'Gujranwala', phone: '0306 0663072' },
  { name: 'Bus Stop GRW', city: 'Gujranwala', phone: '0305 6663072' },
  { name: 'Daska', city: 'Daska', phone: '0370 0663072' },
  { name: 'Kamoke', city: 'Kamoke', phone: '0328 0663072' },
  { name: 'Wazirabad', city: 'Wazirabad', phone: '0328 0663072' },
  { name: 'Sialkot Road GRW', city: 'Gujranwala', phone: '0320 0663072' },
];

function playCarRevSound(): void {
  if (typeof window === 'undefined') return;

  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const now = context.currentTime;

  const engine = context.createOscillator();
  const engine2 = context.createOscillator();
  const gain = context.createGain();

  engine.type = 'sawtooth';
  engine2.type = 'square';

  engine.frequency.setValueAtTime(80, now);
  engine.frequency.exponentialRampToValueAtTime(140, now + 0.35);
  engine.frequency.exponentialRampToValueAtTime(72, now + 1.15);

  engine2.frequency.setValueAtTime(36, now);
  engine2.frequency.exponentialRampToValueAtTime(60, now + 0.5);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.85);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

  engine.connect(gain);
  engine2.connect(gain);
  gain.connect(context.destination);

  engine.start(now);
  engine2.start(now);
  engine.stop(now + 1.45);
  engine2.stop(now + 1.45);

  void context.resume();
}

function trackAndCall(label: string, href: string): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact_click', {
      event_category: 'Contact',
      event_label: label,
    });
  }
  console.log('Contact click tracked:', label);
  window.location.href = href;
}

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/ /g, '')}`;
}

function MenuCard({ product, compact = false }: { product: MenuProduct; compact?: boolean }) {
  return (
    <article className={compact ? 'menu-product-card compact-card' : 'menu-product-card'}>
      <div className={`menu-product-image ${product.imageClass ?? ''}`}>
        <img src={product.image} alt={`${product.name} menu item`} loading="lazy" />
        {!compact && <span className="image-corner-mark"><Utensils size={15} /></span>}
      </div>
      <div className="menu-product-content">
        <div className="menu-product-title-row">
          <h4>{product.name}</h4>
          {product.badge && <span className="menu-badge">{product.badge}</span>}
        </div>
        {product.description && <p>{product.description}</p>}
        {product.prices && <div className="menu-price-list">{product.prices.map((price) => <span key={price}>{price}</span>)}</div>}
        {product.sizes && <div className="menu-size-list">{product.sizes.map((size) => <span key={size}>{size}</span>)}</div>}
      </div>
    </article>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'green' | 'blue'>('green');
  const [heroIndex, setHeroIndex] = useState(0);
  const soundPlayedRef = useRef(false);

  const heroSlides = [
    { src: '/images/hero%20burger%20garage%20image.png', alt: 'Burger Garage mascot logo' },
    { src: '/images/3cf9617d-727e-4da4-b630-cb28a5263ddf.png', alt: 'Burger Garage burger hero image' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'green' | 'blue' | null;
    const initialTheme = savedTheme || 'green';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme === 'blue' ? 'blue' : 'green');
  }, []);

  useEffect(() => {
    if (soundPlayedRef.current) return;

    const triggerSound = () => {
      if (soundPlayedRef.current) return;
      soundPlayedRef.current = true;
      playCarRevSound();
    };

    triggerSound();
    window.addEventListener('pointerdown', triggerSound, { once: true });
    window.addEventListener('keydown', triggerSound, { once: true });

    return () => {
      window.removeEventListener('pointerdown', triggerSound);
      window.removeEventListener('keydown', triggerSound);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const switchTheme = (newTheme: 'green' | 'blue') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme === 'blue' ? 'blue' : 'green');
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner page-width">
          <a className="brand" href="#top" aria-label="Burger Garage home">
            <img src="/images/burger-garage-logo.png" alt="Burger Garage Logo" className="brand-logo" />
          </a>
          <nav className={mobileMenuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <button onClick={() => scrollTo('menu')}>Menu</button>
            <button onClick={() => scrollTo('locations')}>Locations</button>
            <button onClick={() => scrollTo('deals')}>Deals</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <div className="theme-switcher">
            <button className={`color-swatch swatch-green ${theme === 'green' ? 'active' : ''}`} onClick={() => switchTheme('green')} title="Green Theme" aria-label="Switch to green theme"></button>
            <button className={`color-swatch swatch-blue ${theme === 'blue' ? 'active' : ''}`} onClick={() => switchTheme('blue')} title="Blue Theme" aria-label="Switch to blue theme"></button>
          </div>
          <button className="call-button header-call" onClick={() => trackAndCall('Header Call Now Button', phoneHref('0308 0720004'))}>
            <Phone size={15} /> Call Now
          </button>
          <button className="mobile-toggle" aria-label="Toggle menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <div className="decorative-strip" aria-hidden="true"></div>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid page-width">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> Welcome to the club <span /></p>
              <h1>Burger<br /><i>Garage</i></h1>
              <p className="urdu-line">عشق نالوں برگر چنگا!</p>
              <p className="hero-subline">Handcrafted &amp; Full-Throttle <span>—</span> Est. Motor Club</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollTo('menu')}>View Full Menu <ArrowRight size={17} /></button>
                <button className="text-button" onClick={() => scrollTo('locations')}>Find Nearest Garage <MapPin size={16} /></button>
              </div>
            </div>

            <div className="hero-art reveal" aria-label="Burger Garage hero carousel">
              <div className="hero-ring"><span>FULL<br />THROTTLE</span><span className="ring-arrow">↗</span></div>
              <div className="hero-slideshow" aria-live="polite">
                {heroSlides.map((slide, index) => (
                  <img
                    key={slide.src}
                    className={index === heroIndex ? 'hero-slide is-active' : 'hero-slide'}
                    src={slide.src}
                    alt={slide.alt}
                  />
                ))}
              </div>

              <div className="hero-road-scene" aria-hidden="true">
                <div className="smoke smoke-one" />
                <div className="smoke smoke-two" />
                <div className="smoke smoke-three" />
              </div>
            </div>
          </div>
          <div className="hero-bottom page-width"><span>01</span><div className="hero-line" /><span>Crafted for the road</span><ArrowDown size={16} /></div>
        </section>

        <section className="deals-section" id="deals">
          <div className="page-width deals-grid reveal">
            <article className="deal-card featured-deal"><div><p className="card-kicker">The pit stop special</p><h2>1 Main <span>+</span> 1 Free Drink</h2><p>Every meal comes with a complimentary beverage.</p></div><div className="discount-stamp">70%<small>OFF DRINK</small></div></article>
            <article className="deal-card service-card"><Clock3 size={21} /><p className="card-kicker">Lunch service</p><h3>11AM <span>—</span> 3PM</h3><p>Fuel up before the afternoon run.</p></article>
            <article className="deal-card service-card dinner"><Clock3 size={21} /><p className="card-kicker">Dinner service</p><h3>6PM <span>till closing</span></h3><p>Keep the engines running late.</p></article>
          </div>
        </section>

        <section className="menu-section section-dark" id="menu">
          <div className="page-width">
            <div className="section-heading reveal"><div><p className="eyebrow left"><span /> The menu</p><h2>Our <i>Menu</i></h2></div><p className="heading-note">Built bold. Served hot.<br />Made for the hungry.</p></div>
            <div className="menu-category reveal" id="main-drive"><div className="category-heading"><div><span className="category-number">01</span><Flame size={17} /><h3>Main Drive</h3></div><p>Signature burgers for every kind of appetite.</p></div><div className="menu-card-grid">{burgers.map((product) => <MenuCard key={product.name} product={product} />)}</div></div>
            <div className="menu-category reveal" id="loaded-wraps"><div className="category-heading"><div><span className="category-number">02</span><h3>Loaded Wraps</h3></div><p>Wrapped, loaded and ready to roll.</p></div><div className="menu-card-grid">{wraps.map((product) => <MenuCard key={product.name} product={product} />)}</div></div>
            <div className="menu-category reveal" id="engine-starters"><div className="category-heading"><div><span className="category-number">03</span><h3>Engine Starters</h3></div><p>Golden sides built for sharing.</p></div><div className="menu-card-grid two-column">{starters.map((product) => <MenuCard key={product.name} product={product} />)}</div></div>
            <div className="menu-category reveal" id="engine-oil"><div className="category-heading"><div><span className="category-number">04</span><h3>Engine Oil <i>— Dips</i></h3></div><p>Choose your finish.</p></div><div className="menu-card-grid dips-grid">{dips.map((product) => <MenuCard key={product.name} product={product} compact />)}</div></div>
            <div className="menu-category reveal" id="fuel-up"><div className="category-heading"><div><span className="category-number">05</span><h3>Fuel Up</h3></div><p>Cool drinks for the long way home.</p></div><div className="menu-card-grid two-column">{fuelUp.map((product) => <MenuCard key={product.name} product={product} />)}</div></div>
          </div>
        </section>

        <section className="locations-section" id="locations">
          <div className="page-width">
            <div className="section-heading reveal"><div><p className="eyebrow left"><span /> Find your garage</p><h2>Six Garages,<br /><i>One Standard</i></h2></div><p className="heading-note dark-note">Wherever the road takes you,<br />there is a Burger Garage nearby.</p></div>
            <div className="locations-grid reveal">
              {branches.map((branch, index) => <article className="location-card" key={branch.name}><span className="branch-number">0{index + 1}</span><MapPin className="location-pin" size={18} /><h3>{branch.name}</h3><p>{branch.city}</p><a className="phone-link" href={phoneHref(branch.phone)} onClick={(event) => { event.preventDefault(); trackAndCall(`${branch.name} Phone`, phoneHref(branch.phone)); }}><Phone size={14} /> {branch.phone}</a><a className="directions-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.name}, ${branch.city}`)}`} target="_blank" rel="noopener noreferrer">Get Directions <ArrowRight size={15} /></a></article>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-dark" id="contact">
          <div className="page-width contact-inner reveal"><div className="contact-copy"><p className="eyebrow left"><span /> Need to talk?</p><h2>Keep the<br /><i>conversation</i> moving.</h2><p>Have a suggestion, a complaint, or just want to say hello? Our line is always open.</p></div><div className="contact-actions"><a className="complain-number" href={phoneHref('0308 0720004')} onClick={(event) => { event.preventDefault(); trackAndCall('Complain Line Phone', phoneHref('0308 0720004')); }}><span>Complain #</span>0308 0720004<Phone size={18} /></a><button className="whatsapp-button" onClick={() => trackAndCall('WhatsApp Complain Line', 'https://wa.me/923080720004')}><MessageCircle size={22} /> Chat on WhatsApp <ArrowRight size={17} /></button></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-width footer-main"><div className="footer-brand"><a className="brand footer-brand-logo" href="#top"><img src="/images/burger-garage-logo.png" alt="Burger Garage Logo" className="brand-logo-footer" /></a><div><p>Fast food. Slow craft.<br />Built for the long way home.</p></div></div><div className="footer-links"><p>Navigate</p><a href="#menu">Menu</a><a href="#locations">Locations</a><a href="#contact">Contact</a></div><div className="footer-social"><p>Follow the club</p><div><a href="#instagram" aria-label="Instagram"><Instagram size={19} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={19} /></a></div></div></div><div className="footer-bottom page-width"><span>© 2026 Burger Garage. All rights reserved.</span><span>Fueled by: <a href="https://www.designhubcreative.com" target="_blank" rel="noopener noreferrer">DesignHub Creative Studio</a></span></div></footer>


    </div>
  );
}

export default App;
