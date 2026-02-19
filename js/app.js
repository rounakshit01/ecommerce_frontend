/* ============================================================
   LUXE STORE — Main Application JavaScript
   ============================================================ */

'use strict';

// ============================================================
// STATE MANAGEMENT
// ============================================================
const State = {
  cart: JSON.parse(localStorage.getItem('luxe_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('luxe_wishlist') || '[]'),
  currentPage: 'home',
  currentProduct: null,
  filters: { category: 'all', minPrice: 0, maxPrice: 9999, search: '' },
  sort: 'featured',

  save() {
    localStorage.setItem('luxe_cart', JSON.stringify(this.cart));
    localStorage.setItem('luxe_wishlist', JSON.stringify(this.wishlist));
  },

  addToCart(productId, qty = 1) {
    const existing = this.cart.find(i => i.id === productId);
    if (existing) { existing.qty += qty; }
    else { this.cart.push({ id: productId, qty }); }
    this.save();
    UI.updateCartBadge();
    Toast.show('Added to cart', 'success');
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.save();
    UI.updateCartBadge();
  },

  updateCartQty(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.save();
  },

  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    if (idx > -1) { this.wishlist.splice(idx, 1); Toast.show('Removed from wishlist'); }
    else { this.wishlist.push(productId); Toast.show('Saved to wishlist ♡'); }
    this.save();
    return idx === -1;
  },

  isInWishlist(productId) { return this.wishlist.includes(productId); },

  getCartTotal() {
    return this.cart.reduce((sum, item) => {
      const p = PRODUCTS.find(p => p.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },

  getCartCount() { return this.cart.reduce((n, i) => n + i.qty, 0); }
};

// ============================================================
// ROUTER / PAGES
// ============================================================
const Router = {
  navigate(page, data = null) {
    State.currentPage = page;
    State.currentProduct = data;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.add('active');
      target.classList.add('page-enter');
      setTimeout(() => target.classList.remove('page-enter'), 600);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    UI.updateNavActive(page);
    Pages[page]?.(data);
  }
};

// ============================================================
// UI UTILITIES
// ============================================================
const UI = {
  updateCartBadge() {
    const count = State.getCartCount();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
    });
  },

  updateNavActive(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });
  },

  renderStars(rating, size = 12) {
    return Array.from({ length: 5 }, (_, i) => `
      <svg class="star" width="${size}" height="${size}" viewBox="0 0 12 12">
        <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5"
          class="${i < Math.round(rating) ? 'star-filled' : 'star-empty'}" stroke="none"/>
      </svg>`).join('');
  },

  formatPrice(price) { return `$${price.toLocaleString()}`; }
};

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
const Toast = {
  container: null,

  init() {
    this.container = document.querySelector('.toast-container');
  },

  show(msg, type = 'default') {
    const icons = {
      success: '<circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/>',
      error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
      default: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" stroke-width="2" stroke="currentColor" fill="none">${icons[type] || icons.default}</svg>
      <span>${msg}</span>`;
    this.container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
};

// ============================================================
// PRODUCT CARD RENDERER
// ============================================================
function renderProductCard(product, context = 'grid') {
  const inWishlist = State.isInWishlist(product.id);
  const badgeHTML = product.badge
    ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : '';
  const originalHTML = product.originalPrice
    ? `<span class="price-original">${UI.formatPrice(product.originalPrice)}</span>` : '';

  return `
    <article class="product-card reveal" data-id="${product.id}">
      <div class="product-card-media" role="img" aria-label="${product.name}">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        ${badgeHTML}
        <div class="product-card-actions">
          <button class="card-action-btn wishlist-btn ${inWishlist ? 'wishlist-active' : ''}"
            aria-label="Add to wishlist" title="Wishlist" data-id="${product.id}">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="card-action-btn add-cart-btn" aria-label="Add to cart" title="Add to cart" data-id="${product.id}">
            <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
      </div>
      <div class="product-card-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${UI.renderStars(product.rating)}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${UI.formatPrice(product.price)}</span>
          ${originalHTML}
        </div>
      </div>
    </article>`;
}

// ============================================================
// PAGES
// ============================================================
const Pages = {

  // —— HOME PAGE ——————————————————————————————————————————
  home() {
    const featured = PRODUCTS.slice(0, 4);
    document.getElementById('featured-grid').innerHTML = featured.map(p => renderProductCard(p)).join('');
    initReveal();
    bindProductCards();
  },

  // —— SHOP PAGE ——————————————————————————————————————————
  shop() {
    renderShop();
  },

  // —— PRODUCT DETAIL ————————————————————————————————————
  product(product) {
    if (!product) return;
    renderProductDetail(product);
  },

  // —— CART ————————————————————————————————————————————
  cart() {
    renderCart();
  },

  // —— CHECKOUT ——————————————————————————————————————————
  checkout() {
    renderCheckout();
  },

  // —— LOGIN / SIGNUP ————————————————————————————————————
  login() { /* page is static */ },
  signup() { /* page is static */ },
};

// ============================================================
// SHOP PAGE LOGIC
// ============================================================
function getFilteredProducts() {
  let products = [...PRODUCTS];
  const { category, minPrice, maxPrice, search } = State.filters;

  if (category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  switch (State.sort) {
    case 'price-asc': products.sort((a, b) => a.price - b.price); break;
    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
    case 'rating': products.sort((a, b) => b.rating - a.rating); break;
    case 'newest': products.reverse(); break;
  }
  return products;
}

function renderShop() {
  const products = getFilteredProducts();
  const grid = document.getElementById('shop-grid');
  const count = document.getElementById('results-count');

  count.textContent = `${products.length} object${products.length !== 1 ? 's' : ''}`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">○</div>
        <h3>Nothing found</h3>
        <p>Try adjusting your filters or search term</p>
      </div>`;
  } else {
    grid.innerHTML = products.map(p => renderProductCard(p)).join('');
    initReveal();
    bindProductCards();
  }

  // Update active filter
  document.querySelectorAll('.cat-filter').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === State.filters.category);
    const check = el.querySelector('.filter-check');
    const checkmark = el.querySelector('.filter-check svg');
    if (el.classList.contains('active')) {
      check.style.background = 'var(--gold)';
      if (checkmark) checkmark.style.opacity = '1';
    } else {
      check.style.background = '';
      if (checkmark) checkmark.style.opacity = '0';
    }
  });
}

