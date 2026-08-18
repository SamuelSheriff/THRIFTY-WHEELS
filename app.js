/* ═══════════════════════════════════════════════════════════════
   3FTYWHLS — Thrifty Wheels | App Logic
   ═══════════════════════════════════════════════════════════════ */

// ─── Car Data Storage ──────────────────────────────────────────
const BASE = './';   // relative to index.html
const STORAGE_KEY = '3ftywhls_inventory';

const defaultCars = [
  {
    id: 'mercedes-e300',
    name: '2010 Mercedes Benz E300',
    subtitle: 'Luxury Executive Sedan',
    price: 'KSh 1.9M',
    priceNum: 1900000,
    negotiable: false,
    status: 'available', // available | reserved | sold
    tags: ['sedan', 'luxury'],
    specs: [
      { label: 'Engine',       value: '3.0L V6 CGI N/A' },
      { label: 'Horsepower',   value: '231 HP' },
      { label: 'Torque',       value: '300 Nm' },
      { label: 'Gearbox',      value: '7G-Tronic Auto' },
      { label: 'Year',         value: '2010' },
      { label: 'Fuel',         value: 'Petrol' },
    ],
    features: ['Electric Seats', 'Sunroof', 'Dual Climate Control'],
    location: 'Nairobi',
    images: [
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.44 PM.jpeg',
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.45 PM.jpeg',
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.48 PM.jpeg',
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.49 PM.jpeg',
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.51 PM.jpeg',
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.10.58 PM.jpeg',
      '2010 Mercedes Benz E300/WhatsApp Image 2026-08-13 at 3.11.03 PM.jpeg',
    ],
  },
  {
    id: 'bmw-x1',
    name: '2016 BMW X1',
    subtitle: 'Compact Luxury SUV — New Shape',
    price: 'KSh 2.08M',
    priceNum: 2080000,
    negotiable: false,
    status: 'available',
    tags: ['suv', 'luxury'],
    specs: [
      { label: 'Engine',       value: '1500cc Petrol' },
      { label: 'Drive Type',   value: 'All-Wheel Drive' },
      { label: 'Turbo',        value: 'Twin Turbo' },
      { label: 'Drive Mode',   value: 'Si DRIVE' },
      { label: 'Year',         value: '2016' },
      { label: 'Shape',        value: 'New Shape' },
    ],
    features: ['Twin Turbo', 'Si Drive Mode', 'New Shape'],
    location: 'Nairobi',
    images: [
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.18 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.25 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.27 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.28 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.29 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.30 PM (1).jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.30 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.31 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.33 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.35 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.38 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.39 PM.jpeg',
      '2016 BMW X1/WhatsApp Image 2026-08-13 at 3.10.41 PM.jpeg',
    ],
  },
  {
    id: 'honda-insight',
    name: 'Honda Insight Hybrid',
    subtitle: 'Fuel-Efficient Hybrid — Fully Black',
    price: 'KSh 750K',
    priceNum: 750000,
    negotiable: true,
    status: 'available',
    tags: ['sedan', 'hybrid'],
    specs: [
      { label: 'Engine',       value: '1300cc Hybrid' },
      { label: 'Drive Type',   value: '2WD' },
      { label: 'Year',         value: '2012' },
      { label: 'Colour',       value: 'Fully Black' },
      { label: 'Fuel',         value: 'Hybrid' },
      { label: 'Location',     value: 'Nairobi' },
    ],
    features: ['Hybrid Engine', 'Full Black Interior', 'Eco Drive Mode'],
    location: 'Nairobi',
    images: [
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.46 PM.jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.47 PM (1).jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.47 PM.jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.48 PM (1).jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.48 PM (2).jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.48 PM.jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.49 PM.jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.50 PM.jpeg',
      'Honda insight Hybrid/WhatsApp Image 2026-08-13 at 3.09.52 PM.jpeg',
    ],
  },
  {
    id: 'hyundai-santafe',
    name: 'Hyundai Santa Fe',
    subtitle: '7-Seater Family SUV — Local 2015',
    price: 'KSh 2.4M',
    priceNum: 2400000,
    negotiable: true,
    status: 'available',
    tags: ['suv'],
    specs: [
      { label: 'Engine',       value: '2000cc Petrol' },
      { label: 'Drive Type',   value: '4WD (opt)' },
      { label: 'Seats',        value: '7 Seater' },
      { label: 'Year',         value: '2015 Local' },
      { label: 'Sunroof',      value: 'Panoramic' },
      { label: 'Fuel',         value: 'Petrol' },
    ],
    features: ['Panoramic Sunroof', '4WD Option', '7 Seater', 'Local 2015'],
    location: 'Nairobi',
    images: [
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.02 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.08 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.18 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.29 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.34 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.39 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.46 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.12.52 PM.jpeg',
      'Hyundai Santa Fe/WhatsApp Image 2026-08-13 at 3.13.01 PM.jpeg',
    ],
  },
  {
    id: 'landrover-discovery',
    name: 'Land Rover Discovery IV XS',
    subtitle: 'SDV6 Turbo Diesel — Duty Paid · Clean Logbook',
    price: 'KSh 4.5M',
    priceNum: 4500000,
    negotiable: false,
    status: 'available',
    tags: ['suv', 'luxury'],
    specs: [
      { label: 'Engine',       value: '2993cc Turbo Diesel' },
      { label: 'Gearbox',      value: 'Automatic' },
      { label: 'Seats',        value: '7 Seater' },
      { label: 'Year',         value: '2016' },
      { label: 'Colour',       value: 'Santorini Black' },
      { label: 'Duty',         value: 'Duty Paid' },
    ],
    features: ['Turbo Diesel', '7 Seater', 'Duty Paid', 'Clean Logbook', 'Santorini Black'],
    location: 'Nairobi',
    images: [
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.07 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.10 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.14 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.20 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.29 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.39 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.44 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.49 PM.jpeg',
      'Land Rover Discovery IV XS SDV6/WhatsApp Image 2026-08-13 at 3.11.58 PM.jpeg',
    ],
  },
  {
    id: 'toyota-vanguard',
    name: '2009 Toyota Vanguard',
    subtitle: '7-Seater Utility SUV — Sunroof & Heated Seats',
    price: 'KSh 1.15M',
    priceNum: 1150000,
    negotiable: true,
    status: 'available',
    tags: ['suv'],
    specs: [
      { label: 'Engine',       value: '2500cc Petrol' },
      { label: 'Seats',        value: '7 Seater' },
      { label: 'Year',         value: '2009' },
      { label: 'Sunroof',      value: 'Sunroof' },
      { label: 'Features',     value: 'Electric Heated Seats' },
      { label: 'Fuel',         value: 'Petrol' },
    ],
    features: ['7 Seater', 'Sunroof', 'Electric Heated Seats', '2500cc Engine'],
    location: 'Nairobi',
    images: [
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.50 PM.jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.50 PM (1).jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.51 PM.jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.51 PM (1).jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.51 PM (2).jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.52 PM.jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.52 PM (1).jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.53 PM.jpeg',
      'Toyota vanguard/WhatsApp Image 2026-08-18 at 11.36.55 PM.jpeg',
    ],
  },
];

