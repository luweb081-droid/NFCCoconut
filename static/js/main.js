/*
 * Source unique du catalogue. Pour ajouter ou modifier un article, ne changer
 * que ce tableau : les cartes, la recherche et les fiches produit se mettent
 * automatiquement à jour.
 */
const PRODUCTS = [
  { id: 'plaque-google-black', category: 'business', name: 'Plaque NFC avis Google BLACK', price: 39.90, oldPrice: 55.90, images: ['static/images/Article1.png', 'static/images/Article2.png'], description: 'Une plaque élégante qui permet à vos clients de laisser un avis Google en un simple geste.', tags: ['google', 'avis', 'plaque', 'nfc', 'business'] },
  { id: 'presentoir-google-black', category: 'business', name: 'Présentoir Avis Google BLACK', price: 37.90, oldPrice: 47.90, images: ['static/images/Article3bis.png', 'static/images/Article3.png'], description: 'Présentoir NFC compact pour recueillir davantage d’avis dans votre établissement.', tags: ['google', 'avis', 'présentoir', 'nfc'] },
  { id: 'plaque-instagram', category: 'business', name: 'Plaque de Comptoir INSTAGRAM', price: 39.90, oldPrice: 54.90, images: ['static/images/Article4.png', 'static/images/Article5.png'], description: 'Développez votre communauté Instagram : un contact suffit pour accéder à votre profil.', tags: ['instagram', 'plaque', 'comptoir', 'nfc'] },
  { id: 'plaque-ronde-white', category: 'business', name: 'Plaque NFC Avis Google Ronde WHITE', price: 39.90, oldPrice: 47.90, images: ['static/images/Article5bis.png', 'static/images/Article5.png'], description: 'Une plaque ronde blanche, sobre et prête à être configurée pour vos avis Google.', tags: ['google', 'avis', 'plaque', 'ronde', 'blanche'] },
  { id: 'plaque-ronde-black', category: 'business', name: 'Plaque NFC Avis Google Ronde BLACK', price: 39.90, oldPrice: 47.90, images: ['static/images/Article7bis.png', 'static/images/Article7.png'], description: 'Une finition noire premium pour inviter vos clients à laisser un avis en quelques secondes.', tags: ['google', 'avis', 'plaque', 'ronde', 'noire'] },
  { id: 'carte-visite', category: 'business', name: 'Carte de Visite NFC Personnalisée', price: 29.90, oldPrice: 39.90, images: ['static/images/Article9.png', 'static/images/Article8.png'], description: 'Partagez vos coordonnées, réseaux et liens essentiels avec une carte NFC personnalisée.', tags: ['carte', 'visite', 'personnalisée', 'nfc'] },
  { id: 'tshirt-streetwear', category: 'streetwear', name: 'T-shirt style Streetwear', price: 39.90, oldPrice: 59.90, images: ['static/images/tshirt2.png', 'static/images/t-shirt3.png'], description: 'T-shirt en coton lourd bio, pensé pour une coupe streetwear confortable et durable.', tags: ['t-shirt', 'streetwear', 'coton', 'vêtement'] },
  { id: 'tshirt-oversized', category: 'streetwear', name: 'T-Shirt Oversized NFC COCONUT', price: 39.90, oldPrice: 59.90, images: ['static/images/coming_soon_1.png', 'static/images/t-shirt3.png'], description: 'Coupe boxy streetwear avec un patch NFC discret intégré au bas du vêtement.', tags: ['t-shirt', 'oversized', 'streetwear', 'nfc', 'vêtement'] }
];

const NAV_LINKS = [
  ['Accueil', 'index.html'], ['Catalogue', 'catalogue.html'], ['Streetwear', 'streetwear.html'], ['Notre histoire', 'about.html'], ['FAQ', 'faq.html'], ['Contact', 'contact.html']
];

const euro = value => `${value.toFixed(2).replace('.', ',')} €`;
const escapeHtml = text => String(text).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const productUrl = product => `produit.html?id=${encodeURIComponent(product.id)}`;