function initShopFilters() {
  // Category filters
  document.querySelectorAll('.cat-filter').forEach(el => {
    el.addEventListener('click', () => {
      State.filters.category = el.dataset.cat;
      renderShop();
    });
  });

  // Search
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        State.filters.search = searchInput.value.trim();
        renderShop();
      }, 300);
    });
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      State.sort = sortSelect.value;
      renderShop();
    });
  }

  // Price
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  [minInput, maxInput].forEach(input => {
    if (!input) return;
    input.addEventListener('change', () => {
      State.filters.minPrice = Number(minInput.value) || 0;
      State.filters.maxPrice = Number(maxInput.value) || 9999;
      renderShop();
    });
  });
}

// ============================================================
// PRODUCT DETAIL LOGIC
// ============================================================
function renderProductDetail(product) {
  const page = document.getElementById('page-product');
  let activeImg = 0;
  let qty = 1;

  const originalHTML = product.originalPrice
    ? `<span class="detail-price-original">${UI.formatPrice(product.originalPrice)}</span>` : '';

  const detailsHTML = product.details.map(d => `<li>${d}</li>`).join('');

  // Sample reviews
  const sampleReviews = [
    { name: 'Oliver M.', date: 'January 2026', rating: 5, text: TESTIMONIALS[0].text },
    { name: 'Sophie L.', date: 'December 2025', rating: 5, text: TESTIMONIALS[1].text },
  ];

  const reviewsHTML = sampleReviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="stars mt-2">${UI.renderStars(r.rating, 13)}</div>
        </div>
        <span class="review-date">${r.date}</span>
      </div>
      <p class="review-text">"${r.text}"</p>
    </div>`).join('');

  page.innerHTML = `
    <div class="container">
      <div class="breadcrumb" role="navigation" aria-label="Breadcrumb">
        <span class="breadcrumb-item" data-nav="home">Home</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-item" data-nav="shop">Shop</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">${product.name}</span>
      </div>

      <div class="product-detail">
        <!-- GALLERY -->
        <div class="product-gallery">
          <div class="gallery-main" id="gallery-main">
            <img src="${product.images[0]}" alt="${product.name}" id="gallery-main-img">
          </div>
          <div class="gallery-thumbs">
            ${product.images.map((img, i) => `
              <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
                <img src="${img}" alt="${product.name} view ${i + 1}" loading="lazy">
              </div>`).join('')}
          </div>
        </div>

        <!-- INFO -->
        <div class="product-info">
          <div class="product-detail-category">${product.category}</div>
          <h1 class="product-detail-name">${product.name}</h1>

          <div class="product-detail-rating">
            <div class="rating-stars">${UI.renderStars(product.rating, 16)}</div>
            <span class="rating-num">${product.rating}</span>
            <span class="rating-text">${product.reviews} reviews</span>
          </div>

          <div class="product-detail-price">
            <span class="detail-price">${UI.formatPrice(product.price)}</span>
            ${originalHTML}
          </div>

          <p class="product-detail-desc">${product.description}</p>

          <label class="qty-label" for="qty-value">Quantity</label>
          <div class="qty-selector" role="group" aria-label="Quantity selector">
            <button class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-value" id="qty-value" aria-live="polite">1</span>
            <button class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>

          <div class="add-to-cart-row">
            <button class="btn btn-primary btn-lg w-full" id="detail-add-cart">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Add to Cart
            </button>
            <button class="btn btn-outline btn-lg wishlist-detail-btn ${State.isInWishlist(product.id) ? 'wishlist-active' : ''}"
              aria-label="Save to wishlist" id="detail-wishlist">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="${State.isInWishlist(product.id) ? '#e74c3c' : 'none'}" stroke="${State.isInWishlist(product.id) ? '#e74c3c' : 'currentColor'}" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <!-- Details accordion -->
          <div class="details-accordion">
            <div class="accordion-item open">
              <button class="accordion-trigger" aria-expanded="true">
                Details & Dimensions
                <svg class="accordion-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <div class="accordion-body">
                <div class="accordion-body-inner">
                  <ul>${detailsHTML}</ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-trigger" aria-expanded="false">
                Shipping & Returns
                <svg class="accordion-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <div class="accordion-body">
                <div class="accordion-body-inner">
                  <ul>
                    <li>Free shipping on orders over $150</li>
                    <li>Delivered in 3–7 business days</li>
                    <li>30-day returns, no questions asked</li>
                    <li>Gift wrapping available at checkout</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-trigger" aria-expanded="false">
                Care Instructions
                <svg class="accordion-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <div class="accordion-body">
                <div class="accordion-body-inner">
                  <ul>
                    <li>Handle with care and intention</li>
                    <li>Clean only as directed by the label</li>
                    <li>Store away from direct sunlight</li>
                    <li>Each imperfection is part of the character</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="reviews-section">
        <div class="reviews-header">
          <div class="reviews-summary">
            <span class="big-rating">${product.rating}</span>
            <div>
              <div class="stars">${UI.renderStars(product.rating, 18)}</div>
              <div class="mt-2" style="font-size:var(--text-sm);color:var(--ink-40)">${product.reviews} reviews</div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm">Write a Review</button>
        </div>
        ${reviewsHTML}
      </div>
    </div>`;

  // Gallery interaction
  const mainImg = page.querySelector('#gallery-main-img');
  page.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      activeImg = Number(thumb.dataset.idx);
      mainImg.src = product.images[activeImg];
      page.querySelectorAll('.gallery-thumb').forEach((t, i) =>
        t.classList.toggle('active', i === activeImg));
    });
  });

  // Qty
  const qtyVal = page.querySelector('#qty-value');
  page.querySelector('#qty-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyVal.textContent = qty;
  });
  page.querySelector('#qty-plus').addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    qtyVal.textContent = qty;
  });

  // Add to cart
  page.querySelector('#detail-add-cart').addEventListener('click', () => {
    State.addToCart(product.id, qty);
  });

  // Wishlist
  page.querySelector('#detail-wishlist').addEventListener('click', function() {
    const added = State.toggleWishlist(product.id);
    const svg = this.querySelector('svg');
    svg.setAttribute('fill', added ? '#e74c3c' : 'none');
    svg.setAttribute('stroke', added ? '#e74c3c' : 'currentColor');
  });

  // Accordion
  page.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const inner = item.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all
      page.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Open first accordion
  const firstItem = page.querySelector('.accordion-item.open');
  if (firstItem) {
    const body = firstItem.querySelector('.accordion-body');
    const inner = firstItem.querySelector('.accordion-body-inner');
    body.style.maxHeight = inner.scrollHeight + 'px';
  }

  // Breadcrumb nav
  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => Router.navigate(el.dataset.nav));
  });
}

// ============================================================
// CART PAGE
// ============================================================
function renderCart() {
  const page = document.getElementById('page-cart');
  const itemsWrap = page.querySelector('.cart-items');
  const summaryWrap = page.querySelector('.cart-summary');

  function redraw() {
    if (State.cart.length === 0) {
      itemsWrap.innerHTML = `
        <div class="empty-cart">
          <svg class="empty-cart-icon" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <h2>Your cart is empty</h2>
          <p>There are no objects here yet. Let's change that.</p>
          <button class="btn btn-primary" id="empty-cart-shop">Explore the Collection</button>
        </div>`;
      summaryWrap.style.display = 'none';
      itemsWrap.querySelector('#empty-cart-shop')?.addEventListener('click', () => Router.navigate('shop'));
      return;
    }

    summaryWrap.style.display = '';
    const subtotal = State.getCartTotal();
    const shipping = subtotal >= 150 ? 0 : 15;
    const total = subtotal + shipping;

    itemsWrap.innerHTML = State.cart.map(item => {
      const p = PRODUCTS.find(p => p.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-item" data-id="${p.id}">
          <div class="cart-item-img">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          </div>
          <div>
            <div class="cart-item-cat">${p.category}</div>
            <div class="cart-item-name">${p.name}</div>
            <div class="qty-selector" style="margin-top:var(--space-4);">
              <button class="qty-btn cart-qty-minus" data-id="${p.id}">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn cart-qty-plus" data-id="${p.id}">+</button>
            </div>
            <button class="cart-item-remove mt-4" data-id="${p.id}">Remove</button>
          </div>
          <div>
            <div class="cart-item-price">${UI.formatPrice(p.price * item.qty)}</div>
          </div>
        </div>`;
    }).join('');

    summaryWrap.querySelector('.summary-subtotal').textContent = UI.formatPrice(subtotal);
    summaryWrap.querySelector('.summary-shipping').textContent = shipping === 0 ? 'Free' : UI.formatPrice(shipping);
    summaryWrap.querySelector('.summary-total').textContent = UI.formatPrice(total);

    // Bind controls
    itemsWrap.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        State.updateCartQty(Number(btn.dataset.id), -1);
        UI.updateCartBadge();
        redraw();
      });
    });
    itemsWrap.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        State.updateCartQty(Number(btn.dataset.id), 1);
        UI.updateCartBadge();
        redraw();
      });
    });
    itemsWrap.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        State.removeFromCart(Number(btn.dataset.id));
        Toast.show('Item removed');
        redraw();
      });
    });
  }

  redraw();
}