// LocalStorage loader
function getStoredInventory() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error('Error parsing stored inventory:', e);
    }
  }
  // Initialize with defaults if empty or invalid
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCars));
  return defaultCars.slice();
}

function saveInventoryToStorage(vehicles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

let cars = getStoredInventory();

// Async Neon Database Sync
async function syncInventoryWithNeon() {
  if (window.NeonInventory && window.NeonInventory.isConfigured()) {
    try {
      const dbVehicles = await window.NeonInventory.fetchAll();
      if (Array.isArray(dbVehicles) && dbVehicles.length > 0) {
        cars = dbVehicles;
        saveInventoryToStorage(dbVehicles);
        if (typeof renderCards === 'function') renderCards();
        console.log('✅ Inventory synced from Neon Database');
      }
    } catch (err) {
      console.warn('⚠️ Syncing with Neon DB failed, using local storage cache:', err.message);
    }
  }
}

// Expose API on window for Admin Portal & App Logic
window.ThriftyInventory = {
  getAll: () => cars,
  saveAll: (data) => {
    saveInventoryToStorage(data);
    cars = data;
    if (typeof renderCards === 'function') renderCards();
  },
  resetToDefaults: () => {
    saveInventoryToStorage(defaultCars);
    cars = defaultCars.slice();
    if (typeof renderCards === 'function') renderCards();
  },
  syncNeon: syncInventoryWithNeon
};

// Trigger Neon Sync on load
document.addEventListener('DOMContentLoaded', () => {
  syncInventoryWithNeon();
});

// ─── WhatsApp number ───────────────────────────────────────────
const WA_NUMBER = '254712916688';

function waLink(carName) {
  const msg = encodeURIComponent(`Hi, I'm interested in the ${carName} listed on 3FTYWHLS. Please share more details.`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// ─── State ─────────────────────────────────────────────────────
let currentFilter = 'all';
let currentSort   = 'default';
let activeCarIdx  = null;
let galleryIdx    = 0;

// ─── Render helpers ────────────────────────────────────────────
function filteredAndSorted() {
  cars = getStoredInventory(); // sync with latest data
  let list = cars.slice();
  if (currentFilter !== 'all') {
    list = list.filter(c => c.tags && c.tags.includes(currentFilter));
  }
  if (currentSort === 'price-asc')  list.sort((a, b) => a.priceNum - b.priceNum);
  if (currentSort === 'price-desc') list.sort((a, b) => b.priceNum - a.priceNum);
  return list;
}

function renderCards() {
  const grid = document.getElementById('cars-grid');
  const list = filteredAndSorted();
  const countEl = document.getElementById('results-count');

  grid.innerHTML = '';
  countEl.textContent = `${list.length} vehicle${list.length !== 1 ? 's' : ''} found`;

  if (list.length === 0) {
    grid.innerHTML = '<div class="no-results"><strong>No vehicles found</strong>Try a different filter</div>';
    return;
  }

  list.forEach((car, i) => {
    const origIdx = cars.indexOf(car);
    const card = document.createElement('div');
    card.className = 'car-card reveal';
    card.setAttribute('data-idx', origIdx);
    card.setAttribute('id', `card-${car.id}`);
    card.style.transitionDelay = `${i * 60}ms`;

    const imgSrc = `${BASE}${car.images[0]}`;

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${imgSrc}" alt="${car.name}" loading="lazy" />
        <div class="card-img-overlay"></div>
        <div class="card-tag">${car.tags[0].toUpperCase()}</div>
        <div class="card-img-count">&#128247; ${car.images.length}</div>
      </div>
      <div class="card-body">
        <div class="card-name">${car.name}</div>
        <div class="card-subtitle">${car.subtitle}</div>
        <div class="card-price">
          ${car.price}
          ${car.negotiable ? '<span class="neg">neg.</span>' : ''}
        </div>
        <div class="card-specs">
          ${car.specs.slice(0, 3).map(s => `<span class="spec-chip">${s.value}</span>`).join('')}
        </div>
        <div class="card-footer">
          <button class="card-btn card-btn-details" data-idx="${origIdx}" id="details-btn-${car.id}">View Details</button>
          <a class="card-btn card-btn-wa" href="${waLink(car.name)}" target="_blank" rel="noopener" id="wa-btn-${car.id}"
             onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>`;

    card.addEventListener('click', (e) => {
      if (!e.target.closest('.card-btn-wa') && !e.target.closest('a')) {
        openModal(origIdx);
      }
    });

    card.querySelector('.card-btn-details').addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(origIdx);
    });

    grid.appendChild(card);
  });

  // Trigger reveal animations
  requestAnimationFrame(() => {
    document.querySelectorAll('.car-card.reveal').forEach(el => {
      el.classList.add('visible');
    });
  });
}

// ─── Modal ─────────────────────────────────────────────────────
function openModal(idx) {
  const car = cars[idx];
  activeCarIdx = idx;
  galleryIdx   = 0;

  // Populate info
  document.getElementById('modal-car-name').textContent = car.name;
  document.getElementById('modal-price').textContent = car.price + (car.negotiable ? ' (neg.)' : '');
  document.getElementById('modal-wa').href = waLink(car.name);

  // Specs grid
  const specsEl = document.getElementById('modal-specs');
  specsEl.innerHTML = car.specs.map(s => `
    <div class="spec-row">
      <div class="sl">${s.label}</div>
      <div class="sv">${s.value}</div>
    </div>`).join('');

  // Features
  const featEl = document.getElementById('modal-features');
  featEl.innerHTML = car.features.map(f => `<span class="feat-tag">${f}</span>`).join('');

  // Gallery
  buildGallery(car);

  // Show
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  activeCarIdx = null;
}

function buildGallery(car) {
  const mainImg = document.getElementById('gallery-main-img');
  const thumbs  = document.getElementById('gallery-thumbs');
  const counter = document.getElementById('gallery-counter');

  mainImg.src = `${BASE}${car.images[0]}`;
  mainImg.alt = car.name;
  counter.textContent = `1 / ${car.images.length}`;

  thumbs.innerHTML = car.images.map((img, i) => `
    <div class="thumb ${i === 0 ? 'active' : ''}" data-thumb-idx="${i}" id="thumb-${i}">
      <img src="${BASE}${img}" alt="${car.name} image ${i + 1}" loading="lazy" />
    </div>`).join('');

  thumbs.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', () => setGalleryIdx(parseInt(t.dataset.thumbIdx)));
  });
}

function setGalleryIdx(idx) {
  if (activeCarIdx === null) return;
  const car = cars[activeCarIdx];
  galleryIdx = Math.max(0, Math.min(idx, car.images.length - 1));

  const mainImg = document.getElementById('gallery-main-img');
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = `${BASE}${car.images[galleryIdx]}`;
    mainImg.style.opacity = '1';
  }, 150);

  document.getElementById('gallery-counter').textContent = `${galleryIdx + 1} / ${car.images.length}`;

  document.querySelectorAll('.thumb').forEach((t, i) => {
    t.classList.toggle('active', i === galleryIdx);
  });
}

// ─── Filter & Sort ─────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });
});

document.getElementById('sort-select').addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderCards();
});

// ─── Modal controls ────────────────────────────────────────────
document.getElementById('modal-close').addEventListener('click', closeModal);

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

document.getElementById('gallery-prev').addEventListener('click', () => {
  if (activeCarIdx !== null) setGalleryIdx(galleryIdx - 1);
});

document.getElementById('gallery-next').addEventListener('click', () => {
  if (activeCarIdx !== null) setGalleryIdx(galleryIdx + 1);
});

// Keyboard nav
document.addEventListener('keydown', (e) => {
  if (activeCarIdx !== null) {
    if (e.key === 'ArrowLeft')  setGalleryIdx(galleryIdx - 1);
    if (e.key === 'ArrowRight') setGalleryIdx(galleryIdx + 1);
    if (e.key === 'Escape')     closeModal();
  }
});

// ─── Navbar scroll effect ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Burger menu ───────────────────────────────────────────────
document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// ─── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Also observe static sections
document.querySelectorAll('.pillar, .contact-card, .about-glow-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ─── Init ──────────────────────────────────────────────────────
renderCards();
observeReveal();