function productCard(product) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  return `<article class="product-item" data-product-id="${product.id}">
    <a class="product-link" href="${productUrl(product)}" aria-label="Voir ${escapeHtml(product.name)}">
      <div class="product-img-wrapper"><img src="${product.images[0]}" alt="${escapeHtml(product.name)}"></div>
      <h3 class="product-title">${escapeHtml(product.name)}</h3>
    </a>
    <div class="product-price-container"><span class="product-price">${euro(product.price)}</span>${product.oldPrice ? `<span class="product-price-old">${euro(product.oldPrice)}</span><span class="badge-discount">-${discount}%</span>` : ''}</div>
    <div class="product-actions"><a class="btn-details" href="${productUrl(product)}">Voir le produit</a><button class="btn-add-cart" type="button" data-add="${product.id}">Ajouter au panier</button></div>
  </article>`;
}

function currentFile() {
  const name = window.location.pathname.split('/').pop();
  return name || 'index.html';
}

function renderNavigation() {
  const file = currentFile();
  const links = NAV_LINKS.map(([label, href]) => `<a href="${href}"${href === file ? ' class="active" aria-current="page"' : ''}>${label}</a>`).join('');
  document.querySelectorAll('.top-header').forEach(header => {
    header.innerHTML = `<div class="header-left"><button id="menuBtn" class="mobile-only-btn" aria-label="Ouvrir le menu"><i class="fa-solid fa-bars"></i></button><nav class="desktop-nav">${links}</nav><button id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i><span class="desktop-only">Rechercher</span></button></div><a href="index.html" class="brand-logo">-NFC COCONUT-</a><div class="header-right"><button id="cartBtn"><i class="fa-solid fa-bag-shopping"></i><span>(0)</span></button></div>`;
  });
  document.querySelectorAll('.mobile-nav').forEach(nav => { nav.innerHTML = `<ul>${NAV_LINKS.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>`; });
}

function renderProductGrids() {
  const file = currentFile();
  const pageCategory = file === 'streetwear.html' ? 'streetwear' : 'business';
  const grids = [...document.querySelectorAll('.products-grid')];
  if (!grids.length || file === 'produit.html') return;
  const target = grids[0];
  const products = file === 'index.html' ? PRODUCTS.filter(p => p.category === 'business').slice(0, 6) : PRODUCTS.filter(p => p.category === pageCategory);
  target.innerHTML = products.map(productCard).join('');
  target.dataset.catalogGrid = 'true';
}

function renderProductPage() {
  const root = document.getElementById('productPage');
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get('id');
  const product = PRODUCTS.find(item => item.id === id);
  if (!product) { root.innerHTML = '<div class="page-title"><h1>Produit introuvable</h1><p>Ce produit n’existe pas ou n’est plus disponible.</p><a class="btn-details" href="catalogue.html">Retour au catalogue</a></div>'; return; }
  document.title = `${product.name} — NFC COCONUT`;
  root.innerHTML = `<a class="back-link" href="${product.category === 'streetwear' ? 'streetwear.html' : 'catalogue.html'}"><i class="fa-solid fa-arrow-left"></i> Retour</a><section class="product-detail"><div class="product-gallery"><img id="mainProductImage" src="${product.images[0]}" alt="${escapeHtml(product.name)}"><div class="product-thumbnails">${product.images.map((image, index) => `<button type="button" class="product-thumbnail${index === 0 ? ' active' : ''}" data-image="${image}" aria-label="Voir la photo ${index + 1}"><img src="${image}" alt=""></button>`).join('')}</div></div><div class="product-info"><p class="product-category">${product.category === 'streetwear' ? 'Streetwear' : 'NFC Business'}</p><h1>${escapeHtml(product.name)}</h1><div class="detail-price">${euro(product.price)}${product.oldPrice ? `<del>${euro(product.oldPrice)}</del>` : ''}</div><p class="product-description">${escapeHtml(product.description)}</p><ul class="product-features"><li>Prêt à l’emploi</li><li>Technologie NFC intégrée</li><li>Livraison suivie</li></ul><button class="btn-add-cart" type="button" data-add="${product.id}">Ajouter au panier</button></div></section>`;
}

function setupSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const opener = document.getElementById('searchBtn');
  const closer = document.getElementById('closeSearchBtn');
  if (!overlay || !input) return;
  let results = overlay.querySelector('.search-results');
  if (!results) { results = document.createElement('div'); results.className = 'search-results'; overlay.append(results); }
  const search = () => {
    const terms = input.value.toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/).filter(Boolean);
    const matches = PRODUCTS.filter(product => {
      const haystack = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return terms.every(term => haystack.includes(term));
    });
    results.innerHTML = !terms.length ? '<p>Recherchez un produit, une matière ou un usage.</p>' : matches.length ? matches.map(p => `<a href="${productUrl(p)}"><img src="${p.images[0]}" alt=""><span>${escapeHtml(p.name)}<small>${euro(p.price)}</small></span></a>`).join('') : '<p>Aucun produit ne correspond à votre recherche.</p>';
  };
  const toggle = () => { overlay.classList.toggle('active'); if (overlay.classList.contains('active')) { input.focus(); search(); } };
  opener?.addEventListener('click', toggle); closer?.addEventListener('click', toggle); input.addEventListener('input', search);
  window.filterProducts = search;
}

let cart = [];
try { cart = JSON.parse(localStorage.getItem('nfcCoconutCart') || '[]'); } catch (_) { /* Le site fonctionne aussi ouvert directement depuis un fichier. */ }
function saveCart() { try { localStorage.setItem('nfcCoconutCart', JSON.stringify(cart)); } catch (_) { /* Stockage indisponible : panier conservé pour la page en cours. */ } }
function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartBtn span').forEach(el => { el.textContent = `(${total})`; });
  const container = document.querySelector('.cart-items-container'); const empty = document.querySelector('.drawer-empty-msg');
  if (container) container.innerHTML = cart.map((item, index) => `<div class="cart-item"><img src="${item.image}" alt=""><div class="cart-item-details"><div class="cart-item-title">${escapeHtml(item.name)}</div><div class="cart-item-price">${item.quantity} × ${euro(item.price)}</div></div><button class="cart-item-remove" data-remove="${index}" aria-label="Retirer"><i class="fa-solid fa-xmark"></i></button></div>`).join('');
  if (empty) empty.style.display = cart.length ? 'none' : 'block';
  document.querySelectorAll('.btn-checkout').forEach(button => { button.textContent = `Commander (${euro(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))})`; });
}
function setupCartAndDrawer() {
  const overlay = document.getElementById('drawerOverlay'); const drawer = document.getElementById('cartDrawer');
  if (drawer && !drawer.querySelector('.cart-items-container')) {
    const container = document.createElement('div');
    container.className = 'cart-items-container';
    drawer.querySelector('.drawer-empty-msg')?.before(container);
  }
  const close = () => { overlay?.classList.remove('active'); drawer?.classList.remove('active'); };
  const open = () => { overlay?.classList.add('active'); drawer?.classList.add('active'); };
  document.getElementById('cartBtn')?.addEventListener('click', open); document.getElementById('menuBtn')?.addEventListener('click', open); document.getElementById('closeDrawerBtn')?.addEventListener('click', close); overlay?.addEventListener('click', close);
  document.addEventListener('click', event => { const add = event.target.closest('[data-add]'); const remove = event.target.closest('[data-remove]'); if (add) { const product = PRODUCTS.find(p => p.id === add.dataset.add); const line = cart.find(item => item.id === product.id); line ? line.quantity++ : cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], quantity: 1 }); saveCart(); updateCart(); open(); } if (remove) { cart.splice(Number(remove.dataset.remove), 1); saveCart(); updateCart(); } });
  updateCart();
}
function setupGallery() { document.addEventListener('click', event => { const button = event.target.closest('[data-image]'); if (!button) return; document.getElementById('mainProductImage').src = button.dataset.image; document.querySelectorAll('.product-thumbnail').forEach(item => item.classList.toggle('active', item === button)); }); }

document.addEventListener('DOMContentLoaded', () => { renderNavigation(); renderProductGrids(); renderProductPage(); setupSearch(); setupCartAndDrawer(); setupGallery(); });