// ============================================================
// CHECKOUT PAGE
// ============================================================
function renderCheckout() {
  // Populate order summary
  const summaryItems = document.getElementById('checkout-items');
  const chkSubtotal = document.getElementById('chk-subtotal');
  const chkShipping = document.getElementById('chk-shipping');
  const chkTotal = document.getElementById('chk-total');

  const subtotal = State.getCartTotal();
  const shipping = subtotal >= 150 ? 0 : 15;
  const total = subtotal + shipping;

  summaryItems.innerHTML = State.cart.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id);
    if (!p) return '';
    return `
      <div class="checkout-item">
        <div class="checkout-item-img"><img src="${p.images[0]}" alt="${p.name}"></div>
        <div>
          <div class="checkout-item-name">${p.name}</div>
          <div class="checkout-item-qty">Qty: ${item.qty}</div>
        </div>
        <div class="checkout-item-price">${UI.formatPrice(p.price * item.qty)}</div>
      </div>`;
  }).join('') || '<p style="color:rgba(245,240,232,0.4);font-size:var(--text-sm)">Your cart is empty</p>';

  chkSubtotal.textContent = UI.formatPrice(subtotal);
  chkShipping.textContent = shipping === 0 ? 'Free' : UI.formatPrice(shipping);
  chkTotal.textContent = UI.formatPrice(total);

  // Payment method selection
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');

      const cardFields = document.querySelector('.card-fields');
      cardFields.classList.toggle('visible', method.dataset.method === 'card');
    });
  });
}

// ============================================================
// FORM VALIDATION
// ============================================================
function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  const validators = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Enter a valid email address',
    required: v => v.trim() ? null : 'This field is required',
    card: v => /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(v.replace(/\s/g, '')) ? null : 'Enter a valid card number',
    expiry: v => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(v) ? null : 'Enter MM/YY format',
    cvv: v => /^\d{3,4}$/.test(v) ? null : 'Enter a valid CVV',
    zip: v => v.trim().length >= 3 ? null : 'Enter a valid postal code'
  };

  function validateField(input) {
    const rules = (input.dataset.validate || 'required').split(',');
    for (const rule of rules) {
      const err = validators[rule.trim()]?.(input.value);
      if (err) return err;
    }
    return null;
  }

  function showError(input, msg) {
    input.classList.add('error');
    const errEl = input.nextElementSibling;
    if (errEl?.classList.contains('form-error')) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    const errEl = input.nextElementSibling;
    if (errEl?.classList.contains('form-error')) {
      errEl.classList.remove('visible');
    }
  }

  // Real-time validation
  form.querySelectorAll('[data-validate]').forEach(input => {
    input.addEventListener('blur', () => {
      const err = validateField(input);
      err ? showError(input, err) : clearError(input);
    });
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const err = validateField(input);
        err ? showError(input, err) : clearError(input);
      }
    });
  });

  // Card number formatting
  const cardInput = form.querySelector('[data-validate="card"]');
  if (cardInput) {
    cardInput.addEventListener('input', () => {
      let v = cardInput.value.replace(/\D/g, '').substring(0, 16);
      cardInput.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Expiry formatting
  const expiryInput = form.querySelector('[data-validate="expiry"]');
  if (expiryInput) {
    expiryInput.addEventListener('input', () => {
      let v = expiryInput.value.replace(/\D/g, '').substring(0, 4);
      if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
      expiryInput.value = v;
    });
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const cardVisible = document.querySelector('.card-fields.visible');
    const inputs = form.querySelectorAll('[data-validate]');

    inputs.forEach(input => {
      // Skip hidden card fields if not visible
      if (!cardVisible && input.closest('.card-fields')) return;
      const err = validateField(input);
      if (err) { showError(input, err); valid = false; }
      else { clearError(input); }
    });

    if (valid) {
      Toast.show('Order placed successfully! Thank you 🎉', 'success');
      State.cart = [];
      State.save();
      UI.updateCartBadge();
      setTimeout(() => Router.navigate('home'), 2500);
    } else {
      Toast.show('Please fix the errors above', 'error');
    }
  });
}

// ============================================================
// AUTH FORMS
// ============================================================
function initAuthForms() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      Toast.show('Welcome back!', 'success');
      setTimeout(() => Router.navigate('home'), 1500);
    });
  }

  // Signup form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const pass = signupForm.querySelector('[name="password"]').value;
      const conf = signupForm.querySelector('[name="confirm"]').value;
      if (pass !== conf) { Toast.show('Passwords do not match', 'error'); return; }
      Toast.show('Account created successfully!', 'success');
      setTimeout(() => Router.navigate('home'), 1500);
    });
  }
}

// ============================================================
// CARD CLICK → PRODUCT DETAIL
// ============================================================
function bindProductCards() {
  document.querySelectorAll('.product-card').forEach(card => {
    // Navigate on card click (not action buttons)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-action-btn')) return;
      const product = PRODUCTS.find(p => p.id === Number(card.dataset.id));
      if (product) Router.navigate('product', product);
    });

    // Wishlist button
    const wishBtn = card.querySelector('.wishlist-btn');
    if (wishBtn) {
      wishBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = Number(wishBtn.dataset.id);
        const added = State.toggleWishlist(id);
        wishBtn.classList.toggle('wishlist-active', added);
      });
    }

    // Add to cart button
    const cartBtn = card.querySelector('.add-cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        State.addToCart(Number(cartBtn.dataset.id));
      });
    }
  });
}

// ============================================================
// INTERSECTION OBSERVER — REVEAL ON SCROLL
// ============================================================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal:not(.revealed)').forEach(el => observer.observe(el));
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Nav links
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', () => Router.navigate(link.dataset.page));
  });

  // Cart icon
  document.querySelectorAll('.nav-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => Router.navigate('cart'));
  });

  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });

  // Mobile nav links
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      Router.navigate(link.dataset.page);
      hamburger.classList.remove('open');
      mobileMenu?.classList.remove('open');
    });
  });
}

// ============================================================
// NEWSLETTER
// ============================================================
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input.value.trim()) {
        Toast.show('You\'re on the list. Thank you.', 'success');
        input.value = '';
      }
    });
  });
}

// ============================================================
// CATEGORY CARDS
// ============================================================
function initCategoryCards() {
  document.querySelectorAll('.category-card[data-cat]').forEach(card => {
    card.addEventListener('click', () => {
      State.filters.category = card.dataset.cat;
      Router.navigate('shop');
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  initNavbar();
  initNewsletter();
  initCategoryCards();
  initShopFilters();
  initCheckoutForm();
  initAuthForms();
  UI.updateCartBadge();

  // Home page is default
  Pages.home();
  initReveal();

  // Global scroll-based reveal
  window.addEventListener('scroll', initReveal, { passive: true });
});
